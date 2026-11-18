import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { OurStoryComponent } from './components/our-story/our-story';
import { NatureFeaturesComponent } from './components/nature-features/nature-features';
import { ActivitiesComponent } from './components/activities/activities';
import { DiningComponent } from './components/dining/dining';
import { AmenitiesComponent } from './components/amenities/amenities';
import { FooterComponent } from './components/footer/footer';

import { CottagesComponent } from './components/cottages/cottages';

// New Components
import { GalleryPreviewComponent } from './components/gallery-preview/gallery-preview';
import { ReviewsComponent } from './components/reviews/reviews';
import { SightseeingComponent } from './components/sightseeing/sightseeing';
import { FaqComponent } from './components/faq/faq';
import { VisitUsComponent } from './components/visit-us/visit-us';
import { EventsComponent } from './components/events/events';
import { SeoService } from '../../core/services/seo.service';
import rawSummary from '../../../assets/data/reviews-summary.json';

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
    const ratingValue = rawSummary?.rating || 4.4;
    const reviewCount = rawSummary?.userRatingsTotal || 503;

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://sanjivanifarm.com/#website",
          "url": "https://sanjivanifarm.com/",
          "name": "Sanjivani Farm & Resort",
          "alternateName": [
            "Sanjivani Farms",
            "Sanjivani Farm Palghar",
            "Sanjivani Farm Saphale",
            "Sanjivani Resort"
          ],
          "description": "16-acre authentic Konkan agro-tourism resort in Saphale, Palghar near Mumbai with private toy train, kayaking, and cottages.",
          "inLanguage": "en",
          "publisher": {
            "@id": "https://sanjivanifarm.com/#resort"
          }
        },
        {
          "@type": ["Resort", "LodgingBusiness", "TouristAttraction"],
          "@id": "https://sanjivanifarm.com/#resort",
          "name": "Sanjivani Farm & Resort",
          "alternateName": "Sanjivani Farms",
          "url": "https://sanjivanifarm.com/",
          "logo": "https://sanjivanifarm.com/assets/images/farm-logo.svg",
          "image": [
            "https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:good,w_1600/v1786185697/16-acre-farm_y2ikvq.webp"
          ],
          "telephone": "+918108446040",
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vartak Nagar, Vivalvedhe",
            "addressLocality": "Saphale, Palghar",
            "postalCode": "401102",
            "addressCountry": "IN",
            "addressRegion": "Maharashtra"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.5983845,
            "longitude": 72.7671736
          },
          "hasMap": "https://www.google.com/maps/place/Sanjivani+Farm+%26+Resort/@19.5983845,72.7671736,17z/data=!4m11!3m10!1s0x3be7039d2a6f5b01:0x89b4fe262a5bd81f!5m2!4m1!1i2!8m2!3d19.5983845!4d72.7671736!9m1!1b1!16s%2Fg%2F11rsdqvzq8",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": reviewCount,
            "bestRating": 5,
            "worstRating": 1
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Private Toy Train", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Kayaking & Boating on Lake", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "16 Acres Nature Farm", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Authentic Maharashtrian Dining", "value": true }
          ],
          "sameAs": [
            "https://www.instagram.com/sanjivani.farms/?hl=en",
            "https://www.google.com/maps/place/Sanjivani+Farm+%26+Resort/@19.5983845,72.7671736,17z/data=!4m11!3m10!1s0x3be7039d2a6f5b01:0x89b4fe262a5bd81f!5m2!4m1!1i2!8m2!3d19.5983845!4d72.7671736!9m1!1b1!16s%2Fg%2F11rsdqvzq8"
          ]
        },
        {
          "@type": "ItemList",
          "@id": "https://sanjivanifarm.com/#sitelinks",
          "name": "Sanjivani Farm & Resort Quick Links",
          "itemListElement": [
            {
              "@type": "SiteNavigationElement",
              "position": 1,
              "name": "Cottages & Stays",
              "description": "Explore Wooden Glass Cottages, Red Stone Cottages, and Dormitories amidst 16 acres of greenery.",
              "url": "https://sanjivanifarm.com/cottages"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 2,
              "name": "Book Your Stay",
              "description": "Check live cottage availability, seasonal rates, and book your stay directly on Doorloom.",
              "url": "https://sanjivanifarm.com/book"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 3,
              "name": "Our Story",
              "description": "Discover the heritage, 300+ coconut trees, and authentic Konkan agritourism philosophy.",
              "url": "https://sanjivanifarm.com/our-story"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 4,
              "name": "Photo Gallery",
              "description": "Browse 40+ photos of cottages, nature trails, private lakes, and scenic spots.",
              "url": "https://sanjivanifarm.com/gallery"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 5,
              "name": "Activities & Toy Train",
              "description": "Private Sanjivani Toy Train rides, kayaking, boating, archery, cycling & manicured lawns.",
              "url": "https://sanjivanifarm.com/activities"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 6,
              "name": "Insider Guide",
              "description": "Local travel tips for Kelve Beach, Palghar tourism, and weekend getaways from Mumbai.",
              "url": "https://sanjivanifarm.com/insider-guide"
            }
          ]
        }
      ]
    };

    this.seoService.injectStructuredData(schema, 'structured-data-main');
  }
}
