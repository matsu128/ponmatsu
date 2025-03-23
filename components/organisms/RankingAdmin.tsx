'use client';

import React, { useState } from 'react';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Modal } from '../molecules/Modal';

interface RankingItem {
  id: string;
  title: string;
  description: string;
  votes: number;
  hasVoted: boolean;
}

interface RankingAdminProps {
  items: RankingItem[];
  onAdd: (data: Omit<RankingItem, 'id' | 'votes' | 'hasVoted'>) => void;
  onEdit: (id: string, data: Omit<RankingItem, 'id' | 'votes' | 'hasVoted'>) => void;
  onDelete: (id: string) => void;
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

export const RankingAdmin: React.FC<RankingAdminProps> = ({
  items,
  onAdd,
  onEdit,
  onDelete,
  startDate,
  endDate,
  onDateChange,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RankingItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleAdd = () => {
    onAdd(formData);
    setShowAddModal(false);
    setFormData({ title: '', description: '' });
  };

  const handleEdit = () => {
    if (selectedItem) {
      onEdit(selectedItem.id, formData);
      setShowEditModal(false);
      setSelectedItem(null);
      setFormData({ title: '', description: '' });
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem.id);
      setShowDeleteModal(false);
      setSelectedItem(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const handleRowClick = (item: RankingItem) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text variant="h2" className="text-base font-medium text-gray-900">
          投票箱管理
        </Text>
        <Button
          variant="primary"
          onClick={() => {
            setFormData({
              title: '',
              description: '',
            });
            setShowAddModal(true);
          }}
          className="text-xs px-2 py-1"
        >
          新規作成
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              投票開始日
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onDateChange(e.target.value, endDate)}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              投票終了日
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onDateChange(startDate, e.target.value)}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div className="mt-2">
          <Text variant="caption" className="text-xs text-gray-500">
            投票期間: {formatDate(startDate)} 〜 {formatDate(endDate)}
          </Text>
        </div>
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
                投票数: {item.votes || 0}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* 新規作成モーダル */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="新規投票箱作成"
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
              説明
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
        title="投票箱編集"
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
              説明
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
        title="投票箱削除"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            この投票箱を削除してもよろしいですか？
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

      {/* 詳細モーダル */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedItem(null);
        }}
        title="投票箱詳細"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <Text variant="body" className="text-sm text-gray-900">
                {selectedItem.title}
              </Text>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                説明
              </label>
              <Text variant="body" className="text-sm text-gray-900 whitespace-pre-wrap">
                {selectedItem.description}
              </Text>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                投票数
              </label>
              <Text variant="body" className="text-sm text-gray-900">
                {selectedItem.votes || 0}
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
                    title: selectedItem.title,
                    description: selectedItem.description,
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
    </div>
  );
}; 