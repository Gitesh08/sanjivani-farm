import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { SplashStateService } from '../../../core/services/splash-state.service';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="splash-wrapper" #splashWrap *ngIf="showSplash">
      <div class="splash-content">
        <img #splashLogo src="/assets/images/farm-logo.svg" alt="Sanjivani Farm Logo" class="splash-logo">
      </div>
    </div>
  `,
  styles: [`
    .splash-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--color-surface, #F9FDF5); /* Fallback to a light organic color if var missing */
      z-index: 999999;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .splash-content {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .splash-logo {
      width: 250px;
      max-width: 80vw;
      height: auto;
      opacity: 0;
      visibility: hidden;
      filter: drop-shadow(0 10px 15px rgba(0,0,0,0.05));
    }
  `]
})
export class SplashScreenComponent implements OnInit, AfterViewInit {
  @ViewChild('splashWrap') splashWrap!: ElementRef<HTMLDivElement>;
  @ViewChild('splashLogo') splashLogo!: ElementRef<HTMLImageElement>;
  
  showSplash = true;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private cdr: ChangeDetectorRef,
    private splashState: SplashStateService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // We only execute the animation in the browser.
    // If it's SSR, we just render it so the initial HTML has the loader natively.
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // Use a small timeout to let the browser paint the initial frame
    setTimeout(() => {
      this.playIntro();
    }, 100);
  }

  private playIntro() {
    const wrap = this.splashWrap?.nativeElement;
    const logo = this.splashLogo?.nativeElement;
    
    if (!wrap || !logo) return;

    // Create a GSAP timeline for a cinematic Intro
    const tl = gsap.timeline({
      onComplete: () => {
        this.showSplash = false;
        this.cdr.detectChanges(); // update view to remove wrapper
        
        // Emit that splash is done so other components (like video popups) can trigger
        this.splashState.splashComplete$.next(true);

        // Ensure body is scrollable in case we locked it
        document.body.style.overflow = '';
      }
    });

    // Lock scroll during intro
    document.body.style.overflow = 'hidden';

    tl
      // Phase 1: Logo fades in and scales slightly
      .set(logo, { autoAlpha: 0, scale: 0.85 })
      .to(logo, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out'
      })
      // Hold for a moment to let the user admire the logo
      .to({}, { duration: 0.6 })
      // Phase 2: Fade logo down gently
      .to(logo, {
        autoAlpha: 0,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.inOut'
      })
      // Phase 3: The whole splash screen slides up to reveal the site 
      // (a smooth, premium curtain-lift effect)
      .to(wrap, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut'
      }, "-=0.2");
  }
}
