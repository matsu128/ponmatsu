import { FanAdminWrapper } from '@/components/templates/FanAdminWrapper';

const navItems = [
  { label: 'ホーム', href: '/' },
  { label: 'レシピ管理', href: '/admin/recipes' },
  { label: 'ファン管理', href: '/admin/fan' },
];

// モックデータ（後でAPIから取得するように変更）
const mockNews = [
  {
    id: '1',
    title: '新商品発売のお知らせ',
    date: '2024-02-20',
    content: '新しい商品が発売されました。ぜひチェックしてください！',
  },
  {
    id: '2',
    title: 'イベント開催決定',
    date: '2024-02-19',
    content: '来月、大規模なファンイベントを開催します。',
  },
];

export default function FanAdminPage() {
  return (
    <FanAdminWrapper
      title="ファン管理"
      navItems={navItems}
      newsItems={mockNews}
    />
  );
} 