import React from 'react';
import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ClockConfirmDialog } from './ClockConfirmDialog';

interface ClockButtonProps {
  type: 'in' | 'out';
  onClick: () => void;
}

export function ClockButton({ type, onClick }: ClockButtonProps) {
  const { t } = useLanguage();
  const [showConfirm, setShowConfirm] = React.useState(false);
  
  const bgColor = type === 'in' ? 'bg-indigo-600/90' : 'bg-rose-600/90';
  const hoverColor = type === 'in' ? 'hover:bg-indigo-700/95' : 'hover:bg-rose-700/95';
  const glowColor = type === 'in' ? 'shadow-indigo-500/50' : 'shadow-rose-500/50';

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowConfirm(true)}
        className={`
          ${bgColor} 
          ${hoverColor} 
          relative w-48 h-48 
          rounded-full 
          flex flex-col items-center justify-center 
          text-white 
          transition-all duration-300
          backdrop-blur-sm
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          ${glowColor}
          before:absolute
          before:inset-0
          before:rounded-full
          before:bg-gradient-to-b
          before:from-white/10
          before:to-transparent
          before:backdrop-blur-sm
          overflow-hidden
        `}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-white/10"
        />
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50" />
        
        <motion.div className="relative flex flex-col items-center">
          <Timer className="w-12 h-12 mb-2" />
          <span className="text-xl font-semibold">
            {t(type === 'in' ? 'clockIn' : 'clockOut')}
          </span>
        </motion.div>
      </motion.button>

      <ClockConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={onClick}
        type={type}
      />
    </>
  );
}