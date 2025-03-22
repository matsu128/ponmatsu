import React from 'react';
import {
  HeartIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export type IconName = 'heart' | 'star' | 'chat' | 'edit' | 'trash';

interface IconProps {
  name: IconName;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const icons = {
    heart: HeartIcon,
    star: StarIcon,
    chat: ChatBubbleLeftIcon,
    edit: PencilSquareIcon,
    trash: TrashIcon,
  };

  const IconComponent = icons[name];

  return (
    <IconComponent className={`${sizeClasses[size]} ${className}`} />
  );
}; 