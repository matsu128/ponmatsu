'use client';

import { FanSiteTemplate } from './FanSiteTemplate';

interface FanSiteWrapperProps {
  title: string;
  navItems: Array<{ label: string; href: string }>;
  newsItems: Array<{
    id: string;
    title: string;
    date: string;
    content: string;
  }>;
  rankingItems: Array<{
    id: string;
    title: string;
    votes: number;
    hasVoted: boolean;
  }>;
}

export const FanSiteWrapper: React.FC<FanSiteWrapperProps> = ({
  title,
  navItems,
  newsItems,
  rankingItems,
}) => {
  const handleNewsClick = (id: string) => {
    console.log('News clicked:', id);
  };

  const handleVoteClick = (id: string) => {
    console.log('Vote clicked:', id);
  };

  const handleIdeaSubmit = (data: { title: string; description: string }) => {
    console.log('Idea submitted:', data);
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  return (
    <FanSiteTemplate
      title={title}
      navItems={navItems}
      newsItems={newsItems}
      rankingItems={rankingItems}
      onNewsClick={handleNewsClick}
      onVoteClick={handleVoteClick}
      onIdeaSubmit={handleIdeaSubmit}
      _onLoginClick={handleLoginClick}
    />
  );
}; 