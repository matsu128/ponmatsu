import React, { useState, useEffect, useRef } from 'react';
import { Text } from '../atoms/Text';

interface QuestionBoxProps {
  onQuestionClick: () => void;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({ onQuestionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showQuestionButton, setShowQuestionButton] = useState(false);
  const [initialImage, setInitialImage] = useState(true);
  const [containerHeight, setContainerHeight] = useState('auto');
  const [containerExpanded, setContainerExpanded] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);
  const [smokePhase, setSmokePhase] = useState(0); // 0: 初期, 1: 煙が広がる, 2: 煙が消える
  const contentRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  // コンテンツの高さに基づいて親コンテナの高さを調整
  useEffect(() => {
    if (contentRef.current) {
      const updateHeight = () => {
        const height = contentRef.current?.scrollHeight || 'auto';
        setContainerHeight(`${height}px`);
      };
      
      // アニメーションステップが変わったときに高さを更新
      updateHeight();
    }
  }, [animationStep, isOpen, initialImage]);

  // 拡大後のコンテンツの高さを取得（タップ時に一度だけ実行）
  useEffect(() => {
    if (expandedContentRef.current && containerExpanded) {
      const height = expandedContentRef.current.scrollHeight;
      setContainerHeight(`${height}px`);
    }
  }, [containerExpanded]);

  const handleClick = () => {
    // 画像切り替えアニメーションを開始
    setImageTransition(true);
    
    // 煙が広がるフェーズ
    setTimeout(() => {
      setSmokePhase(1);
      
      // 煙が消えるフェーズ
      setTimeout(() => {
        setSmokePhase(2);
        
        // 煙が消えた後に初期画像を非表示に
        setTimeout(() => {
          setInitialImage(false);
          
          // 親コンテナを先に拡大
          setContainerExpanded(true);
          
          // 親コンテナの拡大が完了してから開封アニメーションを開始
          setTimeout(() => {
            setIsOpen(true);
            
            // さらに遅延させてからスライドアニメーションを開始
            setTimeout(() => {
              setAnimationStep(1);
              // 質問ボタンを表示（スライドアニメーションと同時に）
              setShowQuestionButton(true);
            }, 500); // 開封アニメーションが完了するのを待つ
          }, 500); // 親コンテナの拡大が完了するのを待つ
        }, 800); // 煙が消えるのを待つ
      }, 800); // 煙が広がるのを待つ
    }, 300); // 初期画像が消えるのを待つ
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
        setContainerExpanded(false);
        setImageTransition(false);
        setSmokePhase(0);
      }, 2000); // スライドアニメーションの時間と同じ
    }, 100);
  };

  return (
    <div 
      className="relative bg-white rounded-lg p-3 overflow-hidden"
      style={{ 
        height: containerHeight,
        transition: 'height 500ms ease-in-out'
      }}
    >
      {!isOpen ? (
        <div 
          className="cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center justify-center"
          onClick={handleClick}
        >
          {initialImage ? (
            <div className="relative w-full">
              {/* 初期画像 - 煙のように消えていく */}
              <div 
                className={`w-full transform transition-all duration-300 ease-in-out ${
                  imageTransition ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                }`}
              >
                <img 
                  src="/サイト開封前航介.jpg" 
                  alt="質問箱を開く" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              {/* 白い煙のエフェクト */}
              <div 
                className={`absolute top-0 left-0 w-full h-full transform transition-all duration-800 ease-in-out ${
                  smokePhase >= 1 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0) 70%)',
                  filter: 'blur(20px)',
                  transform: smokePhase >= 1 ? 'scale(1.2)' : 'scale(0.8)',
                  zIndex: 10
                }}
              />
              
              {/* 開封後画像 - 煙が消えた後に現れる */}
              <div 
                className={`absolute top-0 left-0 w-full transform transition-all duration-800 ease-in-out ${
                  smokePhase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  zIndex: 20
                }}
              >
                <img 
                  src="/サイト開封後航介.jpg" 
                  alt="開封後上部" 
                  className="w-full h-auto rounded-t-lg"
                />
              </div>
            </div>
          ) : (
            <div className="w-full" ref={contentRef}>
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
                className={`w-full transform transition-all duration-2000 ease-in-out ${
                  animationStep >= 1 ? 'translate-y-8' : 'translate-y-0'
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
                  className={`w-full transform transition-all duration-2000 ease-in-out my-4 ${
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
        <div className="relative" ref={contentRef}>
          {/* 拡大後のコンテンツの高さを計測するための非表示要素 */}
          <div 
            ref={expandedContentRef} 
            className="absolute top-0 left-0 w-full opacity-0 pointer-events-none"
            style={{ visibility: 'hidden' }}
          >
            <div className="w-full">
              <img 
                src="/サイト開封後航介.jpg" 
                alt="開封後上部" 
                className="w-full h-auto rounded-t-lg"
              />
            </div>
            <div className="w-full mt-8">
              <img 
                src="/サイト開封後の下.jpg" 
                alt="開封後下部" 
                className="w-full h-auto rounded-b-lg"
              />
            </div>
            {showQuestionButton && (
              <div className="w-full my-4 mt-4">
                <div className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                    <Text variant="body" className="text-sm font-medium text-gray-600">
                      質問する
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </div>
          
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
              className={`w-full transform transition-all duration-2000 ease-in-out my-4 ${
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
            className={`w-full transform transition-all duration-2000 ease-in-out ${
              animationStep >= 1 ? 'translate-y-8' : 'translate-y-0'
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