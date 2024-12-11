import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DateTimeEditorProps {
  value: Date;
  onChange: (newDate: Date) => void;
  onClose: () => void;
}

export function DateTimeEditor({ value, onChange, onClose }: DateTimeEditorProps) {
  const { t } = useLanguage();
  const [date, setDate] = React.useState(value.toISOString().split('T')[0]);
  const [time, setTime] = React.useState(
    value.toTimeString().split(':').slice(0, 2).join(':')
  );

  const handleSave = () => {
    const newDate = new Date(`${date}T${time}`);
    onChange(newDate);
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4" />
            {t('date')}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4" />
            {t('time')}
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose}>
            {t('cancel')}
          </button>
          <button onClick={handleSave}>
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
} 