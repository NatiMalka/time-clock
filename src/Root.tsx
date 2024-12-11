import React from 'react';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';

export function Root() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
} 