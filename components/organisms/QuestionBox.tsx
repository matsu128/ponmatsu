import React, { useState } from 'react';
import { Text } from '../atoms/Text';

interface QuestionBoxProps {
  onQuestionClick: () => void;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({ onQuestionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showQuestionButton, setShowQuestionButton] = useState(false);
  const [initialImage, setInitialImage] = useState(true);

  const handleClick = () => {
    // 初期画像を非表示にする
    setInitialImage(false);
    
    // 遅延させてから開封アニメーションを開始
    setTimeout(() => {
      setIsOpen(true);
      // さらに遅延させてからアニメーションのステップを開始
      setTimeout(() => {
        setAnimationStep(1);
        // 質問ボタンを表示
        setTimeout(() => {
          setShowQuestionButton(true);
        }, 800); // スライドアニメーションがほぼ完了した後に表示
      }, 500);
    }, 300);
  };

  const handleClose = () => {
    // アニメーションを逆再生するように見せるため、まずボタンを非表示に
    setShowQuestionButton(false);
    
    // 少し遅延させてからアニメーションを逆再生
    setTimeout(() => {
      setAnimationStep(0);
      
      // アニメーションが完了したら初期状態に戻す
      setTimeout(() => {
        setIsOpen(false);
        setInitialImage(true);
      }, 1000); // スライドアニメーションの時間と同じ
    }, 100);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-3 overflow-hidden">
      {!isOpen ? (
        <div 
          className="cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center justify-center"
          onClick={handleClick}
        >
          {initialImage ? (
            <img 
              src="/サイト開封前航介.jpg" 
              alt="質問箱を開く" 
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="w-full">
              {/* 上部の画像 - 固定表示 */}
              <div className="w-full">
                <img 
                  src="/サイト開封後航介.jpg" 
                  alt="開封後上部" 
                  className="w-full h-auto rounded-t-lg"
                />
              </div>
              
              {/* 下部の画像 - 初期は上部画像の下に表示 */}
              <div 
                className={`w-full transform transition-all duration-1000 ease-out ${
                  animationStep >= 1 ? 'mt-16' : 'mt-0'
                }`}
              >
                <img 
                  src="/サイト開封後の下.jpg" 
                  alt="開封後下部" 
                  className="w-full h-auto rounded-b-lg"
                />
              </div>
              
              {/* 質問ボタン - アニメーション中に表示 */}
              {showQuestionButton && (
                <div 
                  className={`w-full transform transition-all duration-700 ease-out my-4 ${
                    animationStep >= 1 ? 'opacity-100 scale-100 mt-4' : 'opacity-0 scale-0'
                  }`}
                >
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
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {/* ×ボタン - 右上に配置 */}
          <div className="absolute top-0 right-0 z-10">
            <button 
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="閉じる"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* 上部の画像 - 固定表示 */}
          <div className="w-full">
            <img 
              src="/サイト開封後航介.jpg" 
              alt="開封後上部" 
              className="w-full h-auto rounded-t-lg"
            />
          </div>
          
          {/* 質問ボタン - アニメーション中に表示 */}
          {showQuestionButton && (
            <div 
              className={`w-full transform transition-all duration-700 ease-out my-4 ${
                animationStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            >
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
          )}

          {/* 下部の画像 - アニメーションで下に移動 */}
          <div 
            className={`w-full transform transition-all duration-1000 ease-out ${
              animationStep >= 1 ? 'mt-0' : 'mt-0'
            }`}
          >
            <img 
              src="/サイト開封後の下.jpg" 
              alt="開封後下部" 
              className="w-full h-auto rounded-b-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 