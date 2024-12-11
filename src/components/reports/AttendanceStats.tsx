import React from 'react';
import { BarChart, Clock, UserCheck } from 'lucide-react';
import { TimeLog } from '../../types';
import { calculateDailyStats } from '../../utils/attendanceUtils';
import { Card, CardContent } from '../ui/Card';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
}

function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center">
          <div className="p-2 bg-indigo-50 rounded-lg">
            {icon}
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              {trend && (
                <span className="ml-2 text-sm text-green-500">{trend}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AttendanceStats({ logs }: { logs: TimeLog[] }) {
  const dailyStats = calculateDailyStats(logs);
  
  const totalHours = dailyStats.reduce((sum, day) => sum + day.hoursWorked, 0);
  const averageHours = dailyStats.length > 0 ? totalHours / dailyStats.length : 0;
  const daysPresent = dailyStats.filter(day => day.hoursWorked > 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={<Clock className="h-6 w-6 text-indigo-600" />}
        label="Total Hours"
        value={totalHours.toFixed(1)}
      />
      <StatCard
        icon={<BarChart className="h-6 w-6 text-indigo-600" />}
        label="Average Hours/Day"
        value={averageHours.toFixed(1)}
      />
      <StatCard
        icon={<UserCheck className="h-6 w-6 text-indigo-600" />}
        label="Days Present"
        value={daysPresent.toString()}
      />
    </div>
  );
}