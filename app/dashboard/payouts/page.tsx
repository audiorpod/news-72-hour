'use client';

import { Card } from '@/components/ui/card';
import { useDashboardStore } from '@/lib/store';

export default function PayoutsPage() {
  const { articles, payoutRates } = useDashboardStore();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payouts</h1>
      <div className="grid gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Current Payout Rates</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>News Articles</span>
              <span>${payoutRates.find(r => r.type === 'news')?.rate || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Blog Posts</span>
              <span>${payoutRates.find(r => r.type === 'blog')?.rate || 0}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}