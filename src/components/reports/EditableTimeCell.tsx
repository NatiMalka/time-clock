import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Clock } from 'lucide-react';

interface EditableTimeCellProps {
  value: Date | null;
  onSave: (newValue: Date) => void;
}

export function EditableTimeCell({ value, onSave }: EditableTimeCellProps) {
  const [isEditing, setIsEditing] = useState(false);
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
      <div className="flex items-center space-x-2">
        <input
          type="time"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <Button size="sm" onClick={handleSave}>Save</Button>
        <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="group flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
    >
      <span>{value ? value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-'}</span>
      <Clock className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}