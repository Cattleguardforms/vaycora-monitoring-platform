'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultThemeId, themePresets, type ThemeId } from '@/lib/theme';

type ThemeContextValue = {
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(defaultThemeId);

  useEffect(() => {
    const stored = window.localStorage.getItem('vaycora-theme') as ThemeId | null;
    if (stored && themePresets.some((theme) => theme.id === stored)) {
      setThemeIdState(stored);
      document.documentElement.dataset.theme = stored;
    } else {
      document.documentElement.dataset.theme = defaultThemeId;
    }
  }, []);

  const setThemeId = (nextThemeId: ThemeId) => {
    setThemeIdState(nextThemeId);
    document.documentElement.dataset.theme = nextThemeId;
    window.localStorage.setItem('vaycora-theme', nextThemeId);
  };

  const value = useMemo(() => ({ themeId, setThemeId }), [themeId]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
