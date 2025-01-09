'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDashboardStore } from '@/lib/store';

export default function DashboardPage() {
  const { articles, payoutRates } = useDashboardStore();

  const stats = [
    {
      title: 'Total Articles',
      value: articles.length,
    },
    {
      title: 'News Articles',
      value: articles.filter((a) => a.type === 'news').length,
    },
    {
      title: 'Blog Posts',
      value: articles.filter((a) => a.type === 'blog').length,
    },
    {
      title: 'Total Authors',
      value: new Set(articles.map((a) => a.author)).size,
    },
  ];

  const chartData = [
    { name: 'News', count: articles.filter((a) => a.type === 'news').length },
    { name: 'Blogs', count: articles.filter((a) => a.type === 'blog').length },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Content Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: 'currentColor' }}
                  axisLine={{ stroke: 'currentColor' }}
                  height={30}
                  interval="preserveStartEnd"
                  minTickGap={5}
                />
                <YAxis 
                  allowDecimals={false}
                  padding={{ top: 20 }}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: 'currentColor' }}
                  axisLine={{ stroke: 'currentColor' }}
                  width={40}
                  interval="preserveStartEnd"
                  minTickGap={5}
                />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}