import { GoogleGenAI } from '@google/genai';

export interface DraftGenerationInput {
  sourceUrl: string;
  note?: string;
  category?: string;
  authorNote?: string;
}

export interface GeneratedDraftResult {
  title: string;
  titleAr?: string;
  slug: string;
  category: 'Funding News' | 'Policy & Regulation' | 'Market Trends' | 'Startup Spotlight' | 'Events';
  summary: string;
  summaryAr?: string;
  body: string;
  source_links: Array<{ name: string; url: string }>;
  author_note?: string;
  readTimeMinutes: number;
  relatedEntityNames?: string[];
}

/**
 * Attempt to fetch and extract textual context from a source URL to ground Gemini.
 */
async function extractUrlText(url: string): Promise<{ title?: string; textSnippet?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) VenturesQaEditorialBot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    clearTimeout(timeout);
    if (!res.ok) return {};
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : undefined;

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
                      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const metaDesc = descMatch ? descMatch[1].trim() : '';

    const cleaned = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ');

    const textPieces: string[] = [];
    if (metaDesc) textPieces.push(metaDesc);
    const pMatches = cleaned.match(/<(p|h1|h2|h3|article)[^>]*>([^<]+)<\/\1>/gi);
    if (pMatches) {
      for (const m of pMatches.slice(0, 35)) {
        const text = m.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (text.length > 25 && !textPieces.includes(text)) {
          textPieces.push(text);
        }
      }
    }

    return {
      title,
      textSnippet: textPieces.join('\n\n').slice(0, 5000)
    };
  } catch {
    return {};
  }
}

export async function generateNewsDraftWithAI(input: DraftGenerationInput): Promise<GeneratedDraftResult> {
  const ai = new GoogleGenAI();

  // Try scraping the provided source URL for live grounding
  const scraped = await extractUrlText(input.sourceUrl);

  const prompt = `You are the chief venture intelligence editor for Ventures.qa, Qatar's independent private capital, tech startup, and ecosystem intelligence platform.
Your mandate is to generate an original, objective, analytical news draft based on the provided source URL and context, conforming strictly to the platform's editorial standards.

SOURCE URL:
${input.sourceUrl}

${scraped.title ? `DETECTED SOURCE HEADLINE:\n${scraped.title}\n` : ''}
${scraped.textSnippet ? `EXTRACTED SOURCE CONTENT:\n${scraped.textSnippet}\n` : ''}
${input.note ? `ADDITIONAL USER CONTEXT / NOTES:\n${input.note}\n` : ''}

PREFERRED CATEGORY:
${input.category || 'Auto-select from: Funding News, Policy & Regulation, Market Trends, Startup Spotlight, Events'}

STRICT EDITORIAL STANDARDS (VENTURES.QA STYLE GUIDE):
1. COMPLETELY ORIGINAL WORDING: Synthesize the news in fresh, clear, professional financial journalism prose. Never copy verbatim sentences or marketing jargon from the source text.
2. ANALYTICAL DEPTH & ECOSYSTEM ANALYSIS: The article must NOT simply recite facts. It MUST feature an analytical breakdown and a dedicated section or subsection titled "### Strategic Implications for Qatari Founders & Investors", assessing:
   - What this development signals for early-stage operators, local talent, and business models in Qatar.
   - Actionable takeaways for local angel syndicates, venture capitalists, family offices, and institutional backers (e.g. QDB, QIA, Invest Qatar).
   - How it connects to Qatar's broader economic diversification and tech ecosystem maturity.
3. FACTUAL INTEGRITY: Strictly report verified figures, company names, round structures, and dates. If financial details, valuations, or cap tables were not disclosed in the source, explicitly state that terms were undisclosed. NEVER hallucinate unverified numbers or quotes.
4. FORMAL SOURCES CITATION: Conclude the article markdown with a clean citation line:
   "**Sources:** [Original Source Announcement](${input.sourceUrl})"
5. DUAL-LANGUAGE METADATA: Provide both an authoritative English title & summary, and a professional, idiomatic Arabic title & summary.
6. SLUG & CATEGORY:
   - "slug": Short, lowercase, hyphenated URL-friendly slug (e.g. "qdb-scaleup-venture-fund" or "snoonu-regional-expansion").
   - "category": Must be strictly one of: "Funding News", "Policy & Regulation", "Market Trends", "Startup Spotlight", "Events".

Return a valid JSON object matching this schema:
{
  "title": "Compelling, journalistic headline in English",
  "titleAr": "Professional headline in Arabic",
  "slug": "url-friendly-slug",
  "category": "Funding News" | "Policy & Regulation" | "Market Trends" | "Startup Spotlight" | "Events",
  "summary": "1-2 sentence executive briefing in English highlighting the core milestone and its strategic relevance",
  "summaryAr": "1-2 sentence executive briefing in Arabic",
  "body": "Full article in markdown. Structure: Executive Overview, Key Facts & Commercial Mechanics, '### Strategic Implications for Qatari Founders & Investors' analysis, and the concluding Sources line.",
  "source_links": [
    { "name": "${scraped.title ? scraped.title.slice(0, 50).replace(/"/g, "'") : 'Primary Source'}", "url": "${input.sourceUrl}" }
  ],
  "author_note": "${input.authorNote ? input.authorNote.replace(/"/g, '\\"') : ''}",
  "readTimeMinutes": 3,
  "relatedEntityNames": ["List of relevant company or institution names mentioned, e.g. Snoonu, QDB, SkipCash, Avey"]
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: 'application/json'
    }
  });

  const text = response.text || '{}';
  const parsed = JSON.parse(text);

  // Normalize category to allowed values
  const validCategories = [
    'Funding News',
    'Policy & Regulation',
    'Market Trends',
    'Startup Spotlight',
    'Events'
  ];
  let category = parsed.category;
  if (!validCategories.includes(category)) {
    if (category?.toLowerCase().includes('fund')) category = 'Funding News';
    else if (category?.toLowerCase().includes('policy') || category?.toLowerCase().includes('reg')) category = 'Policy & Regulation';
    else if (category?.toLowerCase().includes('trend') || category?.toLowerCase().includes('market')) category = 'Market Trends';
    else if (category?.toLowerCase().includes('spotlight')) category = 'Startup Spotlight';
    else if (category?.toLowerCase().includes('event')) category = 'Events';
    else category = 'Funding News';
  }

  // Ensure source link exists
  const source_links = Array.isArray(parsed.source_links) && parsed.source_links.length > 0
    ? parsed.source_links
    : [{ name: 'Primary Source', url: input.sourceUrl }];

  return {
    title: parsed.title || 'Ecosystem Development Report',
    titleAr: parsed.titleAr || parsed.title,
    slug: parsed.slug ? parsed.slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-') : `news-${Date.now()}`,
    category,
    summary: parsed.summary || '',
    summaryAr: parsed.summaryAr || parsed.summary || '',
    body: parsed.body || '',
    source_links,
    author_note: parsed.author_note || input.authorNote,
    readTimeMinutes: parsed.readTimeMinutes || 3,
    relatedEntityNames: parsed.relatedEntityNames || []
  };
}
