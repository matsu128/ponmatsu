'use client';

import { FanAdminTemplate } from './FanAdminTemplate';

interface FanAdminWrapperProps {
  title: string;
  navItems: Array<{ label: string; href: string }>;
  newsItems: Array<{
    id: string;
    title: string;
    date: string;
    content: string;
  }>;
}

export const FanAdminWrapper: React.FC<FanAdminWrapperProps> = ({
  title,
  navItems,
  newsItems,
}) => {
  const handleNewsCreate = (data: { title: string; content: string }) => {
    console.log('News created:', data);
  };

  const handleNewsEdit = (id: string, data: { title: string; content: string }) => {
    console.log('News edited:', id, data);
  };

  const handleNewsDelete = (id: string) => {
    console.log('News deleted:', id);
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  return (
    <FanAdminTemplate
      title={title}
      _navItems={navItems}
      newsItems={newsItems}
      onNewsCreate={handleNewsCreate}
      onNewsEdit={handleNewsEdit}
      onNewsDelete={handleNewsDelete}
      onLoginClick={handleLoginClick}
      isLoggedIn={true}
    />
  );
}; 