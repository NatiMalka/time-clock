export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface TimeLog {
  id: string;
  userId: string;
  type: 'clock-in' | 'clock-out';
  timestamp: Date;
  location?: string;
}

export interface AttendanceStats {
  totalHours: number;
  averagePunctuality: number;
  lateArrivals: number;
}