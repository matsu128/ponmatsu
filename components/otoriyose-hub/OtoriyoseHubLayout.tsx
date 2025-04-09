import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface OtoriyoseHubLayoutProps {
  children: React.ReactNode;
}

export const OtoriyoseHubLayout: React.FC<OtoriyoseHubLayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
}; 