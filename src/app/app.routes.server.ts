import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Dynamic route: slug not known at build time
    path: 'insider-guide/:id',
    renderMode: RenderMode.Client
  },
  {
    // Dynamic route: location params not known at build time
    path: ':intent-near/:location',
    renderMode: RenderMode.Client
  },
  {
    // All other routes: pre-render at build time for best SEO & performance
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
