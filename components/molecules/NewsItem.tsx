'use client';

import React from 'react';

interface NewsItemProps {
  title: string;
  date: string;
  _content: string;
  onClick: () => void;
}

export const NewsItem: React.FC<NewsItemProps> = ({
  title,
  date,
  _content,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
    >
      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{date}</p>
    </button>
  );
}; 