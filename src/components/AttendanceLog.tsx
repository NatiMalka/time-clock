import React from 'react';
import { TimeLog } from '../types';

interface AttendanceLogProps {
  logs: TimeLog[];
}

export function AttendanceLog({ logs }: AttendanceLogProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {logs.map((log) => (
          <li key={log.id} className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {log.type === 'clock-in' ? 'Clocked In' : 'Clocked Out'}
                </p>
                <p className="text-sm text-gray-500">{log.location}</p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}