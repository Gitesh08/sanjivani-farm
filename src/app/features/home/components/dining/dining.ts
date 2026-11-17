import {
  Component, ChangeDetectionStrategy, ElementRef, inject,
  AfterViewInit, OnDestroy, PLATFORM_ID, signal, NgZone
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  animateSectionTitle,
  animateScrollReveal,
} from '../../../../shared/utils/gsap-animations';

gsap.registerPlugin(ScrollTrigger);

interface DiningHighlight {
  icon: string;
  label: string;
  description: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-dining',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dining.html',
  styleUrl: './dining.css',
  standalone: true,
  imports: [CommonModule],
  host: { ngSkipHydration: 'true' },
})
export class DiningComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  // Tracks which highlight card is expanded on mobile (-1 = none)
  expandedIndex = signal<number>(-1);

  /** The Cloudinary images for the auto-slider */
  readonly sliderImages = [
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:best,w_1400/v1794840874/IMG_6106_lks3dx.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:best,w_1400/v1794840874/IMG_6103_k2lx1q.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:best,w_1400/v1794840874/IMG_6104_kmprao.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:best,w_1400/v1794840873/IMG_6102_z39svq.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:best,w_1400/v1794840874/IMG_6105_rc6xht.webp',
  ];

  /** Currently active slide index */
  readonly activeSlide = signal<number>(0);

  private autoPlayTimer?: ReturnType<typeof setInterval>;
  private touchStartX = 0;
  private touchStartY = 0;

  readonly highlights: DiningHighlight[] = [
    {
      icon: '🌿',
      label: 'Pure Vegetarian',
      description: 'Farm-fresh organic ingredients, Maharashtrian thalis & Jain options on request.',
      ariaLabel: 'Pure vegetarian meals',
    },
    {
      icon: '🍗',
      label: 'Non-Veg Available',
      description: 'Hearty non-vegetarian dishes crafted with the same farm-fresh care.',
      ariaLabel: 'Non-vegetarian meals',
    },
    {
      icon: '🐟',
      label: 'Fresh Fish on Order',
      description: 'Fresh local fish, cooked just the way you like it.',
      ariaLabel: 'Fresh fish on order',
    },
    {
      icon: '🥘',
      label: 'Tandoor Specials',
      description: 'Enjoy hot breads and delicious tikkas straight from our clay oven.',
      ariaLabel: 'Tandoor specials',
    },
    {
      icon: '🍱',
      label: 'Unlimited Buffet Vibes',
      description: 'Breakfast, lunch, high tea & dinner all included. Eat until you are happy.',
      ariaLabel: 'Unlimited buffet',
    },
    {
      icon: '🍓',
      label: 'Farm Fruits',
      description: 'Welcome drinks feature fresh fruits picked straight from our own trees.',
      ariaLabel: 'Fresh fruits from farm',
    },
  ];

  toggleExpand(index: number): void {
    this.expandedIndex.update(current => current === index ? -1 : index);
  }

  goToSlide(index: number): void {
    this.activeSlide.set(index);
    // Reset timer on manual navigation
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  onTouchStart(e: TouchEvent): void {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  }

  onTouchEnd(e: TouchEvent): void {
    if (e.changedTouches.length === 1) {
      const diffX = e.changedTouches[0].clientX - this.touchStartX;
      const diffY = e.changedTouches[0].clientY - this.touchStartY;

      // Only respond when horizontal swipe is intentional and exceeds 35px
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX < 0) {
          // Swipe left -> next slide
          this.goToSlide((this.activeSlide() + 1) % this.sliderImages.length);
        } else {
          // Swipe right -> previous slide
          const total = this.sliderImages.length;
          this.goToSlide((this.activeSlide() - 1 + total) % total);
        }
      }
    }
  }

  private startAutoPlay(): void {
    this.ngZone.runOutsideAngular(() => {
      this.autoPlayTimer = setInterval(() => {
        this.activeSlide.update(i => (i + 1) % this.sliderImages.length);
      }, 6000);
    });
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;

    // Start auto-play slider
    this.startAutoPlay();

    const inner = host.querySelector('.dining__inner');
    const titles = host.querySelectorAll('.dining__label, .dining__title, .dining__subtitle');
    if (inner && titles.length) {
      animateSectionTitle(titles, inner);
    }

    const imgWrap = host.querySelector('.dining__image-wrap');
    if (imgWrap) {
      // Entrance animation
      gsap.fromTo(
        imgWrap,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imgWrap,
            start: 'top 82%',
            once: true,
          },
        },
      );

      // Scroll parallax zoom on the image stack
      const imgs = imgWrap.querySelectorAll('.dining__image') as NodeListOf<HTMLElement>;
      imgs.forEach((img: HTMLElement) => {
        gsap.fromTo(
          img,
          { scale: 1.25, yPercent: -5 },
          {
            scale: 1.1,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: imgWrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        );
      });
    }

    const cards = host.querySelectorAll('.dining__highlight-card');
    if (cards.length) {
      animateScrollReveal(Array.from(cards), host, 0.08);
    }

    const quote = host.querySelector('.dining__quote');
    if (quote) {
      gsap.fromTo(
        quote,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 88%',
            once: true,
          },
        },
      );
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }
}
