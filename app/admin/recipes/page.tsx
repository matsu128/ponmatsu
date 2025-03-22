import { RecipeAdminWrapper } from '@/components/templates/RecipeAdminWrapper';

const navItems = [
  { label: 'ホーム', href: '/' },
  { label: 'レシピ管理', href: '/admin/recipes' },
  { label: 'ファン管理', href: '/admin/fan' },
];

// モックデータ（後でAPIから取得するように変更）
const mockRecipes = [
  {
    id: '1',
    title: '簡単パスタレシピ',
    description: '20分で作れる美味しいパスタのレシピです。',
    imageUrl: '/images/recipe1.jpg',
  },
  {
    id: '2',
    title: '絶品カレー',
    description: '誰でも作れる本格的なカレーのレシピです。',
    imageUrl: '/images/recipe2.jpg',
  },
];

export default function RecipeAdminPage() {
  return (
    <RecipeAdminWrapper
      title="レシピ管理"
      navItems={navItems}
      recipes={mockRecipes}
    />
  );
} 