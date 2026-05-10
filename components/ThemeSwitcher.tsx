'use client';

import { themePresets } from '@/lib/theme';
import { useTheme } from '@/components/ThemeProvider';

export function ThemeSwitcher() {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="themeRow">
      {themePresets.map((theme) => (
        <button
          key={theme.id}
          type="button"
          className={`themeCard ${themeId === theme.id ? 'selected' : ''}`}
          onClick={() => setThemeId(theme.id)}
        >
          <strong>{theme.name}</strong>
          <p className="muted">{theme.description}</p>
          <div className="swatches">
            <span className="swatch" style={{ background: theme.colors.primary }} />
            <span className="swatch" style={{ background: theme.colors.accent }} />
            <span className="swatch" style={{ background: theme.colors.background }} />
            <span className="swatch" style={{ background: theme.colors.surface }} />
          </div>
          <span className="pill">{themeId === theme.id ? 'Selected' : 'Preview'}</span>
        </button>
      ))}
    </div>
  );
}
