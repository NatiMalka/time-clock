import React from 'react';
import { TimeLog } from '../../types';
import { calculateDailyStats } from '../../utils/attendanceUtils';
import { formatDate } from '../../utils/dateUtils';
//import { Card, CardHeader, CardContent } from '../ui/Card';
import { DateTimeEditor } from './DateTimeEditor';
import { Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface DailyReportProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
  onDeleteLog: (logId: string) => void;
}

export function DailyReport({ logs, onUpdateLog, onDeleteLog }: DailyReportProps) {
  const { t, language } = useLanguage();
  const [editingLog, setEditingLog] = React.useState<{
    date: Date;
    type: 'clock-in' | 'clock-out';
  } | null>(null);

  const dailyStats = calculateDailyStats(logs);

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('dailyReports')}
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-dark-700">
          {dailyStats.map(day => (
            <div key={day.date.toISOString()} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-dark-300">
                  {formatDate(day.date, 'full')}
                </h4>
                <span className="text-sm text-gray-500 dark:text-dark-300">
                  {t('totalHours')}: {day.hoursWorked.toFixed(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700/50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-300">{t('clockIn')}</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-dark-50">
                        {day.clockIn ? formatDate(day.clockIn) : '-'}
                      </p>
                    </div>
                    {day.clockIn && (
                      <button
                        onClick={() => setEditingLog({
                          date: day.date,
                          type: 'clock-in'
                        })}
                        className="p-1 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {editingLog?.date.toDateString() === day.date.toDateString() && 
                     editingLog.type === 'clock-in' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 z-10"
                      >
                        <DateTimeEditor
                          value={day.clockIn!}
                          onChange={(newTime) => onUpdateLog(day.date, 'clock-in', newTime)}
                          onClose={() => setEditingLog(null)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700/50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-300">{t('clockOut')}</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-dark-50">
                        {day.clockOut ? formatDate(day.clockOut) : '-'}
                      </p>
                    </div>
                    {day.clockOut && (
                      <button
                        onClick={() => setEditingLog({
                          date: day.date,
                          type: 'clock-out'
                        })}
                        className="p-1 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {editingLog?.date.toDateString() === day.date.toDateString() && 
                     editingLog.type === 'clock-out' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 z-10"
                      >
                        <DateTimeEditor
                          value={day.clockOut!}
                          onChange={(newTime) => onUpdateLog(day.date, 'clock-out', newTime)}
                          onClose={() => setEditingLog(null)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}