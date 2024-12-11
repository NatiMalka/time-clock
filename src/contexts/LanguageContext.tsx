import React from 'react';

type Language = 'en' | 'he';

interface Translations {
  [key: string]: {
    en: string;
    he: string;
  };
}

export const translations: Translations = {
  clockIn: {
    en: 'Clock IN',
    he: 'כניסה'
  },
  clockOut: {
    en: 'Clock OUT',
    he: 'יציאה'
  },
  recentActivity: {
    en: 'Recent Activity',
    he: 'פעילות אחרונה'
  },
  dailyReports: {
    en: 'Daily Reports',
    he: 'דוחות יומיים'
  },
  date: {
    en: 'Date',
    he: 'תאריך'
  },
  time: {
    en: 'Time',
    he: 'שעה'
  },
  delete: {
    en: 'Delete',
    he: 'מחק'
  },
  cancel: {
    en: 'Cancel',
    he: 'ביטול'
  },
  save: {
    en: 'Save',
    he: 'שמור'
  },
  totalHours: {
    en: 'Total Hours',
    he: 'סה"כ שעות'
  },
  deleteConfirmation: {
    en: 'Are you sure you want to delete this attendance record? This action cannot be undone.',
    he: 'האם אתה בטוח שברצונך למחוק רשומת נוכחות זו? פעולה זו אינה ניתנת לביטול.'
  },
  deleteEntry: {
    en: 'Delete Entry',
    he: 'מחק רשומה'
  },
  mainOffice: {
    en: 'Main Office',
    he: 'משרד ראשי'
  },
  clockInOut: {
    en: 'Clock In/Out',
    he: 'כניסה/יציאה'
  },
  reports: {
    en: 'Reports',
    he: 'דוחות'
  },
  todayAttendance: {
    en: "Today's Attendance",
    he: 'נוכחות היום'
  },
  averageHoursDay: {
    en: 'Average Hours/Day',
    he: 'ממוצע שעות/יום'
  },
  daysPresent: {
    en: 'Days Present',
    he: 'ימי נוכחות'
  },
  clockedIn: {
    en: 'Clocked In',
    he: 'שעת כניסה'
  },
  clockedOut: {
    en: 'Clocked Out',
    he: 'שעת יציאה'
  },
  attendanceClock: {
    en: 'Attendance Clock',
    he: 'שעון נוכחות'
  },
  confirmClockIn: {
    en: 'Confirm Clock In',
    he: 'אישור כניסה'
  },
  confirmClockOut: {
    en: 'Confirm Clock Out',
    he: 'אישור יציאה'
  },
  clockInMessage: {
    en: 'Are you sure you want to clock in? This will record your attendance start time.',
    he: 'האם אתה בטוח שברצונך לדווח כניסה? פעולה זו תתעד את זמן תחילת הנוכחות שלך.'
  },
  clockOutMessage: {
    en: 'Are you sure you want to clock out? This will record your attendance end time.',
    he: 'האם אתה בטוח שברצונך לדווח יציאה? פעולה זו תתעד את זמן סיום הנוכחות שלך.'
  },
  clockInTooltip: {
    en: 'Record your arrival time',
    he: 'רישום זמן הגעה'
  },
  clockOutTooltip: {
    en: 'Record your departure time',
    he: 'רישום זמן עזיבה'
  },
  deleteEntryTooltip: {
    en: 'Delete this time entry',
    he: 'מחק רשומת זמן זו'
  },
  clockViewTooltip: {
    en: 'Clock in/out and view recent activity',
    he: 'כניסה/יציאה וצפייה בפעילות אחרונה'
  },
  reportsViewTooltip: {
    en: 'View attendance reports and statistics',
    he: 'צפייה בדוחות נוכחות וסטטיסטיקות'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = React.createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return React.useContext(LanguageContext);
} 