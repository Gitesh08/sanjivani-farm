import { Component, signal, computed, HostListener, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

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
export class NavbarComponent {
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

  readonly navItems: NavItem[] = [
    { label: 'Our Story',  route: '/our-story' },
    { label: 'Cottages',   route: '/cottages' },
    { label: 'Activities', route: '/', fragment: 'activities' },
    { label: 'Gallery',    route: '/gallery' },
    { label: 'Visit Us',   route: '/', fragment: 'visit-us' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    this._scrolled.set(y > 60);

    // ScrollSpy Logic for homepage fragments
    const sections = this.navItems.filter(i => i.fragment).map(i => i.fragment!);
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && y >= (el.offsetTop - 150)) {
        current = id;
      }
    }
    this.activeSection.set(current);
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
