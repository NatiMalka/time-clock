import { TimeLog } from '../types';
import { calculateDailyStats, calculateOvertime } from './attendanceUtils';
import 'jspdf-autotable';

// Add type declaration for jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    internal: {
      pageSize: { width: number; height: number };
      getNumberOfPages: () => number;
    };
  }
}

export const generateCSV = (logs: TimeLog[]): string => {
  const dailyStats = calculateDailyStats(logs);
  
  // CSV Headers
  let csv = 'Date,Clock In,Clock Out,Hours Worked,Overtime\n';
  
  // Add daily records
  dailyStats.forEach(stat => {
    const date = stat.date.toLocaleDateString();
    const clockIn = stat.clockIn ? stat.clockIn.toLocaleTimeString() : '-';
    const clockOut = stat.clockOut ? stat.clockOut.toLocaleTimeString() : '-';
    const hoursWorked = stat.hoursWorked.toFixed(2);
    const overtime = Math.max(0, stat.hoursWorked - 8.48).toFixed(2);
    
    csv += `${date},${clockIn},${clockOut},${hoursWorked},${overtime}\n`;
  });
  
  return csv;
};

export const downloadCSV = (logs: TimeLog[]) => {
  const csv = generateCSV(logs);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `attendance_report_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generatePDF = async (logs: TimeLog[]) => {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  
  const dailyStats = calculateDailyStats(logs);
  const overtimeStats = calculateOvertime(logs);
  
  // Add modern header with gradient-like effect
  doc.setFillColor(79, 70, 229); // Main header color (indigo-600)
  doc.rect(0, 0, doc.internal.pageSize.width, 45, 'F');
  doc.setFillColor(67, 56, 202); // Darker shade for depth (indigo-700)
  doc.rect(0, 40, doc.internal.pageSize.width, 5, 'F');
  
  // Add title with better positioning
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('Attendance Report', 20, 30);
  
  // Add date range in a card
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 55, doc.internal.pageSize.width - 40, 25, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(20, 55, doc.internal.pageSize.width - 40, 25, 3, 3, 'D');
  
  doc.setTextColor(71, 85, 105); // slate-600
  doc.setFontSize(10);
  doc.text('REPORT PERIOD', 30, 65);
  
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFontSize(12);
  const startDate = new Date(Math.min(...logs.map(l => l.timestamp.getTime())));
  const endDate = new Date(Math.max(...logs.map(l => l.timestamp.getTime())));
  doc.text(
    `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
    30,
    73
  );
  
  // Add summary cards
  const cardWidth = (doc.internal.pageSize.width - 50) / 3;
  const summaryData = [
    {
      label: 'TOTAL DAYS',
      value: dailyStats.length.toString(),
      color: [239, 246, 255] as [number, number, number], // blue-50
      textColor: [59, 130, 246] as [number, number, number], // blue-500
    },
    {
      label: 'TOTAL HOURS',
      value: `${dailyStats.reduce((sum, day) => sum + day.hoursWorked, 0).toFixed(1)}h`,
      color: [240, 253, 244] as [number, number, number], // green-50
      textColor: [34, 197, 94] as [number, number, number], // green-500
    },
    {
      label: 'MONTHLY OVERTIME',
      value: `${overtimeStats.monthlyOvertime.toFixed(1)}h`,
      color: [254, 242, 242] as [number, number, number], // red-50
      textColor: [239, 68, 68] as [number, number, number], // red-500
    },
  ];
  
  summaryData.forEach((data, index) => {
    const x = 20 + (index * (cardWidth + 5));
    
    // Card background
    doc.setFillColor(data.color[0], data.color[1], data.color[2]);
    doc.roundedRect(x, 90, cardWidth, 45, 3, 3, 'F');
    
    // Value
    doc.setTextColor(data.textColor[0], data.textColor[1], data.textColor[2]);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(data.value, x + 10, 115);
    
    // Label
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(data.label, x + 10, 105);
  });
  
  // Add table with improved styling
  doc.autoTable({
    startY: 150,
    head: [['Date', 'Clock In', 'Clock Out', 'Hours', 'OT']],
    body: dailyStats.map(stat => [
      stat.date.toLocaleDateString(),
      stat.clockIn ? stat.clockIn.toLocaleTimeString() : '-',
      stat.clockOut ? stat.clockOut.toLocaleTimeString() : '-',
      `${stat.hoursWorked.toFixed(1)}h`,
      `${Math.max(0, stat.hoursWorked - 8.48).toFixed(1)}h`
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 8,
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 35, halign: 'left' },
      1: { cellWidth: 35, halign: 'center' },
      2: { cellWidth: 35, halign: 'center' },
      3: { cellWidth: 25, halign: 'center' },
      4: { cellWidth: 25, halign: 'center' },
    },
    margin: { top: 20, left: 20, right: 20 },
  });
  
  // Add footer with shadow effect
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer background with gradient-like effect
    doc.setFillColor(249, 250, 251);
    doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 15, 'F');
    doc.setFillColor(243, 244, 246);
    doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 2, 'F');
    
    // Footer text
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.text(
      `Generated on ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  return doc;
};

export const downloadPDF = async (logs: TimeLog[]) => {
  const doc = await generatePDF(logs);
  doc.save(`attendance_report_${new Date().toISOString().split('T')[0]}.pdf`);
}; 