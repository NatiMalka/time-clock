import { TimeLog } from '../types';

const STORAGE_KEY = 'attendance_logs';

export const loadLogs = (): TimeLog[] => {
  try {
    const storedLogs = localStorage.getItem(STORAGE_KEY);
    if (!storedLogs) return [];
    
    return JSON.parse(storedLogs).map((log: any) => ({
      ...log,
      timestamp: new Date(log.timestamp)
    }));
  } catch (error) {
    console.error('Error loading logs from storage:', error);
    return [];
  }
};

export const saveLogs = (logs: TimeLog[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving logs to storage:', error);
  }
};