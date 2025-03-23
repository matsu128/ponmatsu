'use client';

import React from 'react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onLoginClick,
  isLoggedIn = false,
}) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Text 
          variant="h1" 
          className="text-lg sm:text-xl font-bold !text-primary-600"
        >
          {title}
        </Text>
      </Link>
      <Button
        variant="primary"
        size="small"
        onClick={onLoginClick}
        className="text-sm sm:text-base"
      >
        {isLoggedIn ? 'ログアウト' : 'ログイン'}
      </Button>
    </header>
  );
}; 