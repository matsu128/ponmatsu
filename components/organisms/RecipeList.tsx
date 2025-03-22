import React from 'react';
import { RecipeCard } from '../molecules/RecipeCard';
import { Text } from '../atoms/Text';

interface RecipeData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface RecipeListProps {
  title: string;
  items: RecipeData[];
  onRecipeClick?: (id: string) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  title,
  items,
  onRecipeClick,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <Text variant="h2" className="mb-6">{title}</Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <RecipeCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            onClick={() => onRecipeClick?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
}; 