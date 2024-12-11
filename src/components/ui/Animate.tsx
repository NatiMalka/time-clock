import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'scale' | 'bounce';

interface AnimateProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  bounce: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.5
      }
    },
    exit: { opacity: 0, scale: 0.95, y: 10 }
  }
};

export function Animate({ 
  children, 
  type = 'fadeIn', 
  delay = 0,
  ...props 
}: AnimateProps) {
  return (
    <motion.div
      {...animations[type]}
      transition={{ duration: 0.2, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
} 