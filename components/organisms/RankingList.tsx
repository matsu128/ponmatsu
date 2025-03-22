'use client';

import React from 'react';
import { RankingItem } from '../molecules/RankingItem';

interface RankingData {
  id: string;
  title: string;
  votes: number;
  hasVoted: boolean;
}

interface RankingListProps {
  _title: string;
  items: RankingData[];
  _onVoteClick?: (id: string) => void;
  onItemClick?: (id: string) => void;
}

export const RankingList: React.FC<RankingListProps> = ({
  _title,
  items,
  _onVoteClick,
  onItemClick,
}) => {
  return (
    <div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className="cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
          >
            <RankingItem
              rank={index + 1}
              title={item.title}
              votes={item.votes}
              hasVoted={item.hasVoted}
              onDetailsClick={() => onItemClick?.(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 