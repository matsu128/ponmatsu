'use client';

import React from 'react';
import { HeaderNav } from '../organisms/HeaderNav';
import { Button } from '../atoms/Button';
import { Modal } from '../molecules/Modal';
import { Input } from '../atoms/Input';
import { RecipeCard } from '../molecules/RecipeCard';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface RecipeAdminTemplateProps {
  title: string;
  navItems: Array<{ label: string; href: string }>;
  recipes: Recipe[];
  onRecipeCreate?: (data: { title: string; description: string; imageUrl: string }) => void;
  onRecipeEdit?: (id: string, data: { title: string; description: string; imageUrl: string }) => void;
  onRecipeDelete?: (id: string) => void;
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
}

export const RecipeAdminTemplate: React.FC<RecipeAdminTemplateProps> = ({
  title,
  navItems,
  recipes,
  onRecipeCreate,
  onRecipeEdit,
  onRecipeDelete,
  onLoginClick,
  isLoggedIn,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingRecipe, setEditingRecipe] = React.useState<Recipe | null>(null);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecipe) {
      onRecipeEdit?.(editingRecipe.id, formData);
    } else {
      onRecipeCreate?.(formData);
    }
    setIsModalOpen(false);
    setEditingRecipe(null);
    setFormData({ title: '', description: '', imageUrl: '' });
  };

  const handleEdit = (id: string) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      setEditingRecipe(recipe);
      setFormData({
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <HeaderNav
        title={title}
        _navItems={navItems}
        onLoginClick={onLoginClick}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="bg-background-light rounded-xl shadow-elevation-2 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">レシピ管理</h1>
            <Button 
              onClick={() => setIsModalOpen(true)}
              size="large"
            >
              新規レシピ作成
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                onClick={() => handleEdit(recipe.id)}
              />
            ))}
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRecipe(null);
            setFormData({ title: '', description: '', imageUrl: '' });
          }}
          title={editingRecipe ? 'レシピを編集' : '新規レシピ作成'}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="タイトル"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              fullWidth
            />
            <Input
              label="画像URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              required
              fullWidth
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                説明
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              {editingRecipe && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onRecipeDelete?.(editingRecipe.id)}
                >
                  削除
                </Button>
              )}
              <Button type="submit">
                {editingRecipe ? '更新' : '作成'}
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}; 