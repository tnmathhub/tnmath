import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '@/types';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'tn-maths-edu:language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ta') setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'ta' : 'en');

  const value = useMemo(() => ({ language, toggleLanguage, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

/**
 * Returns a `pick(en, ta)` helper for bilingual content fields (question
 * text, chapter titles, etc.) — falls back to English if no Tamil string
 * is available for that piece of content yet.
 */
export function useBilingual() {
  const { language } = useLanguage();
  return (en: string, ta?: string): string => (language === 'ta' && ta ? ta : en);
}
