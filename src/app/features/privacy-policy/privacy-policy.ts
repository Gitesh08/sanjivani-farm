import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  scrollTo(fragment: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(fragment);
    if (element) {
      // Offset for a sticky header if you have one, or just smooth scroll
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
