import { Component, signal, computed, ChangeDetectionStrategy, input, OnInit, OnDestroy, PLATFORM_ID, inject, NgZone, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription, filter } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { TourService } from '../../../../core/services/tour.service';

interface NavItem {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  host: {
    '[class.navbar-open]': 'menuOpen()',
  },
  imports: [RouterLink, RouterLinkActive, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  /** True once user scrolls past 60px */
  private _scrolled = signal(false);
  /** If true, always show the glass style regardless of scroll position */
  readonly forceScrolled = input(false);
  /** Combine both: scrolled OR forced */
  readonly isScrolled = computed(() => this._scrolled() || this.forceScrolled());
  /** Mobile hamburger state */
  readonly menuOpen   = signal(false);
  /** Active Section Tracking */
  readonly activeSection = signal<string>('');

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private el = inject(ElementRef);
  private router = inject(Router);
  private tourService = inject(TourService);
  private scrollSub?: Subscription;
  private routerSub?: Subscription;

  openTour(): void {
    this.closeAll();
    this.tourService.openTour();
  }

  readonly navItems: NavItem[] = [
    { label: 'Our Story',  route: '/our-story' },
    { label: 'Cottages',   route: '/cottages' },
    { label: 'Activities', route: '/activities' },
    { label: 'Gallery',    route: '/gallery' },
    { label: 'Visit Us',   route: '/', fragment: 'visit-us' },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check initial position immediately
      this.checkScrollPosition();

      // Update on route changes to ensure logo state resets when navigating back to top and menu closes
      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.closeAll();
        setTimeout(() => this.checkScrollPosition(), 50);
      });

      // Throttle scroll events outside Angular zone to prevent layout thrashing
      this.ngZone.runOutsideAngular(() => {
        this.scrollSub = fromEvent(window, 'scroll')
          .pipe(throttleTime(50, undefined, { leading: true, trailing: true }))
          .subscribe(() => {
            this.checkScrollPosition();
          });
      });
    }
  }

  ngOnDestroy(): void {
    this.scrollSub?.unsubscribe();
    this.routerSub?.unsubscribe();
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }

  private checkScrollPosition(): void {
    const y = window.scrollY;

    let isScrolled = false;
    let progress = 0;
    const ourStoryEl = document.getElementById('our-story');
    if (ourStoryEl) {
      const rect = ourStoryEl.getBoundingClientRect();
      isScrolled = rect.top <= 100;
      const totalDist = ourStoryEl.offsetTop - 100;
      progress = totalDist > 0 ? Math.min(1, Math.max(0, y / totalDist)) : (isScrolled ? 1 : 0);
    } else {
      isScrolled = y > 60;
      progress = Math.min(1, Math.max(0, y / 160));
    }

    if (this.el?.nativeElement) {
      this.el.nativeElement.style.setProperty('--scroll-progress', progress.toFixed(3));
    }
    
    // Only trigger change detection if the value actually changes
    if (this._scrolled() !== isScrolled) {
      this.ngZone.run(() => this._scrolled.set(isScrolled));
    }

    // ScrollSpy Logic for homepage fragments
    const sections = this.navItems.filter(i => i.fragment).map(i => i.fragment!);
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && y >= (el.offsetTop - 150)) {
        current = id;
      }
    }
    if (this.activeSection() !== current) {
      this.ngZone.run(() => this.activeSection.set(current));
    }
  }



  toggleMenu(): void {
    this.menuOpen.update(v => !v);
    this._updateBodyScroll();
  }


  closeAll(): void {
    this.menuOpen.set(false);
    this._updateBodyScroll();
  }

  private _updateBodyScroll(): void {
    if (typeof document !== 'undefined') {
      const open = this.menuOpen();
      document.documentElement.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open);
      if (open) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    }
  }
}
