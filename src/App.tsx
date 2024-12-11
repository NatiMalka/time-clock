import React from 'react';
import { Header } from './components/Header';
import { ClockButton } from './components/ClockButton';
import { AttendanceLog } from './components/AttendanceLog';
import { ReportsView } from './components/reports/ReportsView';
import { TimeLog } from './types';
import { Button } from './components/ui/Button';
import { loadLogs, saveLogs } from './utils/storageUtils';

function App() {
  const [logs, setLogs] = React.useState<TimeLog[]>(() => loadLogs());
  const [view, setView] = React.useState<'clock' | 'reports'>('clock');
  const [loadError, setLoadError] = React.useState<string | null>(null);

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

  const handleClock = (type: 'clock-in' | 'clock-out') => {
    const newLog: TimeLog = {
      id: Date.now().toString(),
      userId: '1',
      type,
      timestamp: new Date(),
      location: 'Main Office'
    };
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {loadError && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
            {loadError}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center space-x-4">
          <Button
            onClick={() => setView('clock')}
            variant={view === 'clock' ? 'primary' : 'outline'}
          >
            Clock In/Out
          </Button>
          <Button
            onClick={() => setView('reports')}
            variant={view === 'reports' ? 'primary' : 'outline'}
          >
            Reports
          </Button>
        </div>

        {view === 'clock' ? (
          <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
            <div className="w-full text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Today's Attendance</h2>
              <div className="flex justify-center space-x-8 mb-12">
                <ClockButton type="in" onClick={() => handleClock('clock-in')} />
                <ClockButton type="out" onClick={() => handleClock('clock-out')} />
              </div>
            </div>
            
            <div className="w-full max-w-2xl">
              <AttendanceLog 
                logs={logs} 
                onDelete={handleDeleteLog}
              />
            </div>
          </div>
        ) : (
          <ReportsView 
            logs={logs} 
            onUpdateLog={handleUpdateLog} 
            onDeleteLog={handleDeleteLog}
          />
        )}
      </main>
    </div>
  );
}

export default App;