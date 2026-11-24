import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ElementRef, ChangeDetectionStrategy,
  PLATFORM_ID, inject, signal, ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MediaService } from '../../core/services/media.service';
import { SeoService } from '../../core/services/seo.service';
import { VideoPlayerComponent } from '../../shared/components/video-player/video-player.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-our-story',
  imports: [RouterLink, VideoPlayerComponent, BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-story.html',
  styleUrl: './our-story.css',
  host: { ngSkipHydration: 'true' },
})
export class OurStoryComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  public media = inject(MediaService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.injectBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Our Story', url: '/our-story' }
    ]);

    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://sanjivanifarm.com/our-story#about",
      "url": "https://sanjivanifarm.com/our-story",
      "name": "The Story of Sanjivani Farm & Resort",
      "description": "The heritage, organic farming philosophy, and 16-acre sanctuary with 300+ coconut trees in Palghar, Maharashtra.",
      "mainEntity": {
        "@id": "https://sanjivanifarm.com/#resort"
      }
    };
    this.seoService.injectStructuredData(aboutSchema);
  }

  @ViewChild('section1Video') videoRef?: VideoPlayerComponent;
  private counterTweens: gsap.core.Tween[] = [];

  readonly storyHls = signal<string>(this.media.masterPlaylist('drone-shot_03'));
  readonly storyMp4 = signal<string>(this.media.fallbackMp4('drone-shot_03') + '#t=0.001');
  readonly storyPoster = signal<string>(this.media.poster('drone-shot_03'));
  readonly isPlaying = signal<boolean>(false);

  toggleVideoPlay(): void {
    if (this.videoRef) {
      if (this.isPlaying()) {
        this.isPlaying.set(false);
        this.videoRef.pause();
      } else {
        this.isPlaying.set(true);
        const p = this.videoRef.play();
        if (p) p.catch(() => this.isPlaying.set(false));
      }
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Register GSAP plugins inside browser context only
    gsap.registerPlugin(ScrollTrigger);

    this.initHeroAnimations();
    this.initScrollReveal();
    this.initParallaxImages();
    this.initCtaParallax();
    this.initValueCards();
    this.initCounters();
  }

  ngOnDestroy(): void {
    this.counterTweens.forEach(t => t.kill());
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  // ─────────────────────────────────────────────
  // STATS COUNTERS
  // ─────────────────────────────────────────────
  private initCounters(): void {
    const statsEl = this.el.nativeElement.querySelector('.os-section__stats');
    const counters = this.el.nativeElement.querySelectorAll('.os-stat__counter');
    const items = this.el.nativeElement.querySelectorAll('.os-stat');

    if (!statsEl || !counters.length) return;

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    counters.forEach((c: HTMLElement) => {
      c.textContent = '0';
    });

    let hasCountedInView = false;
    let isAnimating = false;

    const startCounters = () => {
      if (isAnimating) return;
      isAnimating = true;

      this.counterTweens.forEach(t => t.kill());
      this.counterTweens = [];

      if (items.length) {
        gsap.fromTo(
          items,
          { y: 14, opacity: 0.6 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      }

      counters.forEach((counterEl: HTMLElement, index: number) => {
        const target = parseFloat(counterEl.dataset['target'] || '0');
        const countObj = { val: 0 };
        counterEl.textContent = '0';

        const tween = gsap.to(countObj, {
          val: target,
          duration: 1.7,
          delay: index * 0.08,
          ease: 'power2.out',
          onUpdate: () => {
            counterEl.textContent = Math.round(countObj.val).toString();
          },
          onComplete: () => {
            counterEl.textContent = target.toString();
            gsap.fromTo(
              counterEl,
              { scale: 1 },
              { scale: 1.1, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.inOut' }
            );

            if (index === counters.length - 1) {
              isAnimating = false;
            }
          }
        });

        this.counterTweens.push(tween);
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: statsEl,
      start: 'top 88%',
      end: 'bottom 10%',
      onEnter: () => {
        if (!hasCountedInView) {
          hasCountedInView = true;
          startCounters();
        }
      },
      onEnterBack: () => {
        if (!hasCountedInView) {
          hasCountedInView = true;
          startCounters();
        }
      },
      onLeave: () => {
        hasCountedInView = false;
        this.counterTweens.forEach(t => t.kill());
        isAnimating = false;
        counters.forEach((c: HTMLElement) => (c.textContent = '0'));
      },
      onLeaveBack: () => {
        hasCountedInView = false;
        this.counterTweens.forEach(t => t.kill());
        isAnimating = false;
        counters.forEach((c: HTMLElement) => (c.textContent = '0'));
      }
    });

    if (trigger.progress > 0 && trigger.progress < 1) {
      hasCountedInView = true;
      startCounters();
    }
  }

  // ─────────────────────────────────────────────
  // CTA PARALLAX
  // ─────────────────────────────────────────────
  private initCtaParallax(): void {
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
  // HERO — cinematic entrance on page load
  // ─────────────────────────────────────────────
  private initHeroAnimations(): void {
    const tl = gsap.timeline({ delay: 0.2 });

    // Set initial state for top breadcrumb bar (will slide in smoothly)
    gsap.set('.os-hero__top-bar', { y: -15, opacity: 0 });

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

    // Breadcrumb bar fades in
    tl.to('.os-hero__top-bar', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
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
    ) as NodeListOf<HTMLElement>;

    parallaxImgs.forEach((img: HTMLElement) => {
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