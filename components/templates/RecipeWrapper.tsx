'use client';

import { RecipeTemplate } from './RecipeTemplate';

interface RecipeWrapperProps {
  title: string;
  navItems: Array<{ label: string; href: string }>;
  recipes: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
}

export const RecipeWrapper: React.FC<RecipeWrapperProps> = ({
  title,
  navItems,
  recipes,
}) => {
  const handleRecipeClick = (id: string) => {
    console.log('Recipe clicked:', id);
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  return (
    <RecipeTemplate
      title={title}
      _navItems={navItems}
      recipes={recipes}
      onRecipeClick={handleRecipeClick}
      onLoginClick={handleLoginClick}
    />
  );
}; 