import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center 
    rounded-full font-medium 
    transition-all duration-300
    focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-offset-2 focus-visible:ring-indigo-500 
    disabled:opacity-50
    relative overflow-hidden
    hover:shadow-lg hover:-translate-y-1
    active:translate-y-0
    before:absolute before:inset-0
    before:transition-transform before:duration-300
    before:rounded-full before:opacity-0
    hover:before:opacity-90
    before:scale-0 hover:before:scale-100
    after:absolute after:inset-0
    after:bg-gradient-to-r after:from-transparent 
    after:via-white/20 after:to-transparent
    after:translate-x-[-150%] after:skew-x-[-25deg]
    hover:after:translate-x-[150%]
    after:transition-transform after:duration-700
    after:ease-out
  `;
  
  const variants = {
    primary: `
      bg-indigo-600 dark:bg-indigo-500 
      text-white 
      before:bg-indigo-700/90 dark:before:bg-indigo-400/90
      shadow-indigo-500/30
      hover:shadow-indigo-500/40
    `,
    secondary: `
      bg-gray-100 dark:bg-dark-700 
      text-gray-900 dark:text-dark-50 
      before:bg-gray-200/90 dark:before:bg-dark-600/90
      shadow-gray-500/20
      hover:shadow-gray-500/30
    `,
    outline: `
      border border-gray-300 dark:border-dark-600 
      bg-white dark:bg-dark-800 
      text-gray-700 dark:text-dark-200
      before:bg-gray-100/90 dark:before:bg-dark-700/90
      shadow-gray-500/20
      hover:shadow-gray-500/30
    `,
    ghost: `
      text-gray-700 dark:text-dark-200
      before:bg-gray-100/90 dark:before:bg-dark-700/90
      hover:shadow-none
    `
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}