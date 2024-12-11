import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';

interface ClockConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'in' | 'out';
}

export function ClockConfirmDialog({ isOpen, onClose, onConfirm, type }: ClockConfirmDialogProps) {
  const { t } = useLanguage();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-md mx-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${type === 'in' ? 'bg-indigo-100/80' : 'bg-rose-100/80'}`}>
                    <Timer className={`w-6 h-6 ${type === 'in' ? 'text-indigo-600' : 'text-rose-600'}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t(type === 'in' ? 'confirmClockIn' : 'confirmClockOut')}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-8 text-base leading-relaxed">
                {t(type === 'in' ? 'clockInMessage' : 'clockOutMessage')}
              </p>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="px-5"
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-6 ${
                    type === 'in' 
                      ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
                      : 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
                  }`}
                >
                  {t(type === 'in' ? 'clockIn' : 'clockOut')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 