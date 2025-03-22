'use client';

import React from 'react';
import { HeaderNav } from '../organisms/HeaderNav';
import { RecipeList } from '../organisms/RecipeList';

interface RecipeTemplateProps {
  title: string;
  _navItems: Array<{ label: string; href: string }>;
  recipes: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
  onRecipeClick?: (id: string) => void;
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
}

export const RecipeTemplate: React.FC<RecipeTemplateProps> = ({
  title,
  _navItems,
  recipes,
  onRecipeClick,
  onLoginClick,
  isLoggedIn,
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderNav
        title={title}
        _navItems={_navItems}
        onLoginClick={onLoginClick}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="container mx-auto px-4 py-8">
        <RecipeList
          title="レシピ一覧"
          items={recipes}
          onRecipeClick={onRecipeClick}
        />
      </main>
    </div>
  );
}; 