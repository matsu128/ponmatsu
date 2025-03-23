'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LoginForm } from './LoginForm';

interface HeaderNavProps {
  title: string;
  _navItems: Array<{ label: string; href: string }>;
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  title,
  _navItems,
  onLoginClick,
  isLoggedIn,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    console.log('Login submitted:', data);
    setShowLoginModal(false);
    onLoginClick?.();
  };

  const handleSnsLogin = (provider: 'line' | 'x') => {
    console.log('SNS Login:', provider);
    setShowLoginModal(false);
    onLoginClick?.();
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* ロゴ/タイトル */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-lg font-bold text-primary-600">
                {title}
              </Link>
            </div>
          </div>

          {/* 右側のナビゲーション */}
          <div className="flex items-center">
            <button
              onClick={() => isLoggedIn ? onLoginClick?.() : setShowLoginModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md whitespace-nowrap"
            >
              {isLoggedIn ? 'ログアウト' : 'ログイン'}
            </button>
          </div>
        </div>
      </nav>

      {/* ログインモーダル */}
      <LoginForm
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSubmit={handleLoginSubmit}
        onSnsLogin={handleSnsLogin}
      />
    </header>
  );
}; 