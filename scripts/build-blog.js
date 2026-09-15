#!/usr/bin/env node
/**
 * Techembrace blog builder.
 *
 * Reads every Markdown file in content/blog/, converts each into a
 * standalone static HTML page (blog-<slug>.html) using
 * templates/blog-post-template.html, and regenerates blog.html (the
 * index/hub page) from templates/blog-index-template.html.
 *
 * This is the whole "no build tooling" site's one build step, run only
 * by the GitHub Action in .github/workflows/build-blog.yml — never
 * needed for any of the other hand-written pages.
 *
 * Usage: node scripts/build-blog.js
 * (run from the repo root)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const POST_TEMPLATE_PATH = path.join(ROOT, 'templates', 'blog-post-template.html');
const INDEX_TEMPLATE_PATH = path.join(ROOT, 'templates', 'blog-index-template.html');

function fail(msg) {
  console.error(`\n[build-blog] ERROR: ${msg}\n`);
  process.exit(1);
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDateDisplay(dateVal) {
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal || '');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

if (!fs.existsSync(CONTENT_DIR)) {
  console.log(`[build-blog] No content/blog directory found at ${CONTENT_DIR} — nothing to build.`);
  process.exit(0);
}

const postTemplate = fs.readFileSync(POST_TEMPLATE_PATH, 'utf8');
const indexTemplate = fs.readFileSync(INDEX_TEMPLATE_PATH, 'utf8');

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

if (files.length === 0) {
  console.log('[build-blog] No .md files in content/blog — nothing to build.');
}

const posts = [];

for (const file of files) {
  const fullPath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data: fm, content: body } = matter(raw);

  if (!fm.title) fail(`${file} is missing required frontmatter field "title"`);
  if (!fm.date) fail(`${file} is missing required frontmatter field "date"`);

  const slug = fm.slug ? slugify(fm.slug) : slugify(fm.title);
  const excerpt = fm.excerpt || '';
  const tags = Array.isArray(fm.tags) ? fm.tags : (fm.tags ? [fm.tags] : []);
  const heroImage = fm.hero_image || '';
  const heroAlt = fm.hero_image_alt || fm.title;

  posts.push({
    slug,
    title: fm.title,
    date: fm.date,
    dateDisplay: formatDateDisplay(fm.date),
    excerpt,
    tags,
    heroImage,
    heroAlt,
    bodyHtml: marked.parse(body),
    outputFile: `blog-${slug}.html`,
  });
}

// Newest first
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// --- Write each post page ---
for (const post of posts) {
  const tagsEyebrow = post.tags.length ? post.tags.join(' · ') : 'Blog';
  const heroBlock = post.heroImage
    ? `<img src="${escapeHtml(post.heroImage)}" alt="${escapeHtml(post.heroAlt)}" style="width:100%; border-radius:var(--radius); margin-bottom:30px;">`
    : '';

  let html = postTemplate
    .split('{{TITLE}}').join(escapeHtml(post.title))
    .split('{{EXCERPT}}').join(escapeHtml(post.excerpt))
    .split('{{TAGS_EYEBROW}}').join(escapeHtml(tagsEyebrow))
    .split('{{DATE_DISPLAY}}').join(escapeHtml(post.dateDisplay))
    .split('{{HERO_IMAGE_BLOCK}}').join(heroBlock)
    .split('{{BODY_HTML}}').join(post.bodyHtml);

  const outPath = path.join(ROOT, post.outputFile);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`[build-blog] wrote ${post.outputFile}`);
}

// --- Write the blog index page ---
const cards = posts.map((post) => {
  const tagSpans = post.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('');
  const imgSrc = post.heroImage || 'assets/images/techembrace-icon.png';
  return `        <a href="${post.outputFile.replace(/\.html$/, '')}" class="project-card" style="display:block; color:inherit; text-decoration:none;">
          <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(post.heroAlt)}">
          <div class="body">
            <div class="tags">${tagSpans}</div>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.excerpt)}</p>
          </div>
        </a>`;
}).join('\n');

const emptyState = `        <p style="color:var(--muted);">First post coming soon.</p>`;

const indexHtml = indexTemplate.split('{{POST_CARDS}}').join(posts.length ? cards : emptyState);
fs.writeFileSync(path.join(ROOT, 'blog.html'), indexHtml, 'utf8');
console.log(`[build-blog] wrote blog.html (${posts.length} post${posts.length === 1 ? '' : 's'})`);
