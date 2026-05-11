'use client';

import {
  accentColorOptions,
  backgroundStyleOptions,
  primaryColorOptions,
  surfaceStyleOptions,
  textStyleOptions,
  themePresets,
  type AccentColorId,
  type BackgroundStyleId,
  type PrimaryColorId,
  type SurfaceStyleId,
  type TextStyleId,
  type ThemeId
} from '@/lib/theme';
import { useTheme } from '@/components/ThemeProvider';

export function ThemeSwitcher() {
  const {
    brandConfig,
    setThemeId,
    setPrimaryColorId,
    setAccentColorId,
    setBackgroundStyleId,
    setSurfaceStyleId,
    setTextStyleId,
    resetBrandConfig
  } = useTheme();

  return (
    <div className="grid two">
      <div className="card compact">
        <p className="kicker">Hard-coded brand base</p>
        <h3 className="cardTitle">Vaycora logo stays default</h3>
        <p className="muted">
          The Vaycora mark and base identity stay hard-coded. Customer color direction changes through dropdowns.
        </p>
        <div className="brandPreview">
          <span className="brandIcon">VM</span>
          <span className="brandText">
            <small>Vaycora</small>
            <strong>Asset Operations</strong>
          </span>
        </div>
      </div>

      <div className="card compact">
        <p className="kicker">Color control layer</p>
        <h3 className="cardTitle">Dropdown controls</h3>
        <div className="formGrid">
          <label>
            <span>Theme preset</span>
            <select value={brandConfig.themeId} onChange={(event) => setThemeId(event.target.value as ThemeId)}>
              {themePresets.map((theme) => (
                <option key={theme.id} value={theme.id}>{theme.name}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Primary color</span>
            <select value={brandConfig.primaryColorId} onChange={(event) => setPrimaryColorId(event.target.value as PrimaryColorId)}>
              {Object.entries(primaryColorOptions).map(([id, option]) => (
                <option key={id} value={id}>{option.name}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Accent color</span>
            <select value={brandConfig.accentColorId} onChange={(event) => setAccentColorId(event.target.value as AccentColorId)}>
              {Object.entries(accentColorOptions).map(([id, option]) => (
                <option key={id} value={id}>{option.name}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Background style</span>
            <select value={brandConfig.backgroundStyleId} onChange={(event) => setBackgroundStyleId(event.target.value as BackgroundStyleId)}>
              {Object.entries(backgroundStyleOptions).map(([id, option]) => (
                <option key={id} value={id}>{option.name}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Surface/card style</span>
            <select value={brandConfig.surfaceStyleId} onChange={(event) => setSurfaceStyleId(event.target.value as SurfaceStyleId)}>
              {Object.entries(surfaceStyleOptions).map(([id, option]) => (
                <option key={id} value={id}>{option.name}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Text contrast</span>
            <select value={brandConfig.textStyleId} onChange={(event) => setTextStyleId(event.target.value as TextStyleId)}>
              {Object.entries(textStyleOptions).map(([id, option]) => (
                <option key={id} value={id}>{option.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginTop: 16 }}>
          <button className="btn secondary" type="button" onClick={resetBrandConfig}>Reset Vaycora Default</button>
        </div>
      </div>
    </div>
  );
}
