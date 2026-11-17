import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private isInitialized = false;
  private trackingId = environment.googleAnalyticsId || '';

  constructor(@Inject(DOCUMENT) private doc: Document) {
    if (this.isBrowser && this.isValidId(this.trackingId)) {
      this.init(this.trackingId);
    }
  }

  private isValidId(id?: string): boolean {
    return !!id && id.trim().length > 3 && id.startsWith('G-') && id !== 'G-XXXXXXXXXX';
  }

  /**
   * Initializes GA4 gtag.js asynchronously without blocking initial paint or Lighthouse.
   */
  init(id: string): void {
    if (!this.isBrowser || this.isInitialized || !this.isValidId(id)) return;

    this.trackingId = id.trim();

    // Setup dataLayer and gtag stub
    const win = this.doc.defaultView as Window | null;
    if (!win) return;

    win.dataLayer = win.dataLayer || [];
    win.gtag = function () {
      win.dataLayer?.push(arguments);
    };

    win.gtag('js', new Date());
    win.gtag('config', this.trackingId, {
      send_page_view: false // Managed manually via Angular Router navigation events
    });

    // Inject gtag.js script tag
    const script = this.doc.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
    this.doc.head.appendChild(script);

    this.isInitialized = true;
  }

  /**
   * Tracks an SPA page view on Angular route change.
   */
  trackPageView(url: string, title?: string): void {
    if (!this.isBrowser) return;

    const win = this.doc.defaultView as Window | null;
    if (win?.gtag && this.isInitialized) {
      win.gtag('event', 'page_view', {
        page_path: url,
        page_title: title || this.doc.title,
        page_location: win.location.href
      });
    }
  }

  /**
   * Tracks a custom conversion or engagement event (e.g. "book_cottage_click", "whatsapp_chat_open").
   */
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (!this.isBrowser) return;

    const win = this.doc.defaultView as Window | null;
    if (win?.gtag && this.isInitialized) {
      win.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }
}
