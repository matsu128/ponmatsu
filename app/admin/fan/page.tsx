'use client';

import React, { useState } from 'react';
import { AdminTemplate } from '@/components/templates/AdminTemplate';
import { NewsAdmin } from '@/components/organisms/NewsAdmin';
import { RankingAdmin } from '@/components/organisms/RankingAdmin';
import { Button } from '@/components/atoms/Button';
import { FanSiteTemplate } from '@/components/templates/FanSiteTemplate';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface RankingItem {
  id: string;
  title: string;
  description: string;
  votes: number;
  hasVoted: boolean;
}

// モックデータ
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: '新商品発売のお知らせ',
    date: '2024-03-20',
    content: '新商品「ポンまつ」が発売されました。',
  },
  {
    id: '2',
    title: '店舗リニューアルのお知らせ',
    date: '2024-03-15',
    content: '本日より店舗をリニューアルしました。',
  },
];

const mockRankings: RankingItem[] = [
  {
    id: '1',
    title: '好きなポンまつ味ランキング',
    description: 'あなたの好きなポンまつ味を教えてください',
    votes: 150,
    hasVoted: false,
  },
  {
    id: '2',
    title: '次に発売してほしい商品ランキング',
    description: '次に発売してほしい商品を教えてください',
    votes: 200,
    hasVoted: false,
  },
];

export default function FanAdminPage() {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [rankings, setRankings] = useState<RankingItem[]>(mockRankings);
  const [rankingStartDate, setRankingStartDate] = useState('2024-03-20');
  const [rankingEndDate, setRankingEndDate] = useState('2024-04-20');
  const [isPreview, setIsPreview] = useState(false);

  const handleAddNews = (data: Omit<NewsItem, 'id' | 'date'>) => {
    const newNews: NewsItem = {
      ...data,
      id: String(news.length + 1),
      date: new Date().toISOString().split('T')[0],
    };
    setNews([newNews, ...news]);
  };

  const handleEditNews = (id: string, data: Omit<NewsItem, 'id' | 'date'>) => {
    setNews(news.map((item: NewsItem) =>
      item.id === id
        ? { ...item, ...data }
        : item
    ));
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((item: NewsItem) => item.id !== id));
  };

  const handleAddRanking = (data: Omit<RankingItem, 'id' | 'votes' | 'hasVoted'>) => {
    const newRanking: RankingItem = {
      ...data,
      id: String(rankings.length + 1),
      votes: 0,
      hasVoted: false,
    };
    setRankings([newRanking, ...rankings]);
  };

  const handleEditRanking = (id: string, data: Omit<RankingItem, 'id' | 'votes' | 'hasVoted'>) => {
    setRankings(rankings.map((item: RankingItem) =>
      item.id === id
        ? { ...item, ...data }
        : item
    ));
  };

  const handleDeleteRanking = (id: string) => {
    setRankings(rankings.filter((item: RankingItem) => item.id !== id));
  };

  const handleRankingDateChange = (startDate: string, endDate: string) => {
    setRankingStartDate(startDate);
    setRankingEndDate(endDate);
  };

  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    console.log('保存処理を実行');
  };

  if (isPreview) {
    return (
      <div className="relative min-h-screen bg-gray-50">
        <Button
          variant="primary"
          onClick={() => setIsPreview(false)}
          className="fixed top-4 right-4 z-50 text-xs px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white shadow-md"
        >
          管理画面に戻る
        </Button>
        <FanSiteTemplate
          title="ぽんまつファンサイト"
          navItems={[
            { label: 'ホーム', href: '/' },
            { label: 'レシピ', href: '/recipe' },
          ]}
          newsItems={news}
          rankingItems={rankings}
          isLoggedIn={true}
        />
      </div>
    );
  }

  return (
    <AdminTemplate
      title="ファンサイト管理"
      navItems={[
        { href: '/admin', label: 'ホーム' },
        { href: '/admin/recipe', label: 'レシピ管理' },
      ]}
    >
      <div className="space-y-8">
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => setIsPreview(true)}
            className="text-xs px-2 py-1"
          >
            プレビュー
          </Button>
        </div>
        <NewsAdmin
          items={news}
          onAdd={handleAddNews}
          onEdit={handleEditNews}
          onDelete={handleDeleteNews}
        />
        <RankingAdmin
          items={rankings}
          onAdd={handleAddRanking}
          onEdit={handleEditRanking}
          onDelete={handleDeleteRanking}
          startDate={rankingStartDate}
          endDate={rankingEndDate}
          onDateChange={handleRankingDateChange}
        />
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            onClick={handleSave}
            className="text-xs px-4 py-1.5"
          >
            変更を保存
          </Button>
        </div>
      </div>
    </AdminTemplate>
  );
} 