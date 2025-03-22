'use client';

import React from 'react';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';

interface RankingItemProps {
  rank: number;
  title: string;
  votes: number;
  onDetailsClick?: () => void;
  hasVoted?: boolean;
}

export const RankingItem: React.FC<RankingItemProps> = ({
  rank,
  title,
  votes,
  onDetailsClick,
  hasVoted = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex">
      {/* ランク番号 */}
      <div className="flex-shrink-0 self-center mr-3">
        <div className="w-8 h-8 flex items-center justify-center bg-primary-100 rounded-full">
          <span className="text-primary-600 font-bold text-base leading-none">
            {rank}<span className="text-sm">位</span>
          </span>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-grow min-w-0">
        {/* 上段：タイトル */}
        <div className="mb-3 sm:mb-4 flex justify-center">
          <Text variant="body" className="truncate text-center max-w-[90%]">
            {title}
          </Text>
        </div>

        {/* 下段：いいねと詳細ボタン */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // onVoteClick?.(id);
              }}
              disabled={hasVoted}
              className={`group relative p-2 rounded-full transition-all duration-300 ${
                hasVoted
                  ? 'text-primary-500'
                  : 'text-gray-400 hover:text-primary-500'
              }`}
            >
              {hasVoted ? (
                <svg className="w-5 h-5 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
            <Text 
              variant="body" 
              color="secondary" 
              className="w-8 text-center tabular-nums"
            >
              {votes.toString().padStart(3, '\u2007')}
            </Text>
          </div>
          
          <Button
            variant="outline"
            size="small"
            onClick={onDetailsClick}
          >
            詳細
          </Button>
        </div>
      </div>
    </div>
  );
}; 