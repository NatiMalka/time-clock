import React from 'react';
import { TimeLog } from '../../types';
import { calculateDailyStats } from '../../utils/attendanceUtils';
import { formatDate } from '../../utils/dateUtils';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { EditableTimeCell } from './EditableTimeCell';

interface DailyReportProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
}

export function DailyReport({ logs, onUpdateLog }: DailyReportProps) {
  const dailyStats = calculateDailyStats(logs);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Daily Reports</h3>
          <span className="text-sm text-gray-500">Click time to edit</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clock In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clock Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours Worked
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dailyStats.map((day, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatDate(day.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <EditableTimeCell
                      value={day.clockIn}
                      onSave={(newTime) => onUpdateLog(day.date, 'clock-in', newTime)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <EditableTimeCell
                      value={day.clockOut}
                      onSave={(newTime) => onUpdateLog(day.date, 'clock-out', newTime)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {day.hoursWorked.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}