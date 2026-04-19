export interface Cottage {
  id?: string;
  name: string;
  slug: string;
  type: 'wooden' | 'premium' | 'standard' | 'luxury';
  description: string;
  baseCapacity: number;
  maxCapacity: number;
  pricePerPerson: number;
  images: string[]; // Cloudinary URLs
  amenities: string[];
  available: boolean;
  sortOrder: number;
}
