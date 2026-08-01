import { Component } from '@angular/core';
import { NavbarComponent }    from '../home/components/navbar/navbar';
import { CottagesComponent }  from '../home/components/cottages/cottages';
import { FooterComponent }    from '../home/components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cottages-page',
  standalone: true,
  imports: [NavbarComponent, CottagesComponent, FooterComponent, RouterLink],
  template: `
    <app-navbar [forceScrolled]="true" />
    <main id="main-content" class="cottages-page__main">
      <div class="container back-btn-container">
        <a routerLink="/" class="btn btn-secondary btn-sm" aria-label="Back to Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 5 5 12 12 19"/>
          </svg>
          Back to Home
        </a>
      </div>
      <app-cottages />
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    #main-content {
      outline: none;
      padding-top: clamp(5rem, 10vw, 7rem);
      background-color: var(--color-surface);
      min-height: 100vh;
    }
    .back-btn-container {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
    }
  `],
})
export class CottagesPageComponent {}
