'use client';

import React from 'react';
import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  objectFit?: 'contain' | 'cover';
  priority?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-${objectFit}`}
        priority={priority}
      />
    </div>
  );
}; 