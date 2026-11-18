import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen';
import { TourModalComponent } from './shared/components/tour-modal/tour-modal.component';
import { WhatsappFabComponent } from './shared/components/whatsapp-fab/whatsapp-fab.component';
import { SeoService } from './core/services/seo.service';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashScreenComponent, TourModalComponent, WhatsappFabComponent],
  template: `
    <app-splash-screen />
    <router-outlet />
    <app-tour-modal />
    <app-whatsapp-fab />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
  `]
})
export class App implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private analytics = inject(AnalyticsService);

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      if (data['seo']) {
        const seoConfig = { ...data['seo'] };
        seoConfig.url = this.router.url;
        this.seoService.updateSeo(seoConfig);
        this.analytics.trackPageView(this.router.url, seoConfig.title);

        // Inject JSON-LD Schema
        const schema = {
          "@context": "https://schema.org",
          "@type": ["Resort", "LocalBusiness"],
          "name": seoConfig.title,
          "description": seoConfig.description,
          "url": `https://sanjivanifarm.com${this.router.url}`,
          "image": seoConfig.image || "https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:good,w_1200/v1786185697/16-acre-farm_y2ikvq.webp",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Palghar",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
          }
        };
        this.seoService.injectStructuredData(schema);
      } else {
        this.analytics.trackPageView(this.router.url);
      }
    });
  }
}
