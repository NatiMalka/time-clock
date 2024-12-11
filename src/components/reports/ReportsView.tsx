import React from 'react';
import { TimeLog } from '../../types';
import { AttendanceStats } from './AttendanceStats';
import { DailyReport } from './DailyReport';
//import { useLanguage } from '../../contexts/LanguageContext';
import { Skeleton } from '../ui/Skeleton';

interface ReportsViewProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
  onDeleteLog: (logId: string) => void;
  isLoading?: boolean;
}
export function ReportsView({ logs, onUpdateLog, onDeleteLog, isLoading = false }: ReportsViewProps) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-dark-800 p-4 rounded-lg">
              <div className="mb-4">
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-dark-700/50 rounded-lg">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="p-3 bg-gray-50 dark:bg-dark-700/50 rounded-lg">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AttendanceStats logs={logs} />
      <DailyReport 
        logs={logs} 
        onUpdateLog={onUpdateLog}
        onDeleteLog={onDeleteLog}
      />
    </div>
  );
}