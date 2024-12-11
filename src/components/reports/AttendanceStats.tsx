import React from 'react';
import { TimeLog } from '../../types';
import { Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  calculateOvertime, 
  OVERTIME_WARNING_THRESHOLD, 
  STANDARD_HOURS_PER_DAY 
} from '../../utils/attendanceUtils';
import { Tooltip } from '../ui/Tooltip';

interface AttendanceStatsProps {
  logs: TimeLog[];
}

export function AttendanceStats({ logs }: AttendanceStatsProps) {
  const { t } = useLanguage();
  
  const totalHours = logs.reduce((_, log) => {
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

  const overtimeStats = calculateOvertime(logs);
  const hasOvertimeWarning = overtimeStats.dailyOvertime > OVERTIME_WARNING_THRESHOLD - STANDARD_HOURS_PER_DAY;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('workingHours')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('totalHours')}</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalHours.toFixed(1)}h
            </p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('averageHoursDay')}</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {averageHours.toFixed(1)}h
            </p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('daysPresent')}</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {uniqueDays}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-6 w-6 text-orange-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('overtime')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('dailyOvertime')}</h4>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {overtimeStats.dailyOvertime.toFixed(1)}h
              </p>
              {hasOvertimeWarning && (
                <Tooltip content={t('overtimeWarning')}>
                  <AlertTriangle className="h-5 w-5 text-orange-500 animate-pulse" />
                </Tooltip>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('weeklyOvertime')}</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {overtimeStats.weeklyOvertime.toFixed(1)}h
            </p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('monthlyOvertime')}</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {overtimeStats.monthlyOvertime.toFixed(1)}h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}