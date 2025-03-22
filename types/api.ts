export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

export interface RankingItem {
  id: string;
  title: string;
  votes: number;
  hasVoted: boolean;
  description?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HomePageData {
  news: Array<{
    id: string;
    title: string;
    date: string;
    content: string;
  }>;
  rankings: RankingItem[];
  recipes: Recipe[];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
} 