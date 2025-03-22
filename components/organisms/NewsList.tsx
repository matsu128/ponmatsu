'use client';

import React from 'react';
import { NewsItem } from '../molecules/NewsItem';

interface NewsData {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface NewsListProps {
  _title: string;
  items: NewsData[];
  onNewsClick: (id: string) => void;
}

export const NewsList: React.FC<NewsListProps> = ({ _title, items, onNewsClick }) => {
  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => (
          <NewsItem
            key={item.id}
            title={item.title}
            date={item.date}
            _content={item.content}
            onClick={() => onNewsClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}; 