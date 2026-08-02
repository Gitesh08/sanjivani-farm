import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent }        from './components/navbar/navbar';
import { HeroComponent }          from './components/hero/hero';
import { OurStoryComponent }      from './components/our-story/our-story';
import { NatureFeaturesComponent } from './components/nature-features/nature-features';
import { ActivitiesComponent }     from './components/activities/activities';
import { DiningComponent }         from './components/dining/dining';
import { AmenitiesComponent }      from './components/amenities/amenities';
import { FooterComponent }        from './components/footer/footer';

import { CottagesComponent }       from './components/cottages/cottages';

// New Components
import { GalleryPreviewComponent } from './components/gallery-preview/gallery-preview';
import { ReviewsComponent }        from './components/reviews/reviews';
import { SightseeingComponent }    from './components/sightseeing/sightseeing';
import { FaqComponent }            from './components/faq/faq';
import { VisitUsComponent }        from './components/visit-us/visit-us';
import { EventsComponent }         from './components/events/events';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HeroComponent,
    OurStoryComponent,
    NatureFeaturesComponent,
    CottagesComponent,
    ActivitiesComponent,
    DiningComponent,
    AmenitiesComponent,
    EventsComponent,
    GalleryPreviewComponent,
    ReviewsComponent,
    SightseeingComponent,
    FaqComponent,
    VisitUsComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main id="main-content">
      <app-hero />
      <app-our-story />
      <app-nature-features />
      <app-cottages />
      <app-activities />
      <app-dining />
      <app-amenities />
      <app-home-events />
      <app-gallery-preview />
      <app-reviews />
      <app-sightseeing />
      <app-faq />
      <app-visit-us />
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    #main-content { outline: none; }
  `],
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Resort", "LocalBusiness"],
          "name": "Sanjivani Farm & Resort",
          "image": "https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776530402/image_ucfeks.png",
          "telephone": "+918108446040",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vartak Nagar, Vivalvedhe, Saphale",
            "addressLocality": "Palghar",
            "postalCode": "401102",
            "addressCountry": "IN",
            "addressRegion": "Maharashtra"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.5833,
            "longitude": 72.8167
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Private Toy Train", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Kayaking & Boating", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "16 Acres Nature", "value": true }
          ],
          "sameAs": ["https://www.instagram.com/sanjivani.farms/?hl=en"]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What makes Sanjivani Farm different from other resorts in Palghar or Lonavala?",
              "acceptedAnswer": { "@type": "Answer", "text": "Sanjivani Farm is a 16-acre authentic Konkan agritourism experience. We are uniquely known for our private Sanjivani Toy Train, kayaking on private lakes, and over 700 lush coconut trees." }
            },
            {
              "@type": "Question",
              "name": "How far is the farm from Mumbai, Vasai, or Saphale?",
              "acceptedAnswer": { "@type": "Answer", "text": "Located in Saphale (Palghar District), we are just a 1-hour drive from the Vasai-Virar belt, and about 1.5 to 2 hours from central Mumbai. Kelve Beach is 15 km away." }
            }
          ]
        }
      ]
    };

    this.seoService.injectStructuredData(schema);
  }
}
