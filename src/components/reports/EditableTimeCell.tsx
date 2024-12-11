import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatTime } from '../../utils/dateUtils';

interface EditableTimeCellProps {
  value: Date | null;
  onSave: (newValue: Date) => void;
}

export function EditableTimeCell({ value, onSave }: EditableTimeCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLanguage();
  const [timeValue, setTimeValue] = useState(
    value ? value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : ''
  );

  const handleSave = () => {
    if (timeValue) {
      const [hours, minutes] = timeValue.split(':');
      const newDate = value ? new Date(value) : new Date();
      newDate.setHours(parseInt(hours), parseInt(minutes));
      onSave(newDate);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="inline-flex items-center gap-1.5">
        <input
          type="time"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
          className="w-24 px-1.5 py-1 text-sm rounded-md 
                   border border-gray-300 dark:border-gray-600 
                   dark:bg-dark-800 dark:text-white 
                   focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <div className="flex gap-1">
          <Button 
            size="sm" 
            onClick={handleSave}
            className="px-2 py-1"
          >
            {t('save')}
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsEditing(false)}
            className="px-2 py-1"
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 
                dark:text-gray-400 dark:hover:text-gray-200"
    >
      <span>{value ? formatTime(value) : '-'}</span>
      <Clock className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}