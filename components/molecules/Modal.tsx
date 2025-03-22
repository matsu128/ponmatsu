'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string | null;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Portal root level */}
      <div className="fixed inset-0 z-[100] overflow-y-auto">
        {/* オーバーレイ */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* モーダルコンテンツ */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-out scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <span className="sr-only">閉じる</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* タイトル（オプション） */}
            {title && (
              <div className="px-6 pt-6 pb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {title}
                </h3>
              </div>
            )}

            {/* コンテンツ */}
            <div className="px-6 pb-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 