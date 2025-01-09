// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// News Types
export interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  type: 'news' | 'blog';
  content: string;
  url: string;
}

// Payout Types
export interface PayoutRate {
  type: 'news' | 'blog';
  rate: number;
}

export interface PayoutRecord {
  authorId: string;
  articleCount: number;
  totalPayout: number;
  period: string;
}