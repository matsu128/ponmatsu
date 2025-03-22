import React from 'react';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'error';
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  children,
  className = '',
}) => {
  const variantStyles = {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
    body: 'text-base',
    caption: 'text-sm',
  };

  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    error: 'text-red-600',
  };

  const classes = `${variantStyles[variant]} ${colorStyles[color]} ${className}`;

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
}; 