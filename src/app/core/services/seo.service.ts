import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultImage = 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:good,w_1200/v1786185697/16-acre-farm_y2ikvq.webp';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  updateSeo(config: SeoConfig): void {
    // Title
    this.titleService.setTitle(config.title);

    // Standard Meta
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:image', content: config.image || this.defaultImage });
    this.metaService.updateTag({ property: 'og:type', content: config.type || 'website' });

    // Twitter Cards (Synced for social & search crawlers)
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.image || this.defaultImage });

    if (config.url) {
      const absoluteUrl = config.url.startsWith('/') 
        ? `https://sanjivanifarm.com${config.url}` 
        : config.url;
        
      this.metaService.updateTag({ property: 'og:url', content: absoluteUrl });
      this.updateCanonicalUrl(absoluteUrl);
    }
  }

  private updateCanonicalUrl(url: string): void {
    const head = this.doc.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this.doc.querySelector(`link[rel='canonical']`) || null;
    if (!element) {
      element = this.doc.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }
    element.setAttribute('href', url);
  }

  // Inject JSON-LD Schema
  injectStructuredData(schemaData: any, scriptId: string = 'structured-data-main'): void {
    const head = this.doc.getElementsByTagName('head')[0];
    // Remove existing script with this specific scriptId
    const existing = this.doc.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }
    
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.text = JSON.stringify(schemaData);
    head.appendChild(script);
  }

  // Inject Breadcrumbs Schema for Google Sitelinks & Rich Results
  injectBreadcrumbs(breadcrumbs: { name: string; url: string }[]): void {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": b.url.startsWith('/') ? `https://sanjivanifarm.com${b.url}` : b.url
      }))
    };
    this.injectStructuredData(schema, 'structured-data-breadcrumbs');
  }
}
