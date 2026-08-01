import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { GUIDE_POSTS, GuidePost } from '../../core/data/insider-guide.data';

import { NavbarComponent } from '../home/components/navbar/navbar';
import { FooterComponent } from '../home/components/footer/footer';

@Component({
  selector: 'app-insider-guide-post',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar [forceScrolled]="true" />
    <main id="main-content" class="guide-post-page" *ngIf="post">
      <div class="container">
        <article class="post-article">
        <div class="post-header-container">
          <a routerLink="/insider-guide" class="btn btn-secondary btn-sm" aria-label="Back to Guide" style="margin-bottom: 2rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 5 5 12 12 19"/>
            </svg>
            Back to Guides
          </a>
        </div>
        <header class="post-header">
          <span class="post-meta">{{ post.date }} &middot; {{ post.readTime }} &middot; By {{ post.author }}</span>
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-desc">{{ post.description }}</p>
        </header>

        <div class="post-image">
          <img [src]="post.image" [alt]="post.title" fetchpriority="high">
        </div>

        <div class="post-content" [innerHTML]="post.content"></div>
        </article>
      </div>
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; background-color: var(--color-surface); min-height: 100vh; }
    #main-content { outline: none; padding-top: clamp(6rem, 12vw, 8rem); padding-bottom: 6rem; }
    
    .guide-post-page {
      padding-top: clamp(6rem, 12vw, 8rem);
      padding-bottom: 6rem;
    }
    
    .post-article {
      max-width: var(--max-width-md);
      margin: 0 auto;
    }

    .post-header-container {
      margin-bottom: 1rem;
    }

    .post-header {
      margin-bottom: 3rem;
      text-align: left;
    }

    .post-meta {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1.5rem;
      display: block;
    }

    .post-title {
      font-family: var(--font-heading);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 500;
      color: var(--color-on-surface);
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }

    .post-desc {
      font-family: var(--font-body);
      font-size: 1.25rem;
      color: var(--color-on-surface-variant);
      line-height: 1.6;
    }

    .post-image {
      width: 100%;
      border-radius: var(--radius-xl);
      overflow: hidden;
      margin-bottom: 4rem;
      aspect-ratio: 16/9;
    }

    .post-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Content Typography */
    .post-content {
      font-family: var(--font-body);
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--color-on-surface-variant);
    }

    ::ng-deep .post-content h2 {
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 500;
      color: var(--color-on-surface);
      margin-top: 3.5rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    ::ng-deep .post-content p {
      margin-bottom: 1.5rem;
    }
    
    ::ng-deep .post-content ul {
      margin-bottom: 2rem;
      padding-left: 1.5rem;
    }
    
    ::ng-deep .post-content li {
      margin-bottom: 0.75rem;
    }

    ::ng-deep .post-content strong {
      color: var(--color-on-surface);
      font-weight: 600;
    }
  `]
})
export class InsiderGuidePostComponent implements OnInit {
  post: GuidePost | undefined;
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && GUIDE_POSTS[id]) {
        this.post = GUIDE_POSTS[id];
        
        this.seoService.updateSeo({
          title: `${this.post.title} | Insider Guide`,
          description: this.post.description,
          keywords: this.post.keywords,
          image: this.post.image,
          type: 'article'
        });

        // Inject Article JSON-LD
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": this.post.title,
          "image": [this.post.image],
          "datePublished": this.post.date,
          "author": [{
              "@type": "Organization",
              "name": this.post.author
          }]
        };
        this.seoService.injectStructuredData(articleSchema);

      } else {
        this.router.navigate(['/insider-guide']);
      }
    });
  }
}
