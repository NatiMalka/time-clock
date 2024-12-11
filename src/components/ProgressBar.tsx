import React from 'react';
import { Clock, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface ProgressBarProps {
  progress: {
    hoursWorked: number;
    progressPercentage: number;
    remainingHours: number;
    estimatedEndTime: Date;
  } | null;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const { t } = useLanguage();

  if (!progress) {
    return null;
  }

  const { hoursWorked, progressPercentage, remainingHours, estimatedEndTime } = progress;

  return (
    <div className="bg-white dark:bg-dark-800/50 rounded-xl shadow-sm p-6 backdrop-blur-sm border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Timer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-dark-50">
            {t('dailyProgress')}
          </h3>
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {hoursWorked.toFixed(1)} / 9.0h
        </div>
      </div>

      <div className="relative h-4 bg-gray-100 dark:bg-dark-700/50 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 ${
            progressPercentage >= 100
              ? 'bg-green-500 dark:bg-green-400'
              : 'bg-indigo-500 dark:bg-indigo-400'
          }`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 mb-1">
            <Clock className="w-4 h-4" />
            {t('remaining')}
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-dark-50">
            {remainingHours.toFixed(1)}h
          </div>
        </div>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 mb-1">
            <Timer className="w-4 h-4" />
            {t('estimatedEnd')}
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-dark-50">
            {estimatedEndTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 