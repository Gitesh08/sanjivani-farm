import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashScreenComponent],
  template: `
    <app-splash-screen />
    <router-outlet />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
  `]
})
export class App implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);

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
      }
    });
  }
}
