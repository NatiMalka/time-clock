import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Calendar, Clock, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimeLog } from '../../types';

interface ManualEntryFormProps {
  onSubmit: (data: {
    timestamp: Date;
    type: 'clock-in' | 'clock-out';
    clockIn: string;
    clockOut: string;
  }) => void;
}

const ManualEntryForm = ({ onSubmit }: ManualEntryFormProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState<string>(new Date().toISOString().split('T')[0]);
  const [clockIn, setClockIn] = React.useState<string>('09:00');
  const [clockOut, setClockOut] = React.useState<string>('17:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send clock-in entry
    onSubmit({
      timestamp: new Date(date),
      type: 'clock-in',
      clockIn,
      clockOut
    });

    // Send clock-out entry
    onSubmit({
      timestamp: new Date(date),
      type: 'clock-out',
      clockIn,
      clockOut
    });

    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 
          dark:from-blue-950/40 dark:to-indigo-950/40 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50
          border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700
          text-blue-700 dark:text-blue-300 shadow-sm hover:shadow-md
          transition-all duration-200 rounded-2xl overflow-hidden group"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 
            group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-medium text-[15px]">
            {t('addManualEntry')}
          </span>
        </div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} 
              className="mt-4 bg-white dark:bg-dark-800/50 rounded-2xl 
                border border-blue-100 dark:border-blue-900/50 
                p-6 shadow-lg shadow-blue-100/20 dark:shadow-blue-900/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t('date')}
                    </div>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-dark-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t('clockedIn')}
                    </div>
                  </label>
                  <input
                    type="time"
                    value={clockIn}
                    onChange={(e) => setClockIn(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-dark-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t('clockedOut')}
                    </div>
                  </label>
                  <input
                    type="time"
                    value={clockOut}
                    onChange={(e) => setClockOut(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-dark-50"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  {t('cancel')}
                </Button>
                <Button type="submit">
                  {t('addEntry')}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManualEntryForm;

export { ManualEntryForm }; 