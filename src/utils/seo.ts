/**
 * SEO & Head Metadata Manager
 * Dynamically updates document title, meta descriptions, canonical URLs, and Schema.org JSON-LD
 */

export interface MetaConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  jsonLd?: object;
}

export function updatePageMeta(config: MetaConfig): void {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = config.title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, nameOrProperty);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Update Meta Description
  setMeta('description', config.description);

  // 4. Update OpenGraph & Twitter Tags
  const fullCanonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${config.canonicalPath}`
    : config.canonicalPath;

  setMeta('og:title', config.title, true);
  setMeta('og:description', config.description, true);
  setMeta('og:url', fullCanonicalUrl, true);
  setMeta('og:type', config.ogType || 'website', true);
  setMeta('og:site_name', 'Motor Chronicles', true);

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', config.title);
  setMeta('twitter:description', config.description);

  // 5. Update Canonical Tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullCanonicalUrl);

  // 6. Update or inject JSON-LD structured data
  const jsonLdId = 'motor-chronicles-jsonld';
  let jsonLdScript = document.getElementById(jsonLdId);
  if (config.jsonLd) {
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      jsonLdScript.setAttribute('id', jsonLdId);
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(config.jsonLd);
  } else if (jsonLdScript) {
    jsonLdScript.remove();
  }
}
