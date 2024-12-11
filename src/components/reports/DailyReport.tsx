import React from 'react';
import { TimeLog } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { EditableDateTimeCell } from './EditableDateTimeCell';
import { Clock, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { STANDARD_HOURS_PER_DAY } from '../../utils/attendanceUtils';

interface DailyReportProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
}

interface DayStats {
  date: Date;
  clockIn: Date | null;
  clockOut: Date | null;
  hoursWorked: number;
  hoursDeficit: number;
}

export default function DailyReport({ logs, onUpdateLog }: DailyReportProps) {
  const { t } = useLanguage();

  const calculateDailyStats = (): DayStats[] => {
    const dailyLogs = new Map<string, TimeLog[]>();
    
    logs.forEach(log => {
      const date = new Date(log.timestamp).toDateString();
      if (!dailyLogs.has(date)) {
        dailyLogs.set(date, []);
      }
      dailyLogs.get(date)?.push(log);
    });

    return Array.from(dailyLogs.entries()).map(([date, dayLogs]) => {
      const clockIn = dayLogs.find(log => log.type === 'clock-in')?.timestamp || null;
      const clockOut = dayLogs.find(log => log.type === 'clock-out')?.timestamp || null;
      
      let hoursWorked = 0;
      if (clockIn && clockOut) {
        hoursWorked = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
      }

      return {
        date: new Date(date),
        clockIn,
        clockOut,
        hoursWorked,
        hoursDeficit: clockOut ? Math.max(0, STANDARD_HOURS_PER_DAY - hoursWorked) : 0
      };
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const dailyStats = calculateDailyStats();
  const totalDeficitHours = dailyStats.reduce((total, day) => total + day.hoursDeficit, 0);

  return (
    <div className="space-y-6">
      {/* סיכום שעות להשלמה */}
      {totalDeficitHours > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-medium text-orange-800 dark:text-orange-200">
                  {t('totalDeficitSummary')}
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-300 mt-1">
                  {t('totalHoursToComplete')}
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
              {totalDeficitHours.toFixed(1)}h
            </div>
          </div>
        </div>
      )}

      {/* טבלת דוחות יומיים */}
      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-dark-700">
          <Clock className="h-6 w-6 text-indigo-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('dailyReports')}
          </h3>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-dark-700">
          {dailyStats.map((day) => (
            <div key={day.date.toISOString()} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-dark-50">
                  {day.date.toLocaleDateString()}
                </h4>
                
                <div className="flex items-center gap-2">
                  {day.clockOut && (
                    <Tooltip content={
                      day.hoursDeficit > 0 
                        ? t('hoursDeficitMessage', { hours: day.hoursDeficit.toFixed(2) })
                        : t('hoursCompleted')
                    }>
                      <div className="flex items-center gap-2">
                        {day.hoursDeficit > 0 ? (
                          <div className="flex items-center text-orange-500 dark:text-orange-400">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm ml-1">
                              -{day.hoursDeficit.toFixed(1)}h
                            </span>
                          </div>
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
                        )}
                      </div>
                    </Tooltip>
                  )}
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {day.hoursWorked.toFixed(1)}h
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-dark-300 mb-1">
                    {t('clockedIn')}
                  </h5>
                  <EditableDateTimeCell
                    value={day.clockIn}
                    onSave={(newTime) => onUpdateLog(day.date, 'clock-in', newTime)}
                  />
                </div>
                <div className="relative">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-dark-300 mb-1">
                    {t('clockedOut')}
                  </h5>
                  <EditableDateTimeCell
                    value={day.clockOut}
                    onSave={(newTime) => onUpdateLog(day.date, 'clock-out', newTime)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { DailyReport };