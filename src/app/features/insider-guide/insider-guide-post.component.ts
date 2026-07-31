import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { GUIDE_POSTS, GuidePost } from '../../core/data/insider-guide.data';

import { NavbarComponent } from '../home/components/navbar/navbar';
import { FooterComponent } from '../home/components/footer/footer';

@Component({
  selector: 'app-insider-guide-post',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar [forceScrolled]="true" />
    <main id="main-content" class="guide-post" *ngIf="post">
      <article class="post-article">
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
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; background: var(--color-bg-base); color: var(--color-text-primary); }
    #main-content { outline: none; padding-top: clamp(6rem, 12vw, 8rem); padding-bottom: 4rem; }
    
    .post-article {
      max-width: 800px;
      margin: 0 auto;
      padding-inline: var(--container-padding);
    }

    .post-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .post-meta {
      font-family: var(--font-sans);
      font-size: 0.9rem;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
      display: block;
    }

    .post-title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.1;
      margin-bottom: 1rem;
    }

    .post-desc {
      font-family: var(--font-sans);
      font-size: 1.125rem;
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .post-image {
      width: 100%;
      border-radius: 1rem;
      overflow: hidden;
      margin-bottom: 3rem;
    }

    .post-image img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* Content Typography */
    .post-content {
      font-family: var(--font-sans);
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--color-text-secondary);
    }

    ::ng-deep .post-content h2 {
      font-family: var(--font-serif);
      font-size: 1.75rem;
      color: var(--color-text-primary);
      margin-top: 2.5rem;
      margin-bottom: 1rem;
    }

    ::ng-deep .post-content p {
      margin-bottom: 1.5rem;
    }

    ::ng-deep .post-content strong {
      color: var(--color-text-primary);
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
