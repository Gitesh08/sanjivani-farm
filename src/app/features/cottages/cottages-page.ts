import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../home/components/navbar/navbar';
import { CottagesComponent } from '../home/components/cottages/cottages';
import { FooterComponent } from '../home/components/footer/footer';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-cottages-page',
  standalone: true,
  imports: [NavbarComponent, CottagesComponent, FooterComponent, BreadcrumbComponent],
  template: `
    <app-navbar [forceScrolled]="true" />
    <main id="main-content" class="cottages-page__main">
      <div class="container breadcrumb-container">
        <app-breadcrumb [items]="[{ label: 'Home', url: '/' }, { label: 'Cottages & Stays' }]" />
        <h1 class="visually-hidden">Luxury Nature Cottages & Agro-Tourism Stays in Palghar | Sanjivani Farm</h1>
      </div>
      <app-cottages />
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    #main-content {
      outline: none;
      padding-top: clamp(5rem, 10vw, 6.5rem);
      background-color: var(--color-surface);
      min-height: 100vh;
    }
    .breadcrumb-container {
      padding-top: var(--space-6);
      padding-bottom: var(--space-2);
    }
  `],
})
export class CottagesPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.injectBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Cottages & Stays', url: '/cottages' }
    ]);

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
          ],
          "url": "https://sanjivanifarmandresort.doorloom.com/p/woodenglasscottage01"
        }
      ]
    };

    this.seoService.injectStructuredData(schema);
  }
}
