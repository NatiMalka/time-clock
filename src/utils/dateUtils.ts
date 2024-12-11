export function formatDate(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateWorkingHours = (clockIn: Date, clockOut: Date): number => {
  return (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
};