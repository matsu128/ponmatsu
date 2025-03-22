'use client';

import React from 'react';
import { Modal } from '../molecules/Modal';

interface IdeaPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

export const IdeaPostForm: React.FC<IdeaPostFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: 'サンプルアイディア',
      description: 'これはサンプルの説明です。',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="アイディアを投稿"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600"
        >
          投稿する
        </button>
      </form>
    </Modal>
  );
}; 