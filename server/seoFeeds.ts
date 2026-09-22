import { db } from './db';

export function generateRssXml(): string {
  const articles = db.getNews();
  const siteUrl = 'https://ventures.qa';

  const itemsXml = articles.map(article => {
    const title = article.title || article.titleEn;
    const pubDate = new Date(article.published_date || article.publishedDate).toUTCString();
    const description = article.summaryEn || (article.body ? article.body.slice(0, 240) + '...' : '');
    const sourceTag = article.source_links && article.source_links[0]
      ? `\n      <source url="${article.source_links[0].url}">${article.source_links[0].name}</source>`
      : '';

    return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${siteUrl}/news/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/news/${article.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <author>${article.author || 'Ventures.qa Editorial Desk'}</author>
      <category>${article.category}</category>${sourceTag}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ventures.qa — Qatar Startup &amp; Private Capital Intelligence</title>
    <link>${siteUrl}</link>
    <description>Independent venture reporting, startup spotlights, and private market data for Qatar and the GCC region.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;
}

export function generateSitemapXml(): string {
  const siteUrl = 'https://ventures.qa';
  const entities = db.getEntities();
  const news = db.getNews();

  const staticPages = [
    '',
    '/directory',
    '/news',
    '/intelligence',
    '/deals',
    '/events',
    '/jobs',
    '/resources'
  ];

  const staticXml = staticPages.map(page => `  <url>
    <loc>${siteUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');

  const entitiesXml = entities.map(e => `  <url>
    <loc>${siteUrl}/directory/${e.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

  const newsXml = news.map(n => `  <url>
    <loc>${siteUrl}/news/${n.slug}</loc>
    <lastmod>${n.publishedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${entitiesXml}
${newsXml}
</urlset>`;
}
