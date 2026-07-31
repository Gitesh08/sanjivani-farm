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
    <main id="main-content" class="guide-list">
      <header class="guide-list__header">
        <h1>Palghar & Konkan Insider Guide</h1>
        <p>Discover local secrets, travel tips, and wellness insights from the experts at Sanjivani Farm.</p>
      </header>

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
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    #main-content { outline: none; padding-top: clamp(6rem, 12vw, 8rem); }
    
    .guide-list {
      max-width: var(--max-width-lg);
      margin: 0 auto;
      padding-inline: var(--container-padding);
      padding-bottom: 4rem;
    }

    .guide-list__header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .guide-list__header h1 {
      font-family: var(--font-serif);
      font-size: clamp(2.5rem, 5vw, 4rem);
      color: var(--color-text-primary);
      margin-bottom: 1rem;
    }

    .guide-list__header p {
      font-family: var(--font-sans);
      font-size: 1.125rem;
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }

    .guide-list__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .guide-card {
      background: var(--color-bg-base);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 1rem;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease, border-color 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .guide-card:hover {
      transform: translateY(-5px);
      border-color: var(--color-primary);
    }

    .guide-card__image {
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
    }

    .guide-card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .guide-card:hover .guide-card__image img {
      transform: scale(1.05);
    }

    .guide-card__content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .guide-card__meta {
      font-family: var(--font-sans);
      font-size: 0.875rem;
      color: var(--color-primary);
      margin-bottom: 0.5rem;
    }

    .guide-card__title {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      color: var(--color-text-primary);
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    .guide-card__desc {
      font-family: var(--font-sans);
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      margin-bottom: 1.5rem;
      line-height: 1.6;
      flex-grow: 1;
    }

    .guide-card__readmore {
      font-family: var(--font-sans);
      font-weight: 600;
      color: var(--color-primary);
      font-size: 0.9rem;
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
