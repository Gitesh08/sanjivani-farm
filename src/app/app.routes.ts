import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.HomeComponent),
    title: 'Sanjivani Farms – Where Nature Gives You Life Again',
  },
  {
    path: 'our-story',
    loadComponent: () =>
      import('./features/our-story/our-story').then(m => m.OurStoryComponent),
    title: 'Our Story – Sanjivani Farms',
  },

  {
    path: 'activities',
    loadComponent: () =>
      import('./features/activities/activities').then(m => m.ActivitiesPageComponent),
    title: 'Activities & Adventures – Sanjivani Farms',
  },
  // {
  //   path: 'experiences',
  //   loadComponent: () =>
  //     import('./features/experiences/experiences').then(m => m.ExperiencesComponent),
  //   title: 'Experiences – Sanjivani Farms',
  // },

  {
    path: 'gallery',
    loadComponent: () =>
      import('./features/gallery/gallery').then(m => m.GalleryComponent),
    title: 'Gallery – Sanjivani Farms',
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./features/events/events').then(m => m.EventsPageComponent),
    title: 'Events – Sanjivani Farms',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
