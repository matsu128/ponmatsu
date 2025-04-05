import React, { useState } from 'react';
import { Modal } from '../molecules/Modal';
import { Text } from '../atoms/Text';

interface QuestionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { category: string; question: string }) => void;
}

// 仮のカテゴリーリスト（後で管理画面から設定できるようにする）
const categories = [
  'ぽんまつについて',
  'ライブについて',
  'グッズについて',
  'その他'
];

export const QuestionForm: React.FC<QuestionFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && question) {
      onSubmit({ category, question });
      setCategory('');
      setQuestion('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="質問フォーム"
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        {/* カテゴリー選択 */}
        <div className="space-y-2">
          <Text variant="body" className="text-sm font-medium text-gray-700">
            カテゴリー
          </Text>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">選択してください</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 質問内容 */}
        <div className="space-y-2">
          <Text variant="body" className="text-sm font-medium text-gray-700">
            質問内容
          </Text>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[120px] resize-none"
            placeholder="質問内容を入力してください"
            required
          />
        </div>

        {/* 送信ボタン */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!category || !question}
          >
            <Text variant="body" className="text-sm font-medium">
              送信する
            </Text>
          </button>
        </div>
      </form>
    </Modal>
  );
}; 