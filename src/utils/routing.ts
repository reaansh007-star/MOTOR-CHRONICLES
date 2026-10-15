import { Article, ArticleCategory } from '../types';
import { ARTICLES } from '../data/articles';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Clean and readable URLs:
 * e.g. /indian-suv-market, /electric-vehicles-india, /royal-enfield-motorcycles
 */
export function getArticleUrl(articleOrId: Article | string): string {
  if (typeof articleOrId === 'string') {
    const found = ARTICLES.find((a) => a.id === articleOrId || a.slug === articleOrId);
    return found ? `/${found.slug}` : `/article/${articleOrId}`;
  }
  return `/${articleOrId.slug || articleOrId.id}`;
}

export function getCategoryUrl(category: ArticleCategory): string {
  const catSlug = slugify(category);
  return `/category/${catSlug}`;
}

export function getShowdownUrl(showdownId?: string): string {
  return showdownId ? `/showdown/${showdownId}` : '/showdown';
}

export function getSavedUrl(): string {
  return '/saved';
}

export function getHomepageUrl(): string {
  return '/car-news-india';
}

export interface RouteState {
  type: 'home' | 'article' | 'category' | 'showdown' | 'saved';
  article?: Article;
  category?: ArticleCategory;
  showdownId?: string;
  isCanonicalRedirect?: boolean;
}

export function findArticleByIdOrSlug(slugOrId: string): Article | undefined {
  if (!slugOrId) return undefined;
  const decoded = decodeURIComponent(slugOrId).trim().toLowerCase().replace(/^\//, '');

  return ARTICLES.find((a) => {
    return (
      a.slug.toLowerCase() === decoded ||
      a.id.toLowerCase() === decoded ||
      slugify(a.title) === decoded ||
      a.slug.replace(/-/g, '') === decoded.replace(/-/g, '') ||
      a.id.replace(/-/g, '') === decoded.replace(/-/g, '')
    );
  });
}

export function categoryFromSlug(slug: string): ArticleCategory | undefined {
  const clean = slug.toLowerCase().replace(/-/g, ' ');
  if (clean.includes('india')) return 'INDIA AUTO';
  if (clean.includes('ev')) return 'EV REVOLUTION';
  if (clean.includes('two') || clean.includes('wheel') || clean.includes('motorcycle')) return 'TWO WHEELS';
  if (clean.includes('performance') || clean.includes('supercar')) return 'PERFORMANCE';
  if (clean.includes('motorsport') || clean.includes('f1')) return 'MOTORSPORT';
  return undefined;
}

export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { type: 'home' };
  }

  const rawPath = window.location.pathname;
  const path = rawPath.replace(/\/$/, '') || '/';
  const search = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  // 1. Check Query Parameters
  const queryArticle = search.get('article') || search.get('story');
  if (queryArticle) {
    const matched = findArticleByIdOrSlug(queryArticle);
    if (matched) return { type: 'article', article: matched };
  }

  const queryCategory = search.get('category');
  if (queryCategory) {
    const matchedCat = categoryFromSlug(queryCategory);
    if (matchedCat) return { type: 'category', category: matchedCat };
  }

  if (search.get('view') === 'showdown' || search.get('tab') === 'showdown') {
    return { type: 'showdown', showdownId: search.get('id') || undefined };
  }

  if (search.get('view') === 'saved' || search.get('tab') === 'saved') {
    return { type: 'saved' };
  }

  // 2. Check Hash routing
  if (hash.startsWith('#/article/')) {
    const slug = hash.replace('#/article/', '');
    const matched = findArticleByIdOrSlug(slug);
    if (matched) return { type: 'article', article: matched };
  }

  // 3. Check Homepage paths: '/' or '/car-news-india'
  if (path === '/' || path === '/car-news-india') {
    return { type: 'home' };
  }

  // 4. Check Direct Article Slugs (e.g. /indian-suv-market, /electric-vehicles-india, /royal-enfield-motorcycles)
  const trimmedSlug = path.replace(/^\//, '');
  const directArticle = findArticleByIdOrSlug(trimmedSlug);
  if (directArticle) {
    return { type: 'article', article: directArticle };
  }

  // 5. Check Legacy /article/:slug routing and redirect to clean slug
  if (path.startsWith('/article/')) {
    const slug = path.replace('/article/', '').split('/')[0];
    const matched = findArticleByIdOrSlug(slug);
    if (matched) {
      return { type: 'article', article: matched, isCanonicalRedirect: true };
    }
  }

  // 6. Check Category routing
  if (path.startsWith('/category/')) {
    const slug = path.replace('/category/', '').split('/')[0];
    const matchedCat = categoryFromSlug(slug);
    if (matchedCat) return { type: 'category', category: matchedCat };
  }

  // 7. Check Showdown and Saved routes
  if (path.startsWith('/showdown')) {
    const slug = path.replace('/showdown', '').replace(/^\//, '').split('/')[0];
    return { type: 'showdown', showdownId: slug || undefined };
  }

  if (path.startsWith('/saved')) {
    return { type: 'saved' };
  }

  return { type: 'home' };
}
