import React from 'react';
import { Header } from './components/Header';
import { ClockButton } from './components/ClockButton';
import { AttendanceLog } from './components/AttendanceLog';
import { ReportsView } from './components/reports/ReportsView';
import { TimeLog } from './types';
import { Button } from './components/ui/Button';
import { loadLogs, saveLogs } from './utils/storageUtils';
import { useLanguage } from './contexts/LanguageContext';
import { Tooltip } from './components/ui/Tooltip';
import ReactDOM from 'react-dom/client';
import { Animate } from './components/ui/Animate';
import { calculateOvertime, OVERTIME_WARNING_THRESHOLD, STANDARD_HOURS_PER_DAY } from './utils/attendanceUtils';
import { AlertTriangle } from 'lucide-react';
import { ProgressBar } from './components/ProgressBar';

function App() {
  const [logs, setLogs] = React.useState<TimeLog[]>(() => loadLogs());
  const [view, setView] = React.useState<'clock' | 'reports'>('clock');
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        console.warn('Some resources may be blocked by browser extensions');
        setLoadError('Some features may be limited due to browser settings');
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  React.useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const loadedLogs = loadLogs();
        setLogs(loadedLogs);
      } catch (error) {
        console.error('Error loading logs:', error);
        setLoadError('Failed to load attendance data');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleClock = (type: 'clock-in' | 'clock-out') => {
    const newLog: TimeLog = {
      id: Date.now().toString(),
      userId: '1',
      type,
      timestamp: new Date(),
      location: 'Main Office'
    };
    
    // Show overtime warning if needed
    if (type === 'clock-out') {
      const { dailyOvertime } = calculateOvertime([...logs, newLog]);
      if (dailyOvertime > OVERTIME_WARNING_THRESHOLD - STANDARD_HOURS_PER_DAY) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 z-50';
        document.body.appendChild(toast);
        
        const root = ReactDOM.createRoot(toast);
        root.render(
          <Animate type="slideDown">
            <div className="bg-orange-500/90 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t('overtimeWarning')}
            </div>
          </Animate>
        );

        setTimeout(() => {
          root.unmount();
          document.body.removeChild(toast);
        }, 5000);
      }
    }

    // Show success animation
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 z-50';
    document.body.appendChild(toast);
    
    const root = ReactDOM.createRoot(toast);
    root.render(
      <Animate type="slideDown">
        <div className="bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm">
          {t(type === 'clock-in' ? 'clockedInSuccess' : 'clockedOutSuccess')}
        </div>
      </Animate>
    );

    setTimeout(() => {
      root.unmount();
      document.body.removeChild(toast);
    }, 3000);

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveLogs(updatedLogs);
  };

  const handleUpdateLog = (date: Date, type: 'clock-in' | 'clock-out', newTime: Date) => {
    const updatedLogs = logs.map(log => {
      if (log.timestamp.toDateString() === date.toDateString() && log.type === type) {
        return {
          ...log,
          timestamp: newTime
        };
      }
      return log;
    });
    setLogs(updatedLogs);
    saveLogs(updatedLogs);
  };

  const handleDeleteLog = (logId: string) => {
    const log = logs.find(l => l.id === logId);
    if (log) {
      const updatedLogs = logs.filter(l => l.id !== logId);
      setLogs(updatedLogs);
      saveLogs(updatedLogs);
    }
  };

  // Calculate today's working hours
  const calculateTodayProgress = () => {
    const today = new Date().toDateString();
    const todayLogs = logs.filter(log => new Date(log.timestamp).toDateString() === today);
    const clockIn = todayLogs.find(log => log.type === 'clock-in')?.timestamp;
    
    if (!clockIn) return null;

    const clockOut = todayLogs.find(log => log.type === 'clock-out')?.timestamp;
    const currentTime = clockOut || new Date();
    
    const hoursWorked = (currentTime.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
    const progressPercentage = Math.min((hoursWorked / 9) * 100, 100);
    
    return {
      hoursWorked,
      progressPercentage,
      remainingHours: Math.max(9 - hoursWorked, 0),
      estimatedEndTime: new Date(clockIn.getTime() + (9 * 60 * 60 * 1000))
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <Header />
      
      {loadError && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-md p-3 text-sm text-yellow-800 dark:text-yellow-200">
            {loadError}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center gap-4">
          <Tooltip content={t('clockViewTooltip')}>
            <Button
              onClick={() => setView('clock')}
              variant={view === 'clock' ? 'primary' : 'outline'}
            >
              {t('clockInOut')}
            </Button>
          </Tooltip>
          <Tooltip content={t('reportsViewTooltip')}>
            <Button
              onClick={() => setView('reports')}
              variant={view === 'reports' ? 'primary' : 'outline'}
            >
              {t('reports')}
            </Button>
          </Tooltip>
        </div>

        {view === 'clock' ? (
          <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
            <div className="w-full text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-dark-50 mb-8">
                {t('todayAttendance')}
              </h2>
              <div className={`flex justify-center ${language === 'he' ? 'gap-8' : 'space-x-8'} mb-12`}>
                <ClockButton type="in" onClick={() => handleClock('clock-in')} />
                <ClockButton type="out" onClick={() => handleClock('clock-out')} />
              </div>
            </div>

            <div className="w-full max-w-2xl">
              <ProgressBar progress={calculateTodayProgress()} />
            </div>
            
            <div className="w-full max-w-2xl">
              <AttendanceLog 
                logs={logs} 
                onDelete={handleDeleteLog}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <ReportsView 
            logs={logs} 
            onUpdateLog={handleUpdateLog} 
            onDeleteLog={handleDeleteLog}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  );
}

export default App;