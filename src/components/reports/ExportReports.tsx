import React, { useState } from 'react';
import { TimeLog } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { downloadCSV, downloadPDF } from '../../utils/exportUtils';

interface ExportReportsProps {
  logs: TimeLog[];
}

export function ExportReports({ logs }: ExportReportsProps) {
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'csv' | 'pdf') => {
    setIsExporting(true);
    try {
      if (format === 'csv') {
        downloadCSV(logs);
      } else {
        await downloadPDF(logs);
      }
    } catch (error) {
      console.error('Export failed:', error);
      // You might want to show an error toast here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200 dark:border-dark-700 p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Download className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-50">
          {t('exportReports')}
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => handleExport('csv')}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="h-4 w-4" />
          )}
          {t('exportToCSV')}
        </Button>

        <Button
          onClick={() => handleExport('pdf')}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {t('exportToPDF')}
        </Button>
      </div>
    </div>
  );
} 