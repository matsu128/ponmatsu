import React from 'react';
import { Text } from '../atoms/Text';

interface QuestionBoxProps {
  onQuestionClick: () => void;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({ onQuestionClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <button
        onClick={onQuestionClick}
        className="w-full py-3 px-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 group"
      >
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Text variant="body" className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
            質問する
          </Text>
        </div>
      </button>
    </div>
  );
}; 