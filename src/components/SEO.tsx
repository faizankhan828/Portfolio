import { useEffect } from 'react';
import type { SEO as SEOType } from '../types/portfolio';

interface SEOProps {
  data: SEOType;
}

export default function SEO({ data }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = data.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', data.description);
    updateMetaTag('keywords', data.keywords);
    updateMetaTag('author', data.author);

    // Open Graph tags
    updateMetaTag('og:title', data.title, true);
    updateMetaTag('og:description', data.description, true);
    updateMetaTag('og:image', data.ogImage, true);
    updateMetaTag('og:url', data.siteUrl, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', data.title);
    updateMetaTag('twitter:description', data.description);
    updateMetaTag('twitter:image', data.ogImage);

    // Additional SEO tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#6366f1');
  }, [data]);

  return null; // This component doesn't render anything
}
