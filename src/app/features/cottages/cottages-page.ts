import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../home/components/navbar/navbar';
import { CottagesComponent } from '../home/components/cottages/cottages';
import { FooterComponent } from '../home/components/footer/footer';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

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
export class CottagesPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Accommodation",
          "name": "Red Stone Cottages",
          "description": "Experience the Charm of a Rustic Farm Stay. Surrounded by greenery and the peaceful atmosphere of Sanjivani Farm & Resort. Ideal for Couples, Families, Friends, and Small Groups.",
          "numberOfRooms": 1,
          "occupancy": {
            "@type": "QuantitativeValue",
            "minValue": 6,
            "maxValue": 10
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Private attached bathroom", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Swimming pool access", "value": true }
          ],
          "url": "https://sanjivanifarmandresort.doorloom.com/p/redstomecottage07"
        },
        {
          "@type": "Accommodation",
          "name": "Family Dormitory Cottages",
          "description": "Stay Together. Designed for large families or a group of friends. Spacious sleeping arrangements and ample room for groups.",
          "numberOfRooms": 1,
          "occupancy": {
            "@type": "QuantitativeValue",
            "minValue": 10,
            "maxValue": 17
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "2 Bathrooms", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Spacious group accommodation", "value": true }
          ],
          "url": "https://sanjivanifarmandresort.doorloom.com/p/dormitorycottage10"
        },
        {
          "@type": "Accommodation",
          "name": "Wooden Glass Cottages",
          "description": "A Cozy Stay Surrounded by Nature. Wake up to the beauty of nature in our charming Wooden Glass Cottages with a unique blend of rustic charm and modern comfort.",
          "numberOfRooms": 1,
          "occupancy": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 7
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Private attached bathroom", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Comfortable double bed", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Bunk bed with two sleeping levels", "value": true }
          ]
        }
      ]
    };

    this.seoService.injectStructuredData(schema);
  }
}
