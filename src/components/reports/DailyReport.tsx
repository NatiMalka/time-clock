import React from 'react';
import { TimeLog } from '../../types';
import { calculateDailyStats } from '../../utils/attendanceUtils';
import { formatDate } from '../../utils/dateUtils';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { DateTimeEditor } from './DateTimeEditor';
import { Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DailyReportProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
  onDeleteLog: (logId: string) => void;
}

export function DailyReport({ logs, onUpdateLog, onDeleteLog }: DailyReportProps) {
  const [editingLog, setEditingLog] = React.useState<{
    date: Date;
    type: 'clock-in' | 'clock-out';
  } | null>(null);

  const dailyStats = calculateDailyStats(logs);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">Daily Reports</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {dailyStats.map((day) => (
            <div key={day.date.toISOString()} className="space-y-2">
              <h4 className="font-medium text-gray-700">
                {day.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Clock In</p>
                      <p className="text-lg font-medium">
                        {day.clockIn ? formatDate(day.clockIn) : '-'}
                      </p>
                    </div>
                    {day.clockIn && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingLog({
                            date: day.date,
                            type: 'clock-in'
                          })}
                          className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
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
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Clock Out</p>
                      <p className="text-lg font-medium">
                        {day.clockOut ? formatDate(day.clockOut) : '-'}
                      </p>
                    </div>
                    {day.clockOut && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingLog({
                            date: day.date,
                            type: 'clock-out'
                          })}
                          className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
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
              <p className="text-sm text-gray-500">
                Total Hours: {day.hoursWorked.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}