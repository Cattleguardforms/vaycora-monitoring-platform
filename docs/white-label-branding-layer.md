# White Label Branding Layer

The app should remain white-label capable even while Vaycora is the default brand.

## Current default brand

```txt
Default product name: Vaycora Asset Operations
Default primary color: #154D37
Default accent color: #E96F12
Default background: #F3EFE5
```

## Branding principle

Do not hard-code customer-facing brand settings directly into page components.

The app should pull brand settings from a central branding/theme layer.

## Configurable brand fields

```txt
brand_name
product_name
logo_url
logo_placeholder_text
primary_color
primary_deep_color
accent_color
background_color
surface_color
text_color
muted_text_color
border_color
default_theme_preset
```

## Theme presets

The app currently supports three visual presets:

```txt
Vaycora Classic
Operations Dark
Clean Enterprise
```

These should remain selectable from `/admin/branding`.

## White-label flow

```txt
Admin opens Branding
↓
Chooses preset or custom colors
↓
Uploads logo or uses placeholder text
↓
Saves brand settings
↓
Customer/org sees their branded version after login
```

## Storage plan

Temporary preview storage:

```txt
localStorage
```

Production storage:

```txt
branding_settings table in Supabase
```

Suggested table fields:

```txt
id
org_id
brand_name
product_name
logo_url
logo_placeholder_text
theme_preset
primary_color
primary_deep_color
accent_color
background_color
surface_color
text_color
muted_text_color
border_color
created_at
updated_at
updated_by
```

## Multi-customer support

Long-term, each customer/org should have its own branding record.

```txt
organizations
  ↓
branding_settings
  ↓
users see organization-specific theme after login
```

## Important build rule

All shared UI components should use CSS variables:

```txt
--color-primary
--color-primary-deep
--color-accent
--color-background
--color-surface
--color-text
--color-muted
--color-border
```

This keeps the app white-label safe.

## Current status

Built now:

- Global theme variables
- Three theme presets
- Theme provider
- Theme switcher
- Branding page placeholder
- Local theme preview

Still needed:

- Supabase `branding_settings` table
- Logo upload
- Brand text settings
- Per-organization brand loading
- Save theme to database
- Admin-only brand controls
