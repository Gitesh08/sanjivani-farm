import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.HomeComponent),
    title: 'Sanjivani Farms | Where Nature Gives You Life Again',
    data: {
      seo: {
        title: 'Sanjivani Farms | Where Nature Gives You Life Again',
        description: 'Experience pure Konkan bliss at Sanjivani Farms. 16 acres of lush greenery, Toy Train, private boating & kayaking. The perfect weekend getaway near Vasai-Virar and Palghar.',
        keywords: 'Sanjivani Farm & Resort, Palghar farm stay, weekend getaway vasai virar, resort near saphale, kelve beach resort, luxury farm stay'
      }
    }
  },
  {
    path: 'our-story',
    loadComponent: () =>
      import('./features/our-story/our-story').then(m => m.OurStoryComponent),
    title: 'Our Story | Sanjivani Farms',
    data: {
      seo: {
        title: 'Our Story | Sanjivani Farms',
        description: 'Learn about the history of Sanjivani Farm. Our mission is to provide a pure Konkan agritourism experience with 700+ coconut trees and authentic Maharashtrian culture.',
        keywords: 'Sanjivani farm story, Konkan agritourism, organic farm stay Maharashtra'
      }
    }
  },

  {
    path: 'activities',
    loadComponent: () =>
      import('./features/activities/activities').then(m => m.ActivitiesPageComponent),
    title: 'Activities & Adventures | Sanjivani Farms',
    data: {
      seo: {
        title: 'Activities & Adventures | Sanjivani Farms',
        description: 'Discover activities at Sanjivani Farm. Enjoy our exclusive Toy Train, Kayaking on private lakes, free cycling, and a true digital detox near Saphale.',
        keywords: 'activities in palghar, things to do in saphale, resort with toy train, kayaking near mumbai'
      }
    }
  },
  // {
  //   path: 'experiences',
  //   loadComponent: () =>
  //     import('./features/experiences/experiences').then(m => m.ExperiencesComponent),
  //   title: 'Experiences – Sanjivani Farms',
  // },
  {
    path: 'cottages',
    loadComponent: () =>
      import('./features/cottages/cottages-page').then(m => m.CottagesPageComponent),
    title: 'Cottages & Stays | Sanjivani Farms',
    data: {
      seo: {
        title: 'Cottages & Stays | Sanjivani Farms',
        description: 'Explore our beautiful cottages. Wooden Glass Cottage, Red Stone Cottage, and Dormitories built for a perfect nature escape.',
        keywords: 'cottages palghar, resort stay near mumbai, wooden glass cottage, luxury stays in nature'
      }
    }
  },

  {
    path: 'gallery',
    loadComponent: () =>
      import('./features/gallery/gallery').then(m => m.GalleryComponent),
    title: 'Gallery | Sanjivani Farms',
    data: {
      seo: {
        title: 'Gallery | Sanjivani Farms',
        description: 'Explore the scenic beauty of Sanjivani Farm. View our luxury cottages, lush green lawns, wooden bridge, and serene private lakes.',
        keywords: 'Sanjivani farm photos, luxury cottages palghar gallery, nature resort images'
      }
    }
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./features/events/events').then(m => m.EventsPageComponent),
    title: 'Events | Sanjivani Farms',
    data: {
      seo: {
        title: 'Events & Corporate Outings | Sanjivani Farms',
        description: 'Host your corporate outing, day picnic, or family event at Sanjivani Farm. Spacious lawns, amazing food, and complete privacy near Vasai-Virar.',
        keywords: 'corporate outing near vasai, day picnic palghar, event venue near saphale'
      }
    }
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/privacy-policy/privacy-policy').then(m => m.PrivacyPolicyComponent),
    title: 'Privacy Policy | Sanjivani Farms',
    data: {
      seo: {
        title: 'Privacy Policy | Sanjivani Farms',
        description: 'Read the Privacy Policy of Sanjivani Farm & Resort to understand how we collect, use, and protect your data.',
        keywords: 'privacy policy sanjivani farm, data protection, privacy'
      }
    }
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./features/terms-conditions/terms-conditions').then(m => m.TermsConditionsComponent),
    title: 'Terms & Conditions | Sanjivani Farms',
    data: {
      seo: {
        title: 'Terms & Conditions | Sanjivani Farms',
        description: 'Read the Terms & Conditions of Sanjivani Farm & Resort to understand the rules and guidelines for a pleasant stay.',
        keywords: 'terms and conditions sanjivani farm, resort rules, policies'
      }
    }
  },
  {
    path: 'insider-guide',
    loadComponent: () =>
      import('./features/insider-guide/insider-guide-list.component').then(m => m.InsiderGuideListComponent),
  },
  {
    path: 'insider-guide/:id',
    loadComponent: () =>
      import('./features/insider-guide/insider-guide-post.component').then(m => m.InsiderGuidePostComponent),
  },
  {
    path: ':intent-near/:location',
    loadComponent: () =>
      import('./features/locations/location-landing').then(m => m.LocationLandingComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
