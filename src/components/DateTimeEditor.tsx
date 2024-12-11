import { formatDateTimeLocal } from '../utils/dateUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import { X } from 'lucide-react';

export function DateTimeEditor({ value, onChange, onClose }: DateTimeEditorProps) {
  const { t } = useLanguage();
  return (
    <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 z-10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-dark-50">
          {t('editTime')}
        </h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-dark-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <input
        type="datetime-local"
        value={formatDateTimeLocal(value)}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md 
                 text-gray-900 dark:text-dark-50 
                 bg-white dark:bg-dark-800
                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                 focus:border-indigo-500 dark:focus:border-indigo-400"
      />
      
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button variant="primary" size="sm" onClick={onClose}>
          {t('save')}
        </Button>
      </div>
    </div>
  );
} 