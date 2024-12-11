import React from 'react';
import { TimeLog } from '../types';
import { Trash2, ChevronRight } from 'lucide-react';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Skeleton } from './ui/Skeleton';
import { Tooltip } from './ui/Tooltip';

interface AttendanceLogProps {
  logs: TimeLog[];
  onDelete: (logId: string) => void;
  isLoading?: boolean;
}

export function AttendanceLog({ logs, onDelete, isLoading = false }: AttendanceLogProps) {
  const { t, language } = useLanguage();
  const [deleteLogId, setDeleteLogId] = React.useState<string | null>(null);
  const [expandedDate, setExpandedDate] = React.useState<string | null>(null);

  const handleDelete = (logId: string) => {
    setDeleteLogId(logId);
  };

  const handleConfirmDelete = () => {
    if (deleteLogId) {
      onDelete(deleteLogId);
      setDeleteLogId(null);
    }
  };

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      })
    };
  };

  // Group logs by date
  const groupedLogs = logs.reduce((groups, log) => {
    const date = new Date(log.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {} as Record<string, TimeLog[]>);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <Skeleton className="h-7 w-48" />
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">{t('recentActivity')}</h3>
        </div>
        <AnimatePresence>
          <div className="divide-y divide-gray-200">
            {Object.entries(groupedLogs).map(([date, dateLogs]) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-gray-100"
              >
                <button
                  onClick={() => setExpandedDate(expandedDate === date ? null : date)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between group"
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    {new Date(date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h4>
                  <motion.div
                    animate={{ rotate: expandedDate === date ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedDate === date && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {dateLogs.map((log) => {
                        const { time } = formatDateTime(new Date(log.timestamp));
                        return (
                          <motion.li
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="px-4 py-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {log.type === 'clock-in' ? t('clockedIn') : t('clockedOut')}
                                </p>
                                <p className="text-sm text-gray-500">{t('mainOffice')}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <p className="text-sm text-gray-500">{time}</p>
                                <Tooltip content={t('deleteEntryTooltip', 'Delete this time entry')}>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDelete(log.id)}
                                    className="text-gray-400 hover:text-rose-600 transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </motion.button>
                                </Tooltip>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <ConfirmDialog
        isOpen={deleteLogId !== null}
        onClose={() => setDeleteLogId(null)}
        onConfirm={handleConfirmDelete}
        title={t('deleteEntry')}
        message={t('deleteConfirmation')}
      />
    </>
  );
}