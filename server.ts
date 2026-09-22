import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db';
import { generateRssXml, generateSitemapXml } from './server/seoFeeds';
import { generateNewsDraftWithAI } from './server/geminiDraftGenerator';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON & URL-encoded body parser with generous limit for pitch deck / logo uploads
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Basic anti-spam honeypot checker
  const checkHoneypot = (req: Request, res: Response, next: () => void) => {
    if (req.body && req.body._hp_website) {
      // Bot filled out the invisible honeypot field
      return res.status(400).json({ error: 'Spam detected' });
    }
    next();
  };

  // Bearer Token Auth Middleware (Simulated token verification)
  const authMiddleware = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      // Token format: "vqa_token_<userId>"
      const userId = token.replace('vqa_token_', '');
      const user = db.getUsers().find(u => u.id === userId);
      if (user) {
        (req as any).user = user;
      }
    }
    next();
  };

  app.use(authMiddleware);

  // --- API ROUTES FIRST ---

  // Health & Independence Status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      platform: 'Ventures.qa',
      editorialPolicy: 'Independent Third-Party Intelligence & Matchmaking',
      timestamp: new Date().toISOString()
    });
  });

  // --- AUTHENTICATION ---
  app.get('/api/auth/me', (req, res) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ user });
  });

  app.post('/api/auth/register', checkHoneypot, (req, res) => {
    const { email, name, role, organization } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = db.createUser({
      email,
      name,
      role: role || 'startup',
      organization
    });

    const token = `vqa_token_${user.id}`;
    res.status(201).json({ user, token });
  });

  app.post('/api/auth/login', checkHoneypot, (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let user = db.findUserByEmail(email);
    if (!user) {
      // For instant prototype onboarding: auto-create if not found
      user = db.createUser({
        email,
        name: email.split('@')[0],
        role: email.includes('investor') ? 'investor' : 'startup'
      });
    }

    const token = `vqa_token_${user.id}`;
    res.json({ user, token });
  });

  app.post('/api/auth/google', (req, res) => {
    const { email, name, avatar } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Google profile email required' });
    }

    let user = db.findUserByEmail(email);
    if (!user) {
      user = db.createUser({
        email,
        name: name || email.split('@')[0],
        role: 'startup',
        avatar
      });
    }

    const token = `vqa_token_${user.id}`;
    res.json({ user, token });
  });

  // --- ENTITIES / DIRECTORY ---
  app.get('/api/entities', (req, res) => {
    const { sector, stage, type, verifiedOnly, search } = req.query;
    const entities = db.getEntities({
      sector: sector as string,
      stage: stage as string,
      type: type as string,
      verifiedOnly: verifiedOnly === 'true',
      search: search as string
    });
    res.json({ count: entities.length, entities });
  });

  app.get('/api/entities/:id', (req, res) => {
    const entity = db.getEntityById(req.params.id);
    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.json({ entity });
  });

  app.post('/api/entities', checkHoneypot, (req, res) => {
    const entityData = req.body;
    if (!entityData.name || !entityData.sector) {
      return res.status(400).json({ error: 'Entity name and sector are required' });
    }

    const newEntity = {
      ...entityData,
      id: `ent-${Date.now()}`,
      slug: entityData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      verified: false,
      claimed: false
    };

    db.addEntity(newEntity);
    res.status(201).json({ entity: newEntity });
  });

  app.post('/api/entities/:id/claim', checkHoneypot, (req, res) => {
    const { email, crNumber, claimantName, documentUrl } = req.body;
    if (!email || !crNumber || !claimantName) {
      return res.status(400).json({ error: 'Email, CR number, and claimant name are required' });
    }

    const result = db.claimEntity(req.params.id, {
      email,
      crNumber,
      claimantName,
      documentUrl
    });

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.json(result);
  });

  // --- NEWS & SPOTLIGHTS ---
  app.get('/api/news', (req, res) => {
    const { category, search, limit } = req.query;
    const news = db.getNews({
      category: category as string,
      search: search as string,
      limit: limit ? parseInt(limit as string, 10) : undefined
    });
    res.json({ count: news.length, articles: news });
  });

  app.get('/api/news/:slug', (req, res) => {
    const allowDraft = req.query.allowDraft === 'true';
    const article = db.getNewsByIdOrSlug(req.params.slug, allowDraft);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ article });
  });

  // --- NEWS ADMIN & DRAFT PIPELINE ---
  app.get('/api/admin/news/drafts', (req, res) => {
    const drafts = db.getNewsDrafts();
    res.json({ count: drafts.length, drafts });
  });

  app.post('/api/admin/news/generate-draft', async (req, res) => {
    try {
      const { sourceUrl, note, category, authorNote } = req.body;
      if (!sourceUrl || !sourceUrl.trim()) {
        return res.status(400).json({ error: 'Source URL is required to generate news draft.' });
      }

      const generated = await generateNewsDraftWithAI({
        sourceUrl: sourceUrl.trim(),
        note: note ? note.trim() : undefined,
        category,
        authorNote
      });

      // Match mentioned entities to Directory
      const allEntities = db.getEntities();
      const matchedEntityIds: string[] = [];
      if (generated.relatedEntityNames && Array.isArray(generated.relatedEntityNames)) {
        for (const name of generated.relatedEntityNames) {
          const matched = allEntities.find(e => 
            e.name.toLowerCase() === name.toLowerCase() || 
            e.slug.toLowerCase() === name.toLowerCase()
          );
          if (matched && !matchedEntityIds.includes(matched.id)) {
            matchedEntityIds.push(matched.id);
          }
        }
      }

      // Check for entity names mentioned in the generated body
      for (const ent of allEntities) {
        if (!matchedEntityIds.includes(ent.id)) {
          const regex = new RegExp(`\\b${ent.name}\\b`, 'i');
          if (regex.test(generated.body) || regex.test(generated.title)) {
            matchedEntityIds.push(ent.id);
          }
        }
      }

      // Automatically saves with status "draft" — NOT publicly visible until approved!
      const draft = db.addNewsDraft({
        title: generated.title,
        titleEn: generated.title,
        titleAr: generated.titleAr,
        slug: generated.slug,
        body: generated.body,
        category: generated.category,
        summaryEn: generated.summary,
        summaryAr: generated.summaryAr,
        source_links: generated.source_links,
        sourceLinks: generated.source_links,
        author_note: generated.author_note,
        authorNote: generated.author_note,
        readTimeMinutes: generated.readTimeMinutes,
        relatedEntityIds: matchedEntityIds,
        status: 'draft'
      });

      res.status(201).json({
        success: true,
        message: 'Draft generated with Gemini and saved to Pending Queue.',
        draft
      });
    } catch (err: any) {
      console.error('Error generating AI news draft:', err);
      res.status(500).json({ error: err.message || 'Failed to generate news draft' });
    }
  });

  app.post('/api/admin/news/drafts', (req, res) => {
    const { title, slug, body, category, source_links, author_note, summaryEn, summaryAr, relatedEntityIds } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const draft = db.addNewsDraft({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
      body,
      category: category || 'Funding News',
      source_links: source_links || [],
      author_note,
      summaryEn,
      summaryAr,
      relatedEntityIds: relatedEntityIds || []
    });

    res.status(201).json({ draft });
  });

  app.put('/api/admin/news/drafts/:id', (req, res) => {
    const updated = db.updateNewsDraft(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json({ draft: updated });
  });

  app.delete('/api/admin/news/drafts/:id', (req, res) => {
    const success = db.deleteNewsDraft(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json({ success: true, message: 'Draft deleted successfully' });
  });

  app.post('/api/admin/news/drafts/:id/publish', (req, res) => {
    const published = db.approveAndPublishDraft(req.params.id);
    if (!published) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json({
      success: true,
      message: 'Article approved and published to public feed!',
      article: published
    });
  });

  app.post('/api/admin/newsletter/send-digest', (req, res) => {
    const result = db.sendWeeklyDigest();
    res.json(result);
  });

  app.post('/api/news/:id/comments', checkHoneypot, (req, res) => {
    const { authorName, authorRole, authorOrg, comment } = req.body;
    if (!authorName || !comment) {
      return res.status(400).json({ error: 'Name and comment text are required' });
    }

    const updated = db.addNewsComment(req.params.id, {
      authorName,
      authorRole: authorRole || 'Ecosystem Observer',
      authorOrg,
      comment
    });

    if (!updated) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(201).json({ comments: updated.comments });
  });

  app.post('/api/news/:id/like', (req, res) => {
    const likes = db.likeNewsArticle(req.params.id);
    res.json({ likesCount: likes });
  });

  // --- MARKET INTELLIGENCE & QPCI ---
  app.get('/api/index/quarterly', (req, res) => {
    const quarters = db.getIndexQuarters();
    res.json({ quarters });
  });

  app.get('/api/index/report', (req, res) => {
    const report = db.getStateOfCapitalReport();
    res.json({ report });
  });

  app.post('/api/index/report/download', checkHoneypot, (req, res) => {
    const { email, organization, title } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Corporate email is required to receive the research report.' });
    }

    db.logEmail(
      email,
      'Ventures.qa Q2 2026 State of Private Capital Report (PDF Download)',
      'report_download',
      `Dear Reader,\n\nHere is your verified download link for the Q2 2026 Qatar Private Capital Index Report.\nLink: https://ventures.qa/reports/q2-2026-state-of-capital.pdf`
    );

    res.json({
      success: true,
      downloadUrl: '/reports/q2-2026-state-of-capital.pdf',
      message: 'Report sent to your email.'
    });
  });

  // --- DEAL-FLOW MARKETPLACE ---
  app.get('/api/deals', (req, res) => {
    const { sector } = req.query;
    const deals = db.getDeals(sector as string);
    res.json({ count: deals.length, deals });
  });

  app.post('/api/deals', checkHoneypot, (req, res) => {
    const dealData = req.body;
    if (!dealData.companyName || !dealData.targetAmountUsd) {
      return res.status(400).json({ error: 'Company name and target amount are required' });
    }

    const newDeal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      status: 'active',
      raisedSoFarPercent: dealData.raisedSoFarPercent || 0
    };

    db.addDeal(newDeal);
    res.status(201).json({ deal: newDeal });
  });

  app.post('/api/deals/:id/intro', checkHoneypot, (req, res) => {
    const {
      companyName,
      investorName,
      investorEmail,
      investorFirm,
      checkSizeUsd,
      accreditedConfirmed,
      successFeeAgreed,
      notes
    } = req.body;

    if (!investorEmail || !investorName || !checkSizeUsd) {
      return res.status(400).json({ error: 'Missing required investor information' });
    }

    const intro = db.requestDealIntro({
      dealId: req.params.id,
      companyName: companyName || 'Ecosystem Startup',
      investorName,
      investorEmail,
      investorFirm: investorFirm || 'Private Syndicate',
      checkSizeUsd,
      accreditedConfirmed: !!accreditedConfirmed,
      successFeeAgreed: !!successFeeAgreed,
      notes
    });

    res.status(201).json({ success: true, intro });
  });

  app.get('/api/investor-demands', (req, res) => {
    const demands = db.getInvestorDemands();
    res.json({ count: demands.length, demands });
  });

  app.post('/api/investor-demands', checkHoneypot, (req, res) => {
    const demandData = req.body;
    if (!demandData.investorName || !demandData.typicalCheckSize) {
      return res.status(400).json({ error: 'Investor name and typical check size are required' });
    }

    const newDemand = {
      ...demandData,
      id: `demand-${Date.now()}`,
      activeDeployingMandate: true
    };

    db.addInvestorDemand(newDemand);
    res.status(201).json({ demand: newDemand });
  });

  // --- EVENTS ---
  app.get('/api/events', (req, res) => {
    const { type } = req.query;
    const events = db.getEvents(type as string);
    res.json({ count: events.length, events });
  });

  app.post('/api/events', checkHoneypot, (req, res) => {
    const eventData = req.body;
    if (!eventData.titleEn || !eventData.date) {
      return res.status(400).json({ error: 'Title and event date are required' });
    }

    const newEvent = {
      ...eventData,
      id: `event-${Date.now()}`
    };

    db.addEvent(newEvent);
    res.status(201).json({ event: newEvent });
  });

  // --- JOBS ---
  app.get('/api/jobs', (req, res) => {
    const { sector, type } = req.query;
    const jobs = db.getJobs(sector as string, type as string);
    res.json({ count: jobs.length, jobs });
  });

  app.post('/api/jobs', checkHoneypot, (req, res) => {
    const jobData = req.body;
    if (!jobData.titleEn || !jobData.companyName) {
      return res.status(400).json({ error: 'Job title and company name are required' });
    }

    const newJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0]
    };

    db.addJob(newJob);
    res.status(201).json({ job: newJob });
  });

  // --- RESOURCES ---
  app.get('/api/resources', (req, res) => {
    const resources = db.getResources();
    res.json({ count: resources.length, resources });
  });

  // --- NEWSLETTER ---
  app.post('/api/newsletter/subscribe', checkHoneypot, (req, res) => {
    const { email, language } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = db.subscribeNewsletter(email, language || 'en');
    res.json(result);
  });

  // --- SAVED SEARCH ALERTS ---
  app.post('/api/alerts/save-search', checkHoneypot, (req, res) => {
    const { userEmail, sector, stage, keyword } = req.body;
    if (!userEmail) {
      return res.status(400).json({ error: 'Email is required for search alerts' });
    }

    const alert = db.saveSearchAlert({ userEmail, sector, stage, keyword });
    res.status(201).json({ success: true, alert });
  });

  // --- PAYMENTS & STRIPE SIMULATION ---
  app.post('/api/payments/create-checkout', (req, res) => {
    const { itemType, customerEmail, description } = req.body;
    if (!itemType || !customerEmail) {
      return res.status(400).json({ error: 'Item type and customer email are required' });
    }

    const order = db.createPaymentOrder({
      itemType,
      customerEmail,
      description: description || 'Ventures.qa Ecosystem Service'
    });

    res.json({
      success: true,
      order,
      stripeSessionId: `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      receiptUrl: `https://ventures.qa/receipts/${order.orderNumber}`
    });
  });

  // --- ACQUISITION & PARTNERSHIP PROSPECTUS INQUIRIES ---
  app.post('/api/acquisitions/inquiry', checkHoneypot, (req, res) => {
    const { name, organization, email, inquiryType, estimatedBudget, message } = req.body;
    if (!name || !organization || !email) {
      return res.status(400).json({ error: 'Name, organization, and email are required' });
    }

    const inquiry = db.recordAcquisitionInquiry({
      name,
      organization,
      email,
      inquiryType: inquiryType || 'acquisition',
      estimatedBudget,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received under strict mutual NDA. Our team will follow up within 24 hours.',
      inquiryId: inquiry.id
    });
  });

  app.get('/api/acquisitions/inquiries', (req, res) => {
    const inquiries = db.getAcquisitionInquiries();
    res.json({ count: inquiries.length, inquiries });
  });

  // --- FILE UPLOAD HANDLER ---
  app.post('/api/uploads', (req, res) => {
    const { originalName, mimeType, base64Data, size, isPrivate } = req.body;
    if (!originalName || !base64Data) {
      return res.status(400).json({ error: 'File name and data are required' });
    }

    const uploaded = db.registerUploadedFile({
      originalName,
      mimeType: mimeType || 'application/pdf',
      size: size || 1024 * 50,
      base64OrDataUrl: base64Data,
      isPrivate: !!isPrivate
    });

    res.status(201).json({ file: uploaded });
  });

  // --- ADMIN METRICS & MODERATION ---
  app.get('/api/admin/metrics', (req, res) => {
    const stats = db.getAdminStats();
    res.json(stats);
  });

  // --- SEO FEEDS ---
  app.get('/rss.xml', (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateRssXml());
  });

  app.get('/sitemap.xml', (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemapXml());
  });

  app.get('/robots.txt', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: https://ventures.qa/sitemap.xml\n`);
  });

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ventures.qa server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
