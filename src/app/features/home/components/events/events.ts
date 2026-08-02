import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  NgZone
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateSectionTitle } from '../../../../shared/utils/gsap-animations';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { filter, take, Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

interface EventType {
  iconId: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-home-events',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events.html',
  styleUrl: './events.css',
  standalone: true,
  host: { ngSkipHydration: 'true' },
})
export class EventsComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private splashState = inject(SplashStateService);
  private sub?: Subscription;
  private triggers: ScrollTrigger[] = [];
  private mobileObservers: IntersectionObserver[] = [];

  readonly images = [
    'https://res.cloudinary.com/dsepjvm2l/image/upload/v1785619538/wedding_mandap_decoration_z4qtm8.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/v1785651629/office-outing_lalith.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/v1785619538/birthday-party_lfvude.jpg'
  ];

  readonly eventTypes: EventType[] = [
    {
      iconId: 'wedding',
      title: 'Destination Weddings',
      desc: 'A beautiful place to celebrate your special day with the people you love.'
    },
    {
      iconId: 'corporate',
      title: 'Corporate Retreats',
      desc: 'A quiet space for your team to connect, relax, and spend time together.'
    },
    {
      iconId: 'party',
      title: 'Private Parties',
      desc: 'Celebrate your biggest milestones under the open sky.'
    }
  ];

  getImage(index: number): string {
    return this.images[index % this.images.length];
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;

    this.sub = this.splashState.splashComplete$
      .pipe(filter(complete => complete), take(1))
      .subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.initAnimations(host);
          }, 150);
        });
      });
  }

  private initAnimations(host: HTMLElement): void {
    // ── Header ──
    const header = host.querySelector('.events__header');
    if (header) {
      const headerEls = header.querySelectorAll('.section-tag, .events__title, .events__subtitle');
      if (headerEls.length) animateSectionTitle(headerEls, header);
    }

    // ── Sticky left panel (desktop / tablet) ──
    this.animateStickyPanel(host);

    // ── Desktop scroll cards ──
    // Always animate regardless of current viewport — CSS controls visibility.
    // This prevents cards being stuck at opacity:0 when the page loads at desktop
    // width but the user is on a device-emulated or resized mobile view.
    this.animateScrollCards(host);

    // ── Mobile stacked cards ──
    // Same reasoning — always set up the trigger so they animate whenever visible.
    this.animateMobileCards(host);

    ScrollTrigger.refresh();
  }

  private animateStickyPanel(host: HTMLElement): void {
    const stickyInner = host.querySelector('.events__sticky-inner');
    if (!stickyInner) return;

    const els = stickyInner.querySelectorAll(
      '.events__label--sticky, .events__title--sticky, .events__sub--sticky, .events__cta'
    );

    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stickyInner,
          start: 'top 80%',
          once: true,
        }
      }
    );
  }

  private animateScrollCards(host: HTMLElement): void {
    const cards = host.querySelectorAll<HTMLElement>('.events__scroll-card');
    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 70, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          }
        }
      );
      if (tween.scrollTrigger) this.triggers.push(tween.scrollTrigger);
    });
  }

  private animateMobileCards(host: HTMLElement): void {
    const cards = Array.from(host.querySelectorAll<HTMLElement>('.events__mobile-card'));
    const cta = host.querySelector<HTMLElement>('.events__mobile-cta');
    if (!cards.length) return;

    // IntersectionObserver — reliable on ALL mobile browsers including iOS Safari.
    // Unlike GSAP ScrollTrigger, it is not affected by:
    //   - iOS momentum scrolling events firing late
    //   - overflow-x: clip on html/body creating a different scroll root
    //   - window.innerWidth being read at the wrong time
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('in-view');
            // Unobserve after trigger — each card animates once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Fire when 15% of the card is visible — generous enough for small screens
        threshold: 0.15,
        // No rootMargin offset — fires exactly when card enters viewport
        rootMargin: '0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    // Also handle CTA with a slight delay after last card
    if (cta) {
      const ctaObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'translateY(0)';
              ctaObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      // Set initial hidden state via inline style
      cta.style.cssText = 'opacity:0; transform:translateY(24px); transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s;';
      ctaObserver.observe(cta);
      this.mobileObservers.push(ctaObserver);
    }

    this.mobileObservers.push(observer);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    // Kill GSAP scroll triggers
    this.triggers.forEach(t => t.kill());
    this.triggers = [];
    // Disconnect all IntersectionObservers
    this.mobileObservers.forEach(o => o.disconnect());
    this.mobileObservers = [];
  }
}
