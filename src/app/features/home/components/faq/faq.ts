import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {
  readonly questions: FaqItem[] = [
    {
      question: "What makes Sanjivani Farm different from other resorts in Palghar or Lonavala?",
      answer: "Sanjivani Farm is a 16-acre authentic Konkan agritourism experience, not just a typical resort. We are uniquely known for our private Sanjivani Toy Train, kayaking on private lakes, and over 700 lush coconut trees. Unlike crowded tourist hubs, we offer complete serenity just an hour from Vasai-Virar."
    },
    {
      question: "Is there Wi-Fi, or is this a complete digital detox experience?",
      answer: "We strongly encourage a digital detox to help you reconnect with nature. Therefore, high-speed Wi-Fi is intentionally restricted to our common areas and dining spaces. The cottages remain a screen-free sanctuary."
    },
    {
      question: "What activities are included in the stay?",
      answer: "Every guest gets a complimentary ride on the Sanjivani Toy Train! You also have free access to cycling across our 16 acres, kayaking and boating on our private lakes, archery, badminton, carrom, and relaxing in our hammock gardens."
    },
    {
      question: "How far is the farm from Mumbai, Vasai, or Saphale?",
      answer: "We are extremely accessible. Located in Saphale (Palghar District), we are just a 1-hour drive from the Vasai-Virar belt, and about 1.5 to 2 hours from central Mumbai. Kelve Beach is also just 15 km away."
    },
    {
      question: "Do you host corporate outings, day picnics, or large family events?",
      answer: "Yes! We specialize in corporate team-building events, day picnics, and large family gatherings. With our expansive open lawns, massive dining area, and dedicated event staff, we are the premium choice for corporate outings near Vasai-Virar."
    }
  ];

  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }
}
