import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
      className="flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      {language.toUpperCase()}
    </Button>
  );
} 