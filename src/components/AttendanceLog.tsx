import React from 'react';
import { TimeLog } from '../types';
import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from './ui/ConfirmDialog';

interface AttendanceLogProps {
  logs: TimeLog[];
  onDelete: (logId: string) => void;
}

export function AttendanceLog({ logs, onDelete }: AttendanceLogProps) {
  const [deleteLogId, setDeleteLogId] = React.useState<string | null>(null);

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

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {Object.entries(groupedLogs).map(([date, dateLogs]) => (
            <div key={date} className="divide-y divide-gray-100">
              <div className="px-4 py-3 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-500">
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
              </div>
              <ul>
                {dateLogs.map((log) => {
                  const { time } = formatDateTime(new Date(log.timestamp));
                  return (
                    <li key={log.id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {log.type === 'clock-in' ? 'Clocked In' : 'Clocked Out'}
                          </p>
                          <p className="text-sm text-gray-500">{log.location}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm text-gray-500">
                            {time}
                          </p>
                          <button
                            onClick={() => handleDelete(log.id)}
                            className="text-gray-400 hover:text-rose-600 transition-colors"
                            title="Delete entry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteLogId !== null}
        onClose={() => setDeleteLogId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Entry"
        message="Are you sure you want to delete this attendance record? This action cannot be undone."
      />
    </>
  );
}