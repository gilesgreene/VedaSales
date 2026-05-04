export type PlanType = 'free' | 'pro' | 'business';

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  seller_type?: string;
  categories?: string[];
  goal?: string;
  plan: PlanType;
  created_at: string;
}

export interface Product {
  id: string;
  keyword: string;
  category: string;
  trend_score: number;
  trend_direction: 'rising' | 'stable' | 'declining';
  reddit_mentions: number;
  etsy_listing_count: number;
  youtube_video_count: number;
  price_min?: number;
  price_max?: number;
  ai_summary?: string;
  last_refreshed: string;
  created_at: string;
}

export interface RedditPost {
  id: string;
  product_id: string;
  title: string;
  upvotes: number;
  subreddit: string;
  url: string;
  created_at: string;
}

export interface EtsyListing {
  id: string;
  product_id: string;
  title: string;
  price: number;
  sales_count: number;
  url: string;
  created_at: string;
}

export interface YouTubeVideo {
  id: string;
  product_id: string;
  title: string;
  view_count: number;
  published_at: string;
  url: string;
  thumbnail_url: string;
  created_at: string;
}

export interface TrendHistory {
  id: string;
  product_id: string;
  score: number;
  recorded_at: string;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  product_id: string;
  alert_enabled: boolean;
  created_at: string;
  product?: Product;
}
