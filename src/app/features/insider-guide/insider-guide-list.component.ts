import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { GUIDE_POSTS } from '../../core/data/insider-guide.data';

import { NavbarComponent } from '../home/components/navbar/navbar';
import { FooterComponent } from '../home/components/footer/footer';

@Component({
  selector: 'app-insider-guide-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar [forceScrolled]="true" />
    <main id="main-content" class="guide-list-page">
      <div class="container">
      <div class="guide-list__header-container">
        <a routerLink="/" class="btn btn-secondary btn-sm" aria-label="Back to Home" style="margin-bottom: 2rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 5 5 12 12 19"/>
          </svg>
          Back to Home
        </a>
        <header class="guide-list__header">
          <span class="section-tag">Insider Guide</span>
          <h1 class="display-lg font-heading">Travel & Wellness Journal</h1>
          <p class="body-xl text-muted">Discover local secrets, travel tips, and wellness insights from the experts at Sanjivani Farm.</p>
        </header>
      </div>

      <div class="guide-list__grid">
        <article *ngFor="let post of posts" class="guide-card" [routerLink]="['/insider-guide', post.id]">
          <div class="guide-card__image">
            <img [src]="post.image" [alt]="post.title" loading="lazy">
          </div>
          <div class="guide-card__content">
            <span class="guide-card__meta">{{ post.date }} &middot; {{ post.readTime }}</span>
            <h2 class="guide-card__title">{{ post.title }}</h2>
            <p class="guide-card__desc">{{ post.description }}</p>
            <span class="guide-card__readmore">Read Article &rarr;</span>
          </div>
        </article>
      </div>
    </div>
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; background-color: var(--color-surface); min-height: 100vh; }
    #main-content { outline: none; padding-top: clamp(6rem, 12vw, 8rem); padding-bottom: 6rem; }
    
    .guide-list-page {
      padding-top: clamp(6rem, 12vw, 8rem);
      padding-bottom: 6rem;
    }

    .guide-list__header-container {
      max-width: var(--max-width-lg);
      margin: 0 auto;
    }

    .guide-list__header {
      text-align: left;
      margin-bottom: 4rem;
    }

    .guide-list__header h1 {
      color: var(--color-on-surface);
      margin-bottom: 1rem;
      margin-top: 1rem;
    }

    .guide-list__header p {
      max-width: 650px;
    }

    .guide-list__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      max-width: var(--max-width-lg);
      margin: 0 auto;
    }

    .guide-card {
      background: var(--color-surface-variant);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: var(--radius-xl);
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.4s var(--ease-spring), border-color 0.3s ease, box-shadow 0.4s ease;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .guide-card:hover {
      transform: translateY(-8px);
      border-color: rgba(255,255,255,0.15);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }

    .guide-card__image {
      width: 100%;
      aspect-ratio: 16/10;
      overflow: hidden;
    }

    .guide-card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s var(--ease-spring);
    }

    .guide-card:hover .guide-card__image img {
      transform: scale(1.08);
    }

    .guide-card__content {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .guide-card__meta {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-secondary);
      margin-bottom: 1rem;
    }

    .guide-card__title {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--color-on-surface);
      margin-bottom: 0.75rem;
      line-height: 1.2;
    }

    .guide-card__desc {
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--color-on-surface-variant);
      margin-bottom: 2rem;
      line-height: 1.6;
      flex-grow: 1;
    }

    .guide-card__readmore {
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 600;
      color: var(--color-primary);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: gap 0.3s ease;
    }

    .guide-card:hover .guide-card__readmore {
      gap: 1rem;
    }
  `]
})
export class InsiderGuideListComponent implements OnInit {
  posts = Object.values(GUIDE_POSTS);
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Palghar & Konkan Insider Guide | Sanjivani Farm',
      description: 'Discover local secrets, travel tips, and wellness insights for the Palghar, Saphale, and Vasai-Virar region.',
      keywords: 'palghar travel guide, kelve beach tips, konkan tourism'
    });
  }
}
