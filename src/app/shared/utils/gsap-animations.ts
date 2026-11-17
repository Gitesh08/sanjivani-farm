import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Defensive guard to ensure elements exist in DOM before passing to GSAP,
 * preventing noisy "GSAP target not found" warnings in the console.
 */
function hasValidElements(targets: any): boolean {
  if (!targets) return false;
  if (typeof document === 'undefined') return false;
  if (typeof targets === 'string') {
    try {
      return document.querySelectorAll(targets).length > 0;
    } catch {
      return false;
    }
  }
  if (targets instanceof Element) return true;
  if ('length' in targets && targets.length === 0) return false;
  return true;
}

/**
 * Fade up with stagger — for title + subtitle + CTA groups
 */
export function animateFadeUp(
  targets: string | Element | Element[],
  options: { delay?: number; stagger?: number; duration?: number } = {}
): gsap.core.Tween | undefined {
  if (!hasValidElements(targets)) return undefined;
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 1.0,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0.15,
      ease: 'power3.out',
    }
  );
}

/**
 * Fade in from left — for "Our Story" image
 */
export function animateFadeLeft(
  target: string | Element,
  trigger: string | Element,
  delay = 0
): ScrollTrigger | undefined {
  if (!hasValidElements(target)) return undefined;
  gsap.fromTo(
    target,
    { opacity: 0, x: -80 },
    {
      opacity: 1,
      x: 0,
      duration: 1.1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        once: true,
      },
    }
  );
  return ScrollTrigger.getById('fade-left') as ScrollTrigger;
}

/**
 * Fade in from right — for "Our Story" text
 */
export function animateFadeRight(
  target: string | Element,
  trigger: string | Element,
  delay = 0
): void {
  if (!hasValidElements(target)) return;
  gsap.fromTo(
    target,
    { opacity: 0, x: 80 },
    {
      opacity: 1,
      x: 0,
      duration: 1.1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        once: true,
      },
    }
  );
}

/**
 * Scroll reveal for cards — staggered
 */
export function animateScrollReveal(
  targets: string | Element[] | NodeListOf<Element>,
  trigger: string | Element,
  stagger = 0.12
): void {
  if (!hasValidElements(targets)) return;
  gsap.fromTo(
    targets,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 82%',
        once: true,
      },
    }
  );
}

/**
 * Section title reveal — scale + fade
 */
export function animateSectionTitle(
  target: string | Element | NodeListOf<Element> | Element[],
  trigger: string | Element
): void {
  if (!hasValidElements(target)) return;
  gsap.fromTo(
    target,
    { opacity: 0, scale: 0.95, y: 30 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 85%',
        once: true,
      },
    }
  );
}

/**
 * Image parallax effect
 */
export function animateParallaxY(
  target: string | Element,
  trigger: string | Element,
  yAmount = 50
): void {
  if (!hasValidElements(target)) return;
  gsap.fromTo(
    target,
    { y: -yAmount },
    {
      y: yAmount,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
}
