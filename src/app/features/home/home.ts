import { Component } from '@angular/core';
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
import { VisitUsComponent }        from './components/visit-us/visit-us';
import { EventsComponent }         from './components/events/events';
import { PromoPopupComponent }     from './components/promo-popup/promo-popup';

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
    VisitUsComponent,
    FooterComponent,
    PromoPopupComponent,
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
      <app-visit-us />
    </main>
    <app-footer />
    <app-promo-popup />
  `,
  styles: [`
    :host { display: block; }
    #main-content { outline: none; }
  `],
})
export class HomeComponent {}
