import React from 'react';
import { TimeLog } from '../../types';
import { AttendanceStats } from './AttendanceStats';
import { DailyReport } from './DailyReport';

interface ReportsViewProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
}

export function ReportsView({ logs, onUpdateLog }: ReportsViewProps) {
  return (
    <div className="space-y-8">
      <AttendanceStats logs={logs} />
      <DailyReport logs={logs} onUpdateLog={onUpdateLog} />
    </div>
  );
}