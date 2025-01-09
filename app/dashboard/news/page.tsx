'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboardStore } from '@/lib/store';

interface NewsArticle {
  title: string;
  author: string;
  publishedAt: string;
  url: string;
  source: {
    name: string;
  };
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setArticles: storeSetArticles } = useDashboardStore();

  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=f4da6404f91d4bf698d5ce59efcdff5a`
        );
        const data = await response.json();
        
        if (!mounted) return;
        
        if (data.status === 'error') {
          setError(data.message || 'Failed to fetch news');
          return;
        }

        const newsArticles = data.articles || [];
        setArticles(newsArticles);
        
        // Transform and store in global state
        const transformedArticles = newsArticles.map((article: NewsArticle) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: article.title || 'Untitled',
          author: article.author || 'Unknown',
          date: article.publishedAt || new Date().toISOString(),
          type: 'news',
          content: '',
          url: article.url || '#'
        }));
        
        storeSetArticles(transformedArticles);
      } catch (error) {
        if (!mounted) return;
        setError('Failed to fetch news');
        console.error('Error fetching news:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();
    return () => { mounted = false; };
  }, [storeSetArticles]);

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-4 bg-red-50 text-red-600">
          {error}
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">News Dashboard</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {loading ? (
              <Card className="p-4">Loading news...</Card>
            ) : articles.length === 0 ? (
              <Card className="p-4">No news articles available</Card>
            ) : (
              articles.map((article, index) => (
                <Card key={index} className="p-4">
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>Author: {article.author || 'Unknown'}</p>
                    <p>Source: {article.source?.name || 'Unknown Source'}</p>
                    <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    Read more
                  </a>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}