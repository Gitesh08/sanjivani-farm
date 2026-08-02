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
  private defaultImage = 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776530402/image_ucfeks.png';

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
  injectStructuredData(schemaData: any): void {
    const head = this.doc.getElementsByTagName('head')[0];
    // Remove existing
    const existing = this.doc.getElementById('structured-data');
    if (existing) {
      existing.remove();
    }
    
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data';
    script.text = JSON.stringify(schemaData);
    head.appendChild(script);
  }
}
