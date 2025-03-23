'use client';

import React from 'react';
import { HeaderNav } from '../organisms/HeaderNav';

interface AdminTemplateProps {
  title: string;
  navItems: Array<{ label: string; href: string }>;
  children: React.ReactNode;
}

export const AdminTemplate: React.FC<AdminTemplateProps> = ({
  title,
  navItems,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav
        title={title}
        _navItems={navItems}
        onLoginClick={() => {}}
        isLoggedIn={true}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 