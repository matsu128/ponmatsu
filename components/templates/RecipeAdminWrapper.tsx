'use client';

import { RecipeAdminTemplate } from './RecipeAdminTemplate';

interface RecipeAdminWrapperProps {
  title: string;
  navItems: Array<{ label: string; href: string }>;
  recipes: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
}

export const RecipeAdminWrapper: React.FC<RecipeAdminWrapperProps> = ({
  title,
  navItems,
  recipes,
}) => {
  const handleRecipeCreate = (data: { title: string; description: string; imageUrl: string }) => {
    console.log('Recipe created:', data);
  };

  const handleRecipeEdit = (id: string, data: { title: string; description: string; imageUrl: string }) => {
    console.log('Recipe edited:', id, data);
  };

  const handleRecipeDelete = (id: string) => {
    console.log('Recipe deleted:', id);
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  return (
    <RecipeAdminTemplate
      title={title}
      navItems={navItems}
      recipes={recipes}
      onRecipeCreate={handleRecipeCreate}
      onRecipeEdit={handleRecipeEdit}
      onRecipeDelete={handleRecipeDelete}
      onLoginClick={handleLoginClick}
      isLoggedIn={true}
    />
  );
}; 