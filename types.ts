export type TourDifficulty = 'Easy' | 'Moderate' | 'Challenging';
export type TourType = 'Walking' | 'Hiking' | 'Food' | 'Kayaking' | 'Adventure' | 'Family' | 'Jeep' | 'Relax' | 'Weekend' | 'History' | 'City' | 'Lake' | 'Forest' | 'River' | 'Fishing' | 'Desert' | 'Authentic' | 'Express' | 'Abroad' | 'Unique' | 'Ladies' | 'Islam' | 'Men';
export type PartnerStatus = 'Active' | 'Blocked';

export interface Partner {
  id: string;
  name: string;
  status: PartnerStatus;
}

export interface LocalizedString {
  en: string;
  ru: string;
}

export interface Tour {
  id:string;
  partnerId: string;
  partnerName: string;
  title: LocalizedString;
  description: LocalizedString;
  location: string;
  price: number;
  durationDays: number;
  imageUrl: string;
  difficulty: TourDifficulty;
  type: TourType;
  rating: number;
  availableDates: string[]; // YYY-MM-DD
  isFeatured?: boolean;
}

export interface Booking {
  id: string;
  tourId: string;
  bookingDate: string; // YYYY-MM-DD
  status: 'Completed' | 'Upcoming';
  review?: {
    rating: number;
    text: string;
    photos: string[];
  };
}