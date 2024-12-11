import { TimeLog } from '../types';

export const STANDARD_HOURS_PER_DAY = 8.48;
export const OVERTIME_WARNING_THRESHOLD = 10; // hours per day

export interface DailyStats {
  date: Date;
  clockIn?: Date;
  clockOut?: Date;
  hoursWorked: number;
}

export interface OvertimeStats {
  dailyOvertime: number;
  weeklyOvertime: number;
  monthlyOvertime: number;
}

export const calculateDailyStats = (logs: TimeLog[]): DailyStats[] => {
  const dailyLogs = new Map<string, TimeLog[]>();
  
  logs.forEach(log => {
    const date = log.timestamp.toDateString();
    if (!dailyLogs.has(date)) {
      dailyLogs.set(date, []);
    }
    dailyLogs.get(date)?.push(log);
  });

  return Array.from(dailyLogs.entries()).map(([date, dayLogs]) => {
    const clockIn = dayLogs.find(log => log.type === 'clock-in')?.timestamp;
    const clockOut = dayLogs.find(log => log.type === 'clock-out')?.timestamp;
    
    let hoursWorked = 0;
    if (clockIn && clockOut) {
      hoursWorked = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
    }

    return {
      date: new Date(date),
      clockIn,
      clockOut,
      hoursWorked
    };
  });
};

export const calculateOvertime = (logs: TimeLog[]): OvertimeStats => {
  const dailyStats = calculateDailyStats(logs);
  
  // Calculate daily overtime
  const today = dailyStats.find(stat => 
    stat.date.toDateString() === new Date().toDateString()
  );
  const dailyOvertime = today ? 
    Math.max(0, today.hoursWorked - STANDARD_HOURS_PER_DAY) : 0;

  // Calculate weekly overtime (assuming 5-day workweek)
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const weeklyHours = dailyStats
    .filter(stat => stat.date >= startOfWeek)
    .reduce((total, day) => total + day.hoursWorked, 0);
  const weeklyOvertime = Math.max(0, weeklyHours - (STANDARD_HOURS_PER_DAY * 5));

  // Calculate monthly overtime (assuming 22 working days)
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const monthlyHours = dailyStats
    .filter(stat => stat.date >= startOfMonth)
    .reduce((total, day) => total + day.hoursWorked, 0);
  const monthlyOvertime = Math.max(0, monthlyHours - (STANDARD_HOURS_PER_DAY * 22));

  return {
    dailyOvertime,
    weeklyOvertime,
    monthlyOvertime
  };
};