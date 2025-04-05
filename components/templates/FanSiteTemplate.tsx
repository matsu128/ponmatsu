'use client';

import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../organisms/HeaderNav';
import { NewsList } from '../organisms/NewsList';
import { RankingList } from '../organisms/RankingList';
import { IdeaPostForm } from '../organisms/IdeaPostForm';
import { Modal } from '../molecules/Modal';
import { Text } from '../atoms/Text';
import { SocialLinks } from '../molecules/SocialLinks';
import { QuestionBox } from '../organisms/QuestionBox';
import { QuestionForm } from '../organisms/QuestionForm';

interface FanSiteTemplateProps {
  title: string;
  navItems: Array<{ label: string; href: string }>;
  newsItems: Array<{ id: string; title: string; date: string; content: string }>;
  rankingItems: Array<{
    id: string;
    title: string;
    votes: number;
    hasVoted: boolean;
    description?: string;
  }>;
  onNewsClick?: (id: string) => void;
  onVoteClick?: (id: string) => void;
  _onLoginClick?: () => void;
  isLoggedIn?: boolean;
  onIdeaSubmit?: (data: { title: string; description: string }) => void;
  onQuestionSubmit?: (data: { category: string; question: string }) => void;
}

export const FanSiteTemplate: React.FC<FanSiteTemplateProps> = ({
  title,
  navItems,
  newsItems,
  rankingItems,
  onNewsClick,
  onVoteClick,
  _onLoginClick,
  isLoggedIn,
  onIdeaSubmit,
  onQuestionSubmit,
}) => {
  // モーダルの状態管理
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedNews, setSelectedNews] = useState<{
    id: string;
    title: string;
    date: string;
    content: string;
  } | null>(null);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [selectedRanking, setSelectedRanking] = useState<{
    id: string;
    title: string;
    votes: number;
    hasVoted: boolean;
    description?: string;
  } | null>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  // 表示件数の状態管理
  const [newsDisplayCount, setNewsDisplayCount] = useState(2);
  const [rankingDisplayCount, setRankingDisplayCount] = useState(3);

  // スクロール位置の監視
  useEffect(() => {
    const handleScroll = () => {
      const categoryNav = document.getElementById('category-nav');
      if (categoryNav) {
        const categoryNavPosition = categoryNav.getBoundingClientRect().top;
        setShowScrollTop(categoryNavPosition < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ニュースモーダルを開く
  const handleNewsClick = (id: string) => {
    const newsItem = newsItems.find(item => item.id === id);
    if (newsItem) {
      setSelectedNews(newsItem);
      setShowNewsModal(true);
    }
    onNewsClick?.(id);
  };

  // アイディアを投稿
  const handleIdeaSubmit = (data: { title: string; description: string }) => {
    onIdeaSubmit?.(data);
    setShowIdeaModal(false);
  };

  // もっと見るボタンのクリックハンドラ
  const handleShowMoreNews = () => {
    setNewsDisplayCount(prev => Math.min(prev + 10, newsItems.length));
  };

  const handleShowMoreRankings = () => {
    setRankingDisplayCount(prev => Math.min(prev + 10, rankingItems.length));
  };

  const handleRankingClick = (id: string) => {
    const rankingItem = rankingItems.find(item => item.id === id);
    if (rankingItem) {
      setSelectedRanking(rankingItem);
      setShowRankingModal(true);
    }
  };

  // 質問フォームの送信ハンドラ
  const handleQuestionSubmit = (data: { category: string; question: string }) => {
    onQuestionSubmit?.(data);
  };

  return (
    <>
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(/)'
        }}
      >
        {/* メインコンテンツ */}
        <HeaderNav
          title={title}
          _navItems={navItems}
          onLoginClick={() => setShowLoginModal(true)}
          isLoggedIn={isLoggedIn}
        />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* SNSリンクエリア */}
            <div className="lg:col-span-12 mb-2">
              <SocialLinks />
            </div>

            {/* ニュースエリア */}
            <div className="lg:col-span-7">
              <div className="backdrop-blur-[2px] bg-white/15 rounded-lg shadow-lg p-3">
                <div className="mb-2">
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    <div className="col-span-5 flex justify-center">
                      <Text 
                        variant="h2" 
                        className="text-base sm:text-lg lg:text-xl font-bold text-primary-600 truncate"
                      >
                        ぽんまつニュース
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                    {newsItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="border-b border-gray-100 last:border-0 pb-1.5 last:pb-0 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => handleNewsClick(item.id)}
                      >
                        <Text variant="body" className="text-sm text-gray-900">
                          {item.title}
                        </Text>
                        <Text variant="caption" className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString('ja-JP')}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* カテゴリーナビゲーション */}
            <div id="category-nav" className="lg:col-span-5 mb-6">
              <div className="backdrop-blur-[2px] bg-white/15 rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <div className="relative flex justify-end items-center">
                    <div className="absolute inset-x-0 flex justify-center">
                      <Text 
                        variant="h2" 
                        className="text-lg sm:text-xl font-bold text-primary-600"
                      >
                        カテゴリー
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        const element = document.getElementById('voting-box');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-1.5 px-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/80 hover:bg-white hover:shadow-sm transition-all duration-200 group"
                    >
                      <Text variant="body" className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                        投票箱
                      </Text>
                    </button>
                    <Text variant="caption" className="text-xs text-gray-500 text-center">
                      人気ランキングに投票
                    </Text>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        const element = document.getElementById('question-box');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-1.5 px-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/80 hover:bg-white hover:shadow-sm transition-all duration-200 group"
                    >
                      <Text variant="body" className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                        質問箱
                      </Text>
                    </button>
                    <Text variant="caption" className="text-xs text-gray-500 text-center">
                      ぽんまつに質問
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* 右サイドエリア */}
            <div className="lg:col-span-5 space-y-6 mb-12">
              {/* 投票箱 */}
              <div id="voting-box" className="backdrop-blur-[2px] bg-white/15 rounded-lg shadow-lg p-3">
                <div className="mb-4">
                  <div className="relative flex justify-end items-center mb-2">
                    <div className="absolute inset-x-0 flex justify-center">
                      <Text 
                        variant="h2" 
                        className="text-lg sm:text-xl font-bold text-primary-600"
                      >
                        投票箱
                      </Text>
                    </div>
                    <div className="flex items-center z-10">
                      <div className="px-2 py-0.5 bg-primary-100 rounded-full">
                        <Text 
                          variant="caption" 
                          color="primary" 
                          className="text-xs font-medium"
                        >
                          {rankingDisplayCount}/{rankingItems.length}
                        </Text>
                      </div>
                      {rankingDisplayCount > 3 && (
                        <button
                          onClick={() => setRankingDisplayCount(3)}
                          className="ml-2 group p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Text 
                      variant="caption" 
                      color="primary" 
                      className="text-xs tracking-wider font-light text-primary-500"
                    >
                      3/1から3/31まで！
                    </Text>
                  </div>
                </div>
                <RankingList
                  _title="人気ランキング"
                  items={[...rankingItems]
                    .sort((a, b) => b.votes - a.votes)
                    .slice(0, rankingDisplayCount)}
                  _onVoteClick={onVoteClick}
                  onItemClick={handleRankingClick}
                />
                {rankingDisplayCount < rankingItems.length ? (
                  <div className="mt-6">
                    <div className="relative flex items-center justify-center">
                      <button
                        onClick={handleShowMoreRankings}
                        className="group relative py-3 transition-all duration-500"
                      >
                        {rankingDisplayCount <= 3 && (
                          <>
                            <div className="absolute inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-x-0 bottom-0 h-[0.5px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </>
                        )}
                        <div className="flex items-center justify-center">
                          <span className="text-sm font-light tracking-wider text-gray-500 group-hover:text-gray-700 transition-colors duration-500">
                            もっと見る
                          </span>
                        </div>
                      </button>
                      {rankingDisplayCount > 3 && (
                        <button
                          onClick={() => setRankingDisplayCount(3)}
                          className="absolute right-0 group p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="relative flex items-center justify-center">
                      <button
                        onClick={() => setRankingDisplayCount(3)}
                        className="absolute right-0 group p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 質問箱 */}
              <div id="question-box" className="backdrop-blur-[2px] bg-white/15 rounded-lg shadow-lg p-3">
                <div className="mb-4">
                  <div className="relative flex justify-end items-center mb-2">
                    <div className="absolute inset-x-0 flex justify-center">
                      <Text 
                        variant="h2" 
                        className="text-lg sm:text-xl font-bold text-primary-600"
                      >
                        質問箱
                      </Text>
                    </div>
                  </div>
                </div>
                <QuestionBox onQuestionClick={() => setShowQuestionModal(true)} />
              </div>

              {/* アイディア投稿ボタン */}
              <div className="backdrop-blur-[2px] bg-white/15 rounded-lg shadow-lg p-6">
                <button
                  onClick={() => setShowIdeaModal(true)}
                  className="w-full px-4 py-2.5 text-sm font-light tracking-wider text-white/90 bg-primary-500/90 hover:bg-primary-500 rounded-lg transition-all duration-500 shadow-sm hover:shadow-md"
                >
                  アイディアを投稿する
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* トップへ戻るボタン */}
        <div
          className={`fixed right-4 bottom-4 z-50 transform transition-all duration-300 ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <button
            onClick={scrollToTop}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/80 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group"
          >
            <svg
              className="w-4 h-4 text-gray-600 group-hover:text-primary-600 transform group-hover:-translate-y-0.5 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>

      {/* モーダル（ルートレベルで表示） */}
      {/* ログインモーダル */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <div className="p-4">
          <p>ログインフォームがここに表示されます</p>
          <button
            onClick={() => setShowLoginModal(false)}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            閉じる
          </button>
        </div>
      </Modal>

      {/* ニュースモーダル */}
      <Modal
        isOpen={showNewsModal}
        onClose={() => setShowNewsModal(false)}
        title={null}
      >
        {selectedNews && (
          <div className="space-y-6 p-4">
            {/* 日付とタイトル */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center">
                <span className="px-4 py-1.5 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600 text-sm font-medium rounded-full shadow-sm">
                  {selectedNews.date}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
                {selectedNews.title}
              </h3>
            </div>
            
            {/* コンテンツ */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="prose prose-lg max-w-none">
                <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                  {selectedNews.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* アイディア投稿フォーム */}
      <IdeaPostForm
        isOpen={showIdeaModal}
        onClose={() => setShowIdeaModal(false)}
        onSubmit={handleIdeaSubmit}
      />

      {/* ランキング詳細モーダル */}
      <Modal
        isOpen={showRankingModal}
        onClose={() => setShowRankingModal(false)}
        title={null}
      >
        {selectedRanking && (
          <div className="space-y-6 p-4">
            {/* ランク表示 */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-100 rounded-full">
              <span className="text-primary-600 font-bold text-2xl">
                {[...rankingItems]
                  .sort((a, b) => b.votes - a.votes)
                  .findIndex(item => item.id === selectedRanking.id) + 1}
                <span className="text-lg">位</span>
              </span>
            </div>

            {/* タイトル */}
            <h3 className="text-xl sm:text-2xl font-medium text-gray-900 text-center mt-4">
              {selectedRanking.title}
            </h3>

            {/* 投票数 */}
            <div className="flex items-center justify-center space-x-2 py-2">
              <span className="text-sm font-light text-gray-500">現在の投票数</span>
              <span className="text-lg font-medium text-primary-500">{selectedRanking.votes}</span>
            </div>
            
            {/* 説明文 */}
            <div className="prose max-w-none text-gray-600 border-t border-gray-100 pt-6">
              <p className="text-base leading-relaxed">
                {selectedRanking.description || `「${selectedRanking.title}」の詳細な説明がここに表示されます。`}
              </p>
            </div>

            {/* アクションボタン */}
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  onVoteClick?.(selectedRanking.id);
                  setShowRankingModal(false);
                }}
                disabled={selectedRanking.hasVoted}
                className={`w-full px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedRanking.hasVoted
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg'
                }`}
              >
                <span className="text-sm font-light tracking-wider">
                  {selectedRanking.hasVoted ? '投票済み' : '投票する'}
                </span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* 質問フォームモーダル */}
      <QuestionForm
        isOpen={showQuestionModal}
        onClose={() => setShowQuestionModal(false)}
        onSubmit={handleQuestionSubmit}
      />
    </>
  );
}; 