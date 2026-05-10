export type ThemeId = 'vaycora-classic' | 'operations-dark' | 'clean-enterprise';

export type ThemePreset = {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
};

export const themePresets: ThemePreset[] = [
  {
    id: 'vaycora-classic',
    name: 'Vaycora Classic',
    description: 'Warm cream, deep green, and orange accents for the default branded experience.',
    colors: { primary: '#154D37', accent: '#E96F12', background: '#F4EFE6', surface: '#FFFFFF', text: '#102A24', muted: '#5B6B63', border: '#D9CBB8' }
  },
  {
    id: 'operations-dark',
    name: 'Operations Dark',
    description: 'High contrast command center style for live monitoring and review heavy work.',
    colors: { primary: '#0B2A1F', accent: '#F97316', background: '#07130F', surface: '#10231B', text: '#F8FAFC', muted: '#A7B5AE', border: '#244638' }
  },
  {
    id: 'clean-enterprise',
    name: 'Clean Enterprise',
    description: 'Modern SaaS look with bright surfaces and table first admin screens.',
    colors: { primary: '#123C2B', accent: '#E96F12', background: '#F8FAF9', surface: '#FFFFFF', text: '#102A24', muted: '#66756E', border: '#E3E8E5' }
  }
];

export const defaultThemeId: ThemeId = 'vaycora-classic';
