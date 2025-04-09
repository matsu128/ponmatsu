export interface Product {
  id: string;
  title: string;
  imageUrls: string[];
  description: string;
  couponCode?: string;
  affiliateLink: string;
  clickCount: number;
  rank: number;
  category: string;
  tiktokTitle: string;
  tiktokComment: string;
  tiktokThumbnail: string;
} 