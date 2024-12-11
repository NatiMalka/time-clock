import React from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion } from 'framer-motion';
import { AnimatedClock } from './AnimatedClock';

export function Header() {
  const [time, setTime] = React.useState(new Date());
  const { t, language } = useLanguage();

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Clock className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-2xl font-semibold text-gray-900">
              {t('attendanceClock')}
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="flex flex-col items-center">
              <AnimatedClock />
              <p className="text-sm text-gray-500 mt-2">
                {time.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}