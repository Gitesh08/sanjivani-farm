import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-book-redirect',
  standalone: true,
  template: `
    <div class="book-redirect">
      <div class="book-redirect__card">
        <img src="/assets/images/farm-logo.svg" alt="Sanjivani Farms Logo" width="84" height="84" class="book-redirect__logo">
        <h1 class="book-redirect__title">Sanjivani Farm &amp; Resort</h1>
        <p class="book-redirect__status">Connecting to our official Doorloom reservation portal...</p>
        <div class="book-redirect__spinner" aria-hidden="true"></div>
        <p class="book-redirect__fallback">
          If you are not redirected automatically within a few seconds,
          <a [href]="doorloomUrl" class="book-redirect__btn">click here to book on Doorloom</a>.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .book-redirect {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #040F16;
      color: #ffffff;
      padding: 1.5rem;
      text-align: center;
      font-family: var(--font-body, system-ui, sans-serif);
    }
    .book-redirect__card {
      max-width: 440px;
      padding: 2.5rem 2rem;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .book-redirect__logo {
      width: 76px;
      height: 76px;
      object-fit: contain;
    }
    .book-redirect__title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #F8F9F5;
      margin: 0;
    }
    .book-redirect__status {
      font-size: 0.95rem;
      color: #087592;
      font-weight: 500;
      margin: 0;
    }
    .book-redirect__spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-top-color: #087592;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0.5rem 0;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .book-redirect__fallback {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    }
    .book-redirect__btn {
      display: inline-block;
      margin-top: 0.75rem;
      padding: 0.65rem 1.25rem;
      border-radius: 999px;
      background: #105B85;
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.85rem;
      transition: background 0.2s ease;
    }
    .book-redirect__btn:hover {
      background: #087592;
    }
  `]
})
export class BookRedirectComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private seoService = inject(SeoService);

  readonly doorloomUrl = 'https://sanjivanifarmandresort.doorloom.com';

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Book Your Stay | Sanjivani Farm & Resort',
      description: 'Check live room availability, dynamic rates, and reserve your cottage stay directly at Sanjivani Farm & Resort Palghar via Doorloom.',
      keywords: 'Book Sanjivani Farm, resort booking Palghar, cottage reservation Palghar, Doorloom reservations',
      url: '/book'
    });

    if (isPlatformBrowser(this.platformId)) {
      window.location.replace(this.doorloomUrl);
    }
  }
}
