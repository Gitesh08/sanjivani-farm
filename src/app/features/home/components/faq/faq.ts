import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  link?: { text: string; url: string };
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
      question: "How do I reach Sanjivani Farm from Mumbai or Vasai?",
      answer: "We are located in Saphale, Palghar District (about 90 km from Mumbai and 40 km from Vasai-Virar). You can drive via NH-48 or take a Virar-Dahanu train to Saphale station.",
      link: { text: "Get Directions", url: "https://www.google.com/maps/dir//sanjivani+farm+%26+resort/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be7039d2a6f5b01:0x89b4fe262a5bd81f?sa=X&ved=1t:155782&ictx=111" }
    },
    {
      question: "What activities are available and at what times?",
      answer: "Our Sanjivani Toy Train runs at scheduled times during the day and we'll let you know the exact timings when you check in. You can enjoy kayaking and boating on the private lake, cycling around the 16-acre farm, archery, badminton, and carrom during daylight hours. The hammock gardens and lawns are open all day for you to relax. All these activities are completely free for our overnight guests."
    },
    {
      question: "Is the Toy Train available for day picnic guests too?",
      answer: "Yes, absolutely! The Sanjivani Toy Train is available for both overnight guests and day picnic visitors. It's one of the most popular things to do here and runs on a schedule. We suggest arriving early so you can get your preferred ride time, especially if you're visiting on a weekend."
    },
    {
      question: "What food options are available? Is outside food allowed?",
      answer: "We serve fresh, home-cooked Maharashtrian meals with both vegetarian and non-vegetarian options. Everything is made in our kitchen using fresh ingredients from the farm. We don't allow outside food or alcohol on the property. If you have any specific dietary needs, just let us know when you book your stay."
    },

    {
      question: "Is Sanjivani Farm suitable for corporate team outings or events?",
      answer: "Yes, it is! We regularly host corporate team-building outings, day picnics, and private events. Our large lawns, dedicated staff, and group activities like the toy train and kayaking make it a great spot for corporate groups coming from Mumbai or Vasai-Virar. We also offer custom packages, so feel free to reach out to discuss your plans."
    },
    {
      question: "Is the farm child-friendly and safe for kids?",
      answer: "Yes, Sanjivani Farm is a great place for kids. They really enjoy the Toy Train, cycling, and playing on the open lawns. The lake activities are always supervised to ensure everyone's safety. The whole property is securely fenced, so parents can relax while the kids have fun."
    }
  ];

  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }
}
