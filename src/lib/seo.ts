
import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
}

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/';
  }

  return `/${path.replace(/^\/+|\/+$/g, '')}`;
}

function buildCanonicalUrl(path: string): string {
  const normalizedPath = normalizePath(path);

  return new URL(
    normalizedPath,
    `${SITE_CONFIG.url.replace(/\/$/, '')}/`,
  ).toString();
}

function setMeta(
  selector: string,
  attribute: 'name' | 'property',
  key: string,
  value: string,
): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    selector,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', value);
}

function setCanonical(url: string): void {
  let canonical =
    document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', url);
}

export function useSEO({
  title,
  description,
  path = '/',
  type = 'website',
}: SEOProps): void {
  useEffect(() => {
    const fullTitle = title.includes(SITE_CONFIG.name)
      ? title
      : `${title} | ${SITE_CONFIG.name}`;

    const canonicalUrl = buildCanonicalUrl(path);

    document.title = fullTitle;

    // Standard SEO metadata
    setMeta(
      'meta[name="description"]',
      'name',
      'description',
      description,
    );

    // Open Graph
    setMeta(
      'meta[property="og:title"]',
      'property',
      'og:title',
      fullTitle,
    );

    setMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      description,
    );

    setMeta(
      'meta[property="og:type"]',
      'property',
      'og:type',
      type,
    );

    setMeta(
      'meta[property="og:url"]',
      'property',
      'og:url',
      canonicalUrl,
    );

    setMeta(
      'meta[property="og:site_name"]',
      'property',
      'og:site_name',
      SITE_CONFIG.name,
    );

    // Twitter / X
    setMeta(
      'meta[name="twitter:card"]',
      'name',
      'twitter:card',
      'summary_large_image',
    );

    setMeta(
      'meta[name="twitter:title"]',
      'name',
      'twitter:title',
      fullTitle,
    );

    setMeta(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      description,
    );

    // Canonical URL
    setCanonical(canonicalUrl);
  }, [title, description, path, type]);
}
