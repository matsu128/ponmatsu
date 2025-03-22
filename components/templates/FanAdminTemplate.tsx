'use client';

import React from 'react';
import { HeaderNav } from '../organisms/HeaderNav';
import { NewsList } from '../organisms/NewsList';
import { Button } from '../atoms/Button';
import { Modal } from '../molecules/Modal';
import { Input } from '../atoms/Input';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface FanAdminTemplateProps {
  title: string;
  _navItems: Array<{ label: string; href: string }>;
  newsItems: NewsItem[];
  onNewsCreate?: (data: { title: string; content: string }) => void;
  onNewsEdit?: (id: string, data: { title: string; content: string }) => void;
  onNewsDelete?: (id: string) => void;
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
}

export const FanAdminTemplate: React.FC<FanAdminTemplateProps> = ({
  title,
  _navItems,
  newsItems,
  onNewsCreate,
  onNewsEdit,
  onNewsDelete,
  onLoginClick,
  isLoggedIn,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingNews, setEditingNews] = React.useState<NewsItem | null>(null);
  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      onNewsEdit?.(editingNews.id, formData);
    } else {
      onNewsCreate?.(formData);
    }
    setIsModalOpen(false);
    setEditingNews(null);
    setFormData({ title: '', content: '' });
  };

  const handleEdit = (id: string) => {
    const news = newsItems.find(n => n.id === id);
    if (news) {
      setEditingNews(news);
      setFormData({
        title: news.title,
        content: news.content,
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderNav
        title={title}
        _navItems={_navItems}
        onLoginClick={onLoginClick}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ニュース管理</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            新規ニュース作成
          </Button>
        </div>

        <NewsList
          _title="ニュース一覧"
          items={newsItems}
          onNewsClick={handleEdit}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNews(null);
            setFormData({ title: '', content: '' });
          }}
          title={editingNews ? 'ニュースを編集' : '新規ニュース作成'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="タイトル"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              fullWidth
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                内容
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={6}
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              {editingNews && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNewsDelete?.(editingNews.id)}
                >
                  削除
                </Button>
              )}
              <Button type="submit">
                {editingNews ? '更新' : '作成'}
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}; 