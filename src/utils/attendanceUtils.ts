import { TimeLog } from '../types';

export const calculateDailyStats = (logs: TimeLog[]) => {
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
    
    return {
      date: new Date(date),
      clockIn,
      clockOut,
      hoursWorked: clockIn && clockOut ? 
        (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60) : 
        0
    };
  });
};