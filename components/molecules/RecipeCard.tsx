'use client';

import React from 'react';
import { Image } from '../atoms/Image';
import { Text } from '../atoms/Text';

interface RecipeCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
}) => {
  return (
    <div 
      className="group cursor-pointer bg-background-light rounded-xl shadow-elevation-1 overflow-hidden hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-48 sm:h-56">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <Text variant="h3" className="mb-2 group-hover:text-primary-600">
          {title}
        </Text>
        <Text variant="body" color="secondary" className="line-clamp-2">
          {description}
        </Text>
      </div>
    </div>
  );
}; 