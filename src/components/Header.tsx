import React from 'react';
import { Clock } from 'lucide-react';

export function Header() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-2xl font-semibold text-gray-900">Attendance Clock</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm text-gray-500">
              {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}