import React, { useEffect, useRef, useState } from 'react';
import { formatDateTimeLocal } from '../utils/dateUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import { X } from 'lucide-react';

export function DateTimeEditor({ value, onChange, onClose }: DateTimeEditorProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // If there's not enough space below (less than 300px) and more space above
      if (spaceBelow < 300 && spaceAbove > spaceBelow) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`
        absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
        left-0 right-0 p-4 
        bg-white dark:bg-dark-800 
        rounded-lg shadow-lg 
        border border-gray-200 dark:border-dark-700 
        z-10
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-dark-50">
          {t('editTime')}
        </h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-dark-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <input
        type="datetime-local"
        value={formatDateTimeLocal(value)}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="w-full px-3 py-2 mb-4
                 border border-gray-300 dark:border-dark-600 rounded-md 
                 text-gray-900 dark:text-dark-50 
                 bg-white dark:bg-dark-800
                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                 focus:border-indigo-500 dark:focus:border-indigo-400"
      />
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button variant="primary" size="sm" onClick={onClose}>
          {t('save')}
        </Button>
      </div>
    </div>
  );
} 