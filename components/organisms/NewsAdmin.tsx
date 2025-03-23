'use client';

import React, { useState } from 'react';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Modal } from '../molecules/Modal';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface NewsAdminProps {
  items: NewsItem[];
  onAdd: (data: Omit<NewsItem, 'id'>) => void;
  onEdit: (id: string, data: Omit<NewsItem, 'id'>) => void;
  onDelete: (id: string) => void;
}

export const NewsAdmin: React.FC<NewsAdminProps> = ({
  items,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    content: '',
  });

  const handleAdd = () => {
    onAdd({
      ...formData,
      date: new Date().toISOString().split('T')[0],
    });
    setShowAddModal(false);
    setFormData({ title: '', date: '', content: '' });
  };

  const handleEdit = () => {
    if (selectedNews) {
      onEdit(selectedNews.id, {
        ...formData,
        date: selectedNews.date,
      });
      setShowEditModal(false);
      setShowDetailModal(false);
      setSelectedNews(null);
      setFormData({ title: '', date: '', content: '' });
    }
  };

  const handleDelete = () => {
    if (selectedNews) {
      onDelete(selectedNews.id);
      setShowDeleteModal(false);
      setShowDetailModal(false);
      setSelectedNews(null);
    }
  };

  const handleRowClick = (news: NewsItem) => {
    setSelectedNews(news);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text variant="h2" className="text-base font-medium text-gray-900">
          ニュース管理
        </Text>
        <Button
          variant="primary"
          onClick={() => {
            setFormData({
              title: '',
              date: '',
              content: '',
            });
            setShowAddModal(true);
          }}
          className="text-xs px-2 py-1"
        >
          新規作成
        </Button>
      </div>

      <div className="overflow-hidden">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleRowClick(item)}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <Text variant="body" className="text-sm font-medium text-gray-900">
                {item.title}
              </Text>
              <Text variant="caption" className="text-xs text-gray-500 mt-1">
                {new Date(item.date).toLocaleDateString('ja-JP')}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* 詳細モーダル */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedNews(null);
        }}
        title="ニュース詳細"
      >
        {selectedNews && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <Text variant="body" className="text-sm text-gray-900">
                {selectedNews.title}
              </Text>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                内容
              </label>
              <Text variant="body" className="text-sm text-gray-900 whitespace-pre-wrap">
                {selectedNews.content}
              </Text>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                公開日
              </label>
              <Text variant="body" className="text-sm text-gray-900">
                {new Date(selectedNews.date).toLocaleDateString('ja-JP')}
              </Text>
            </div>
            <div className="flex justify-center space-x-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDetailModal(false);
                  setShowDeleteModal(true);
                }}
                className="text-xs px-4 py-1.5"
              >
                削除
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowDetailModal(false);
                  setFormData({
                    title: selectedNews.title,
                    date: selectedNews.date,
                    content: selectedNews.content,
                  });
                  setShowEditModal(true);
                }}
                className="text-xs px-4 py-1.5"
              >
                編集
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 新規作成モーダル */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="新規ニュース作成"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              タイトル
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              日付
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              内容
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="text-xs px-3 py-1.5"
            >
              キャンセル
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              className="text-xs px-3 py-1.5"
            >
              作成
            </Button>
          </div>
        </div>
      </Modal>

      {/* 編集モーダル */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="ニュース編集"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              タイトル
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              日付
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              内容
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
              className="text-xs px-3 py-1.5"
            >
              キャンセル
            </Button>
            <Button
              variant="primary"
              onClick={handleEdit}
              className="text-xs px-3 py-1.5"
            >
              更新
            </Button>
          </div>
        </div>
      </Modal>

      {/* 削除確認モーダル */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="ニュース削除"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            このニュースを削除してもよろしいですか？
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="text-xs px-3 py-1.5"
            >
              キャンセル
            </Button>
            <Button
              variant="error"
              onClick={handleDelete}
              className="text-xs px-3 py-1.5"
            >
              削除
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}; 