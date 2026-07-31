export interface GuidePost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  keywords: string;
}

export const GUIDE_POSTS: Record<string, GuidePost> = {
  'kelve-beach-guide': {
    id: 'kelve-beach-guide',
    title: 'The Ultimate Local Guide to Kelve Beach',
    description: 'Everything you need to know about visiting Kelve Beach, the Suru trees, and nearby forts.',
    image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776516148/image_ytjusr.png',
    date: '2026-05-18',
    author: 'Sanjivani Locals',
    readTime: '4 min read',
    keywords: 'kelve beach, kelve fort, palghar beaches',
    content: `
      <h2>Why Kelve Beach is a Must-Visit</h2>
      <p>With its pristine, long shoreline backed by an endless row of Suru (Casuarina) trees, Kelve Beach is one of the most picturesque spots in the Palghar district. It is much cleaner and less crowded than the beaches closer to Mumbai.</p>
      
      <h2>Historical Forts</h2>
      <p>Right on the beach, you can explore the ancient <strong>Kelve Fort</strong>, built by the Portuguese. Nearby is the <strong>Shirgaon Fort</strong>, offering incredible history and sunset views.</p>
      
      <h2>Where to Stay</h2>
      <p>Instead of staying at crowded beachside lodges, many travelers prefer to stay inland at an agritourism resort like <strong>Sanjivani Farm</strong>. Located just 15 km from the beach, the farm offers luxury cottages, a private toy train, and serene lakes, giving you the best of both the coast and the countryside.</p>
    `
  },
  'digital-detox-weekend': {
    id: 'digital-detox-weekend',
    title: 'Why a Digital Detox is the Best Weekend Getaway',
    description: 'Learn why swapping screen time for nature time at a farm stay is the ultimate reset.',
    image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776531113/download_20_ntzfol.jpg',
    date: '2026-05-15',
    author: 'Sanjivani Wellness',
    readTime: '3 min read',
    keywords: 'digital detox retreat, farm stay wellness, nature resort maharashtra',
    content: `
      <h2>The Need to Unplug</h2>
      <p>In our hyper-connected world, true luxury is the ability to disconnect. A digital detox allows your mind to rest, reducing stress and improving sleep quality.</p>
      
      <h2>The Sanjivani Approach</h2>
      <p>At Sanjivani Farm, we’ve designed the perfect environment for this. We intentionally restrict Wi-Fi to common areas. When you are in your cottage or walking through our 16 acres of coconut groves, you are completely free from notifications.</p>
      
      <h2>Reconnecting with Nature</h2>
      <p>Instead of scrolling, you spend your golden hour fishing, kayaking on our private lakes, or riding the Sanjivani Toy Train. It's a return to simple, joyful living.</p>
    `
  }
};
