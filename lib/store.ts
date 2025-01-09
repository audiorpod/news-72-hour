import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PayoutRate, Article, User } from './types';

interface DashboardStore {
  user: User | null;
  articles: Article[];
  payoutRates: PayoutRate[];
  setUser: (user: User | null) => void;
  setArticles: (articles: Article[]) => void;
  setPayoutRates: (rates: PayoutRate[]) => void;
  updatePayoutRate: (type: 'news' | 'blog', rate: number) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      user: null,
      articles: [],
      payoutRates: [
        { type: 'news', rate: 50 },
        { type: 'blog', rate: 100 },
      ],
      setUser: (user) => set({ user }),
      setArticles: (articles) => set({ articles }),
      setPayoutRates: (payoutRates) => set({ payoutRates }),
      updatePayoutRate: (type, rate) =>
        set((state) => ({
          payoutRates: state.payoutRates.map((r) =>
            r.type === type ? { ...r, rate } : r
          ),
        })),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);