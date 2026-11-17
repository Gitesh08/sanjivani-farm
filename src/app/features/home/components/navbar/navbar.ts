import { Component, signal, computed, ChangeDetectionStrategy, input, OnInit, OnDestroy, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription, filter } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
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
  private router = inject(Router);
  private scrollSub?: Subscription;
  private routerSub?: Subscription;

  readonly navItems: NavItem[] = [
    { label: 'Our Story',  route: '/our-story' },
    { label: 'Cottages',   route: '/cottages' },
    { label: 'Activities', route: '/', fragment: 'activities' },
    { label: 'Gallery',    route: '/gallery' },
    { label: 'Visit Us',   route: '/', fragment: 'visit-us' },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check initial position immediately
      this.checkScrollPosition();

      // Update on route changes to ensure logo state resets when navigating back to top
      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
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
  }

  private checkScrollPosition(): void {
    const y = window.scrollY;
    const isScrolled = y > 40;
    
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
      if (this.menuOpen()) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    }
  }
}
