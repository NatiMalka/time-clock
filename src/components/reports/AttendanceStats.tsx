import React from 'react';
import { TimeLog } from '../../types';
import { Clock, BarChart2, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AttendanceStatsProps {
  logs: TimeLog[];
}

export function AttendanceStats({ logs }: AttendanceStatsProps) {
  const { t } = useLanguage();
  
  const totalHours = logs.reduce((total, log) => {
    const clockInLogs = logs.filter(l => l.type === 'clock-in');
    const clockOutLogs = logs.filter(l => l.type === 'clock-out');
    
    let hours = 0;
    clockInLogs.forEach(clockIn => {
      const clockOut = clockOutLogs.find(out => 
        new Date(out.timestamp).toDateString() === new Date(clockIn.timestamp).toDateString()
      );
      if (clockOut) {
        hours += (new Date(clockOut.timestamp).getTime() - new Date(clockIn.timestamp).getTime()) / (1000 * 60 * 60);
      }
    });
    
    return hours;
  }, 0);

  const uniqueDays = new Set(logs.map(log => 
    new Date(log.timestamp).toDateString()
  )).size;

  const averageHours = uniqueDays > 0 ? totalHours / uniqueDays : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 p-6 rounded-lg shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('totalHours')}
          </h3>
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {totalHours.toFixed(1)}
        </p>
      </div>

      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 p-6 rounded-lg shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <BarChart2 className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('averageHoursDay')}
          </h3>
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {averageHours.toFixed(1)}
        </p>
      </div>

      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 p-6 rounded-lg shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('daysPresent')}
          </h3>
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {uniqueDays}
        </p>
      </div>
    </div>
  );
}