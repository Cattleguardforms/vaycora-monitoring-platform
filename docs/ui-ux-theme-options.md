# Vaycora Monitoring — UI/UX Theme Options

This document defines the three customer-selectable UI/UX directions for the Vaycora Monitoring Platform.

## Goal

Build the platform with a theme system so a customer/admin can switch between three polished UI styles without rebuilding the app.

The app should support:

- Three preset UI themes
- Brand color variables
- Live preview in Admin / Branding
- Saved theme selection
- Future per-customer theme selection

---

# Theme Option 1 — Vaycora Classic

## Feel

Warm, branded, professional, outdoors-inspired.

## Best For

Default Vaycora internal/admin experience.

## Palette

```txt
Primary: #154D37
Accent: #E96F12
Background: #F4EFE6
Surface/Card: #FFFFFF
Text: #102A24
Muted Text: #5B6B63
Border: #D9CBB8
```

## UI Personality

- Cream dashboard background
- Deep green sidebar/header
- Orange only for action buttons, alerts, highlights
- Rounded cards
- Softer shadows
- Warm admin feel

## Use For

- Main Vaycora Monitoring default
- OBS review workflow
- Asset tracking
- Admin backend

---

# Theme Option 2 — Operations Dark

## Feel

Control-room, monitoring center, high-contrast, technical.

## Best For

Users who want a more serious live-monitoring/dashboard look.

## Palette

```txt
Primary: #0B2A1F
Accent: #F97316
Background: #07130F
Surface/Card: #10231B
Text: #F8FAFC
Muted Text: #A7B5AE
Border: #244638
```

## UI Personality

- Dark app background
- Green-black sidebar
- Orange alerts and active states
- Strong status badges
- Higher contrast data tables
- Feels like a monitoring command center

## Use For

- Live OBS data review
- Flagged monitor queues
- After-hours/admin operations
- Customers who prefer dark software dashboards

---

# Theme Option 3 — Clean Enterprise

## Feel

Modern SaaS, white background, clean table-heavy interface.

## Best For

Customers who want a simple, corporate, non-outdoors-heavy interface.

## Palette

```txt
Primary: #123C2B
Accent: #E96F12
Background: #F8FAF9
Surface/Card: #FFFFFF
Text: #102A24
Muted Text: #66756E
Border: #E3E8E5
```

## UI Personality

- White/near-white dashboard background
- Green used for primary navigation and headings
- Orange used sparingly
- Clean tables
- Less decorative
- More enterprise/admin feel

## Use For

- Customers who want software that feels like a professional operations system
- Higher-volume data review
- Table-heavy admin pages

---

# Admin Branding Page

Suggested route:

```txt
/admin/branding
```

Controls:

```txt
Theme Preset: Vaycora Classic / Operations Dark / Clean Enterprise
Brand Name
Logo Placeholder / Logo Upload later
Primary Color
Accent Color
Background Color
Surface Color
Text Color
Border Color
Save Theme
Preview Theme
```

---

# Implementation Model

## Theme Token Shape

```ts
export type ThemePreset = {
  id: 'vaycora-classic' | 'operations-dark' | 'clean-enterprise';
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    mutedText: string;
    border: string;
  };
};
```

## Theme Storage

Start simple:

```txt
localStorage selected theme for preview
```

Then store in Supabase later:

```txt
branding_settings.theme_preset
branding_settings.primary_color
branding_settings.accent_color
branding_settings.background_color
branding_settings.surface_color
branding_settings.text_color
branding_settings.border_color
```

---

# UX Flow

```txt
Admin opens Branding
↓
Sees three theme cards
↓
Clicks Preview
↓
App shell changes instantly
↓
Admin clicks Save Theme
↓
Theme is saved globally
↓
All users see selected theme after login
```

---

# Build Tasks

## Phase 1 — Theme system

- [ ] Create theme tokens
- [ ] Create three theme presets
- [ ] Add CSS variables
- [ ] Add theme provider
- [ ] Add theme switcher component
- [ ] Save selected theme locally for preview

## Phase 2 — UI shell

- [ ] Build branded login page
- [ ] Build app shell
- [ ] Build sidebar
- [ ] Build topbar
- [ ] Build dashboard cards
- [ ] Build status badges
- [ ] Build live data table design

## Phase 3 — Admin branding

- [ ] Create `/admin/branding`
- [ ] Add three theme preview cards
- [ ] Add color pickers
- [ ] Add save/preview/reset actions
- [ ] Add theme preview panel

## Phase 4 — Customer choice later

- [ ] Add per-customer theme storage
- [ ] Add customer/org settings table
- [ ] Let each customer choose from approved presets

---

# Recommended Starting Point

Start with all three presets in code, but make **Vaycora Classic** the default.

Recommended default:

```txt
Theme: Vaycora Classic
Logo Placeholder: Vaycora Monitoring
Primary: #154D37
Accent: #E96F12
Background: #F4EFE6
```

---

# Important Rule

Do not hard-code colors directly into components.

Use theme variables everywhere:

```txt
--color-primary
--color-accent
--color-background
--color-surface
--color-text
--color-muted-text
--color-border
```

That lets us swap the entire UI/UX look between the three options cleanly.
