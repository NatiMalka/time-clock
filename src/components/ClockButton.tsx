import React from 'react';
import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ClockConfirmDialog } from './ClockConfirmDialog';
import { Tooltip } from './ui/Tooltip';

interface ClockButtonProps {
  type: 'in' | 'out';
  onClick: () => void;
}

export function ClockButton({ type, onClick }: ClockButtonProps) {
  const { t } = useLanguage();
  const [showConfirm, setShowConfirm] = React.useState(false);
  
  const baseColor = type === 'in' ? 'indigo' : 'rose';
  
  const tooltipContent = type === 'in' 
    ? t('clockInTooltip', 'Record your arrival time')
    : t('clockOutTooltip', 'Record your departure time');

  return (
    <>
      <Tooltip content={tooltipContent}>
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95, y: 0 }}
          onClick={() => setShowConfirm(true)}
          className={`
            relative w-48 h-48 
            rounded-full 
            flex flex-col items-center justify-center 
            text-white 
            overflow-hidden
            transition-all duration-300
            bg-${baseColor}-600 dark:bg-${baseColor}-500
            shadow-lg shadow-${baseColor}-500/30
            hover:shadow-xl hover:shadow-${baseColor}-500/40
            before:absolute before:inset-0 
            before:bg-${baseColor}-700/90 dark:before:bg-${baseColor}-400/90
            before:rounded-full before:opacity-0
            before:scale-0 hover:before:scale-100
            hover:before:opacity-90
            before:transition-all before:duration-300
            after:absolute after:inset-0
            after:bg-gradient-to-r 
            after:from-transparent after:via-white/20 after:to-transparent
            after:translate-x-[-150%] after:skew-x-[-25deg]
            hover:after:translate-x-[150%]
            after:transition-transform after:duration-700
            after:ease-out
          `}
        >
          <div className="relative z-10 flex flex-col items-center">
            <Timer className="w-12 h-12 mb-2" />
            <span className="text-xl font-semibold">
              {t(type === 'in' ? 'clockIn' : 'clockOut')}
            </span>
          </div>
        </motion.button>
      </Tooltip>

      <ClockConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={onClick}
        type={type}
      />
    </>
  );
}