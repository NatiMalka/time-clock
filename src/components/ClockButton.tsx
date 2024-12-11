import React from 'react';
import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClockButtonProps {
  type: 'in' | 'out';
  onClick: () => void;
}

export function ClockButton({ type, onClick }: ClockButtonProps) {
  const bgColor = type === 'in' ? 'bg-indigo-600' : 'bg-rose-600';
  const hoverColor = type === 'in' ? 'hover:bg-indigo-700' : 'hover:bg-rose-700';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${bgColor} ${hoverColor} relative w-48 h-48 rounded-full flex flex-col items-center justify-center text-white transition-colors duration-200 shadow-lg`}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-4 border-white/10"
      />
      <motion.div className="relative flex flex-col items-center">
        <Timer className="w-12 h-12 mb-2" />
        <span className="text-xl font-semibold">Clock {type.toUpperCase()}</span>
      </motion.div>
    </motion.button>
  );
}