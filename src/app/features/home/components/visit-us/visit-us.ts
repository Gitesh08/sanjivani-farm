import { Component, ChangeDetectionStrategy, ElementRef, inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';

@Component({
  selector: 'app-visit-us',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './visit-us.html',
  styleUrl: './visit-us.css',
  standalone: true
})
export class VisitUsComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sectionInner = this.el.nativeElement.querySelector('.visit-us__inner');
    if (sectionInner) {
      animateSectionTitle('.visit-us__label, .visit-us__title, .visit-us__tag', sectionInner);
      animateScrollReveal('.visit-us__grid > *', sectionInner, 0.2);
    }
  }
}
