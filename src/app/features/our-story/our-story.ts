import {
  Component, OnDestroy, AfterViewInit,
  ElementRef, ChangeDetectionStrategy,
  PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


@Component({
  selector: 'app-our-story',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-story.html',
  styleUrl: './our-story.css',
  host: { ngSkipHydration: 'true' },
})
export class OurStoryComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Register GSAP plugins inside browser context only
    gsap.registerPlugin(ScrollTrigger);

    this.initHeroAnimations();
    this.initScrollReveal();
    this.initParallaxImages();
    this.initParallaxBreak();
    this.initValueCards();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  // ─────────────────────────────────────────────
  // HERO — cinematic entrance on page load
  // ─────────────────────────────────────────────
  private initHeroAnimations(): void {
    const tl = gsap.timeline({ delay: 0.2 });

    // Set initial state for back button (will slide in from left)
    gsap.set('.os-hero__back-btn', { x: -20, opacity: 0 });

    // Parallax slow-zoom on hero bg image
    const heroBg = this.el.nativeElement.querySelector('.os-hero__bg-img');
    if (heroBg) {
      gsap.fromTo(heroBg,
        { scale: 1.12 },
        { scale: 1, duration: 2.2, ease: 'power3.out' }
      );

      // Ongoing scroll parallax on hero
      gsap.to(heroBg, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.os-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Tag appears first
    tl.to('.os-hero__tag', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
    }, 0.4);

    // Back button fades in from left
    tl.to('.os-hero__back-btn', {
      opacity: 1, x: 0, duration: 0.7, ease: 'power3.out'
    }, 0.4);

    // Title sweeps up
    tl.to('.os-hero__title', {
      opacity: 1, y: 0, duration: 1.0, ease: 'power3.out'
    }, 0.65);

    // Lead paragraph
    tl.to('.os-hero__lead', {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out'
    }, 1.0);

    // Scroll hint — fade in only (absolute positioned)
    tl.to('.os-hero__scroll-hint', {
      opacity: 1, duration: 0.7, ease: 'power3.out'
    }, 1.35);
  }

  // ─────────────────────────────────────────────
  // SCROLL REVEAL — zig-zag sections
  // ─────────────────────────────────────────────
  private initScrollReveal(): void {
    const revealEls = this.el.nativeElement.querySelectorAll('[data-reveal]');

    revealEls.forEach((el: HTMLElement) => {
      const dir = el.getAttribute('data-reveal');
      const fromX = dir === 'left' ? -70 : dir === 'right' ? 70 : 0;
      const fromY = dir === 'up' ? 55 : 0;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
          });
        },
      });

      // Ensure initial state (CSS sets it, but GSAP needs to know)
      gsap.set(el, { x: fromX, y: fromY, opacity: 0 });
    });

    // Parallax break quote
    const quoteEl = this.el.nativeElement.querySelector('.os-parallax-break__quote');
    const attrEl  = this.el.nativeElement.querySelector('.os-parallax-break__attr');

    if (quoteEl) {
      ScrollTrigger.create({
        trigger: '.os-parallax-break',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to([quoteEl, attrEl], {
            opacity: 1, y: 0, duration: 1.0, stagger: 0.2, ease: 'power3.out',
          });
        },
      });
    }

    // CTA section content
    const ctaContent = this.el.nativeElement.querySelector('.os-cta-section__content');
    if (ctaContent) {
      ScrollTrigger.create({
        trigger: ctaContent,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(ctaContent, {
            opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          });
        },
      });
    }
  }

  // ─────────────────────────────────────────────
  // PARALLAX — zoom on scroll for each image
  // ─────────────────────────────────────────────
  private initParallaxImages(): void {
    const parallaxImgs = this.el.nativeElement.querySelectorAll(
      '.os-parallax-img__img'
    ) as NodeListOf<HTMLImageElement>;

    parallaxImgs.forEach((img: HTMLImageElement) => {
      const wrap = img.closest('.os-parallax-img__inner');
      if (!wrap) return;

      gsap.fromTo(img,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    });
  }

  // ─────────────────────────────────────────────
  // PARALLAX BREAK — full-width cinematic scroll
  // ─────────────────────────────────────────────
  private initParallaxBreak(): void {
    const breakImg = this.el.nativeElement.querySelector(
      '.os-parallax-break__img'
    ) as HTMLImageElement | null;
    if (!breakImg) return;

    gsap.fromTo(breakImg,
      { yPercent: -18 },
      {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.os-parallax-break',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
    );

    // CTA section bg parallax
    const ctaBg = this.el.nativeElement.querySelector(
      '.os-cta-section__bg'
    ) as HTMLImageElement | null;
    if (ctaBg) {
      gsap.fromTo(ctaBg,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.os-cta-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }
  }

  // ─────────────────────────────────────────────
  // VALUE CARDS — staggered entrance
  // ─────────────────────────────────────────────
  private initValueCards(): void {
    const cards = this.el.nativeElement.querySelectorAll('.os-value-card') as NodeListOf<HTMLElement>;

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: '.os-values__grid',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
      },
    });
  }
}