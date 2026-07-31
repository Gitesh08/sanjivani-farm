export interface LocationData {
  id: string;
  name: string;
  type: string; // e.g., 'Beach', 'City', 'Fort'
  distance: string;
  driveTime: string;
  heroHeadline: string;
  heroSubheadline: string;
  seoDescription: string;
  keywords: string;
  attractions: string[];
}

export const LOCATIONS: Record<string, LocationData> = {
  'saphale': {
    id: 'saphale',
    name: 'Saphale',
    type: 'Town',
    distance: '8 km',
    driveTime: '15 mins',
    heroHeadline: 'The Best Resort Near Saphale',
    heroSubheadline: 'Escape to 16 acres of pure nature just 15 minutes from Saphale station. Experience our private toy train and kayaking.',
    seoDescription: 'Looking for a resort near Saphale? Sanjivani Farm offers luxury cottages, a private toy train, and serene lakes just 15 mins from Saphale.',
    keywords: 'resort near saphale, farm stay saphale, weekend getaway saphale',
    attractions: ['Tandulwadi Fort (Trekking)', 'Vajreshwari Temple (Nearby)']
  },
  'kelve': {
    id: 'kelve',
    name: 'Kelve Beach',
    type: 'Beach',
    distance: '15 km',
    driveTime: '30 mins',
    heroHeadline: 'Premium Stay Near Kelve Beach',
    heroSubheadline: 'Combine the thrill of Kelve Beach with the tranquility of our 16-acre farm stay. Private boating, toy train, and luxury cottages.',
    seoDescription: 'Find the perfect stay near Kelve Beach. Sanjivani Farm is a 16-acre luxury farm stay with private lakes, just 30 mins from Kelve.',
    keywords: 'kelve beach resort, stay near kelve beach, farm stay kelve',
    attractions: ['Kelve Beach', 'Kelve Fort', 'Shirgaon Fort']
  },
  'vasai-virar': {
    id: 'vasai-virar',
    name: 'Vasai-Virar',
    type: 'City',
    distance: '45 km',
    driveTime: '1 hour',
    heroHeadline: 'The Ultimate Weekend Getaway from Vasai-Virar',
    heroSubheadline: 'Trade the city noise for 700+ coconut trees and private kayaking. The perfect family escape just an hour drive away.',
    seoDescription: 'The best weekend getaway from Vasai-Virar. Book your stay at Sanjivani Farm for a luxury nature retreat with a toy train and boating.',
    keywords: 'weekend getaway vasai virar, resort near vasai, corporate outing vasai',
    attractions: ['Vasai Fort', 'Arnala Fort', 'Jivdani Devi Temple']
  },
  'palghar': {
    id: 'palghar',
    name: 'Palghar',
    type: 'District Headquarter',
    distance: '20 km',
    driveTime: '40 mins',
    heroHeadline: 'Luxury Farm Stay in Palghar',
    heroSubheadline: 'Discover Palghar\'s best-kept secret. 16 acres of pristine Konkan agritourism with luxury cottages and exclusive digital detox zones.',
    seoDescription: 'Experience the premier farm stay in Palghar. Sanjivani Farm features 16 acres of nature, a toy train, and luxury cottages.',
    keywords: 'farm stay palghar, palghar resort, nature resort palghar',
    attractions: ['Kelva Beach', 'Shirgaon Fort', 'Mahim Beach']
  }
};
