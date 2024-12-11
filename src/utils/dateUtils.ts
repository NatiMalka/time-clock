export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateWorkingHours = (clockIn: Date, clockOut: Date): number => {
  return (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
};