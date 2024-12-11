import React from 'react';
import { TimeLog } from '../../types';
import { AttendanceStats } from './AttendanceStats';
import { DailyReport } from './DailyReport';
import { useLanguage } from '../../contexts/LanguageContext';

interface ReportsViewProps {
  logs: TimeLog[];
  onUpdateLog: (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => void;
  onDeleteLog: (logId: string) => void;
}

export function ReportsView({ logs, onUpdateLog, onDeleteLog }: ReportsViewProps) {
  const { t } = useLanguage();
  
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