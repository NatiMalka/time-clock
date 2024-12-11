import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
      className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow transition-all duration-200"
    >
      <Languages className="w-4 h-4 text-indigo-600" />
      <span className="text-sm font-medium text-gray-700">
        {language === 'en' ? 'EN' : 'עב'}
      </span>
    </motion.button>
  );
} 