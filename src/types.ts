export type ArticleCategory =
  | 'INDIA AUTO'
  | 'EV REVOLUTION'
  | 'TWO WHEELS'
  | 'PERFORMANCE'
  | 'MOTORSPORT';

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  quote?: string;
  quoteAuthor?: string;
  image?: string;
  imageCaption?: string;
  specSheet?: { label: string; value: string }[];
}

export interface Article {
  id: string;
  category: ArticleCategory;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  readMinutes: number;
  image: string;
  imageCaption?: string;
  excerpt: string;
  keywords: string[];
  keyTakeaways: string[];
  sections: ArticleSection[];
}

export interface BrandProfile {
  id: string;
  name: string;
  tagline: string;
  origin: string;
  founded: string;
  heritage: string;
  iconicVehicles: string[];
  evStrategy: string;
  marketShareHighlight: string;
  accentColor: string;
}

export interface MachineSpec {
  name: string;
  subtitle: string;
  category: string;
  image: string;
  powerHp: number;
  torqueNm: number;
  zeroToHundredSec: number;
  topSpeedKmh: number;
  rangeOrMileage: string;
  curbWeightKg: number;
  priceBracket: string;
  powerUnit: string;
  drivetrain: string;
}

export interface MachineShowdown {
  id: string;
  title: string;
  subtitle: string;
  vehicleA: MachineSpec;
  vehicleB: MachineSpec;
  editorialVerdict: string;
}

export interface ReaderComment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}
