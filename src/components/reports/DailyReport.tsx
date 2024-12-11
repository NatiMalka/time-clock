import React from 'react';
import { TimeLog } from '../../types';
import { calculateDailyStats } from '../../utils/attendanceUtils';
import { useLanguage } from '../../contexts/LanguageContext';
import { EditableDateTimeCell } from './EditableDateTimeCell';

interface DailyReportProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
}

const hebrewDays = {
  'Sunday': 'יום ראשון',
  'Monday': 'יום שני',
  'Tuesday': 'יום שלישי',
  'Wednesday': 'יום רביעי',
  'Thursday': 'יום חמישי',
  'Friday': 'יום שישי',
  'Saturday': 'יום שבת'
};

const hebrewMonths = {
  'January': 'ינואר',
  'February': 'פברואר',
  'March': 'מרץ',
  'April': 'אפריל',
  'May': 'מאי',
  'June': 'יוני',
  'July': 'יולי',
  'August': 'אוגוסט',
  'September': 'ספטמבר',
  'October': 'אוקטובר',
  'November': 'נובמבר',
  'December': 'דצמבר'
};

export default function DailyReport({ logs, onUpdateLog }: DailyReportProps) {
  const { t, language } = useLanguage();
  const dailyStats = calculateDailyStats(logs);

  // Sort dailyStats by date in descending order (newest first)
  const sortedDailyStats = [...dailyStats].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  const formatDateForLocale = (date: Date) => {
    if (language === 'he') {
      const englishDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const [weekday, month, day, year] = englishDate.replace(',', '').split(' ');
      const hebrewWeekday = hebrewDays[weekday as keyof typeof hebrewDays];
      const hebrewMonth = hebrewMonths[month as keyof typeof hebrewMonths];

      return `${hebrewWeekday}, ${day} ${hebrewMonth} ${year}`;
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
            {t('dailyReports')}
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-dark-700">
          {sortedDailyStats.map(day => (
            <div key={day.date.toISOString()} 
                 className="p-6 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-medium text-gray-500 dark:text-dark-300 
                                ${language === 'he' ? 'text-right' : 'text-left'}`}>
                    {formatDateForLocale(day.date)}
                  </h4>
                  {day.date.toDateString() === new Date().toDateString() && (
                    <span className="px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                      {t('today')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-dark-300">
                    {t('totalHours')}: {day.hoursWorked.toFixed(2)}h
                  </span>
                  {day.hoursWorked > 8.48 && (
                    <span className="text-sm text-orange-500 dark:text-orange-400">
                      (+{(day.hoursWorked - 8.48).toFixed(2)}h {t('overtime')})
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-dark-300 mb-1">
                    {t('clockedIn')}
                  </h5>
                  <EditableDateTimeCell
                    value={day.clockIn || null}
                    onSave={(newTime) => onUpdateLog(day.date, 'clock-in', newTime)}
                  />
                </div>
                <div className="relative">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-dark-300 mb-1">
                    {t('clockedOut')}
                  </h5>
                  <EditableDateTimeCell
                    value={day.clockOut || null}
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