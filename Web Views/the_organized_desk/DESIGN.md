---
name: The Organized Desk
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#3f4946'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#6f7976'
  outline-variant: '#bec9c5'
  surface-tint: '#1a6a5f'
  primary: '#005248'
  on-primary: '#ffffff'
  primary-container: '#1c6b60'
  on-primary-container: '#9fe9da'
  inverse-primary: '#8bd4c6'
  secondary: '#845400'
  on-secondary: '#ffffff'
  secondary-container: '#ffb54f'
  on-secondary-container: '#724700'
  tertiary: '#2c4e49'
  on-tertiary: '#ffffff'
  tertiary-container: '#446661'
  on-tertiary-container: '#bde2dc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a7f0e2'
  primary-fixed-dim: '#8bd4c6'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#ffddb6'
  secondary-fixed-dim: '#ffb95b'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#c5eae4'
  tertiary-fixed-dim: '#a9cec8'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#2b4d48'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
  paper-0: '#FFFFFF'
  paper-100: '#F1EFE8'
  paper-200: '#E5E2D8'
  paper-300: '#CFCABB'
  ink-500: '#6A716C'
  ink-700: '#3A4441'
  ink-900: '#16211E'
  success-solid: '#2E7D5B'
  success-tint: '#E2F0E9'
  warning-solid: '#B9791A'
  warning-tint: '#F8ECD3'
  danger-solid: '#BE3F2C'
  danger-tint: '#F7E1DC'
typography:
  display-lg:
    fontFamily: Fraunces
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 44px
  display-md:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
  title-lg:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  title-sm:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  label:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  data-display:
    fontFamily: IBM Plex Mono
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-6: 24px
  space-8: 32px
  gutter-mobile: 16px
  gutter-desktop: 24px
  max-width: 1200px
---

## Brand & Style

The design system is built on the narrative of **"order out of scatter."** It aims to provide a calm, scholarly environment that mimics a well-kept physical workspace. The brand personality is professional and academic yet deeply human, steering away from the typical "Silicon Valley" aesthetic in favor of a "warm paper and ink" feel.

The design style is **Modern Minimalist with Tactile elements**, characterized by:
- **Hairline Borders:** Replacing heavy shadows with 1px solid lines to maintain clarity on a wide range of mobile displays.
- **Academic Warmth:** Using serif typography and off-white "Paper" surfaces to reduce eye strain and establish authority.
- **Resilient Utility:** Prioritizing functional clarity for the Nigerian context, specifically addressing intermittent connectivity and the manual nature of bank-transfer reconciliations.

## Colors

The palette is designed to evoke high-quality stationery.

- **Primary (Ink-Teal):** Used for structure and primary actions. It represents the "Ink" on the page.
- **Secondary (Accent Amber):** Reserved for high-priority calls to action like "Start Class" and active indicators. It represents a highlighter or a focused "Brand Dot."
- **Neutral (Paper):** An off-white, warm background set that minimizes glare and feels more organic than pure white.
- **Functional Semantics:** Colors for Paid (Success), Due (Warning), and Overdue (Danger) status must always be accompanied by their corresponding tint background for high-glance legibility in outdoor or low-light conditions.

## Typography

This system employs a strategic hierarchy of three typefaces:

1.  **Fraunces (Display):** Provides academic credibility and warmth. Used sparingly for headers and titles to establish a "bookish" feel.
2.  **Hanken Grotesk (UI):** The workhorse for all functional elements. It is clean and legible on low-resolution mobile screens.
3.  **IBM Plex Mono (Data):** Specifically used for tabular data, currency (₦), and timers. The fixed width ensures that columns of numbers align perfectly, aiding in financial reconciliation.

For mobile headers, always use `title-lg` instead of the larger display variants to maximize vertical space.

## Layout & Spacing

The layout is built on a **4px base grid** with a fluid-to-fixed transition.

- **Mobile First:** The 16px gutter is the standard for mobile. On desktop, the content expands to a 12-column grid with a maximum container width of 1200px.
- **Consistency:** Use `space-4` (16px) for standard card padding and vertical section spacing.
- **Rhythm:** Spacing increments of 4px ensure harmony. Use larger gaps (`space-8`) only for major section breaks to maintain the "organized" feel.

## Elevation & Depth

This system avoids heavy drop shadows, which can look muddy on many mobile displays. Depth is instead communicated through:

- **Hairline Outlines:** 1px solid borders using `paper-200` for containers and `paper-300` for interactive elements.
- **Tonal Layering:** Using `paper-50` for the background and `paper-0` (White) for elevated surfaces like cards and sheets.
- **Subtle Shadows:** For floating elements (menus/modals), use a very light, diffused shadow with a dark teal tint (`#16211E`) at low opacity (6-10%) to maintain a clean "paper" aesthetic.

## Shapes

The shape language is "Soft Rounded."

- **Cards & Inputs:** Use a standard 10px (`radius-md`) to feel friendly but structured.
- **Buttons:** Follow the 10px standard.
- **Status Pills:** Use a full "Pill" shape (999px) for chips and status indicators to distinguish them clearly from interactive buttons.
- **Bottom Sheets:** Use 14px (`radius-lg`) on top corners only to create a "nested" feel on mobile.

## Components

- **Buttons:**
    - **Primary Teal:** Solid teal-500 for main actions.
    - **Amber Live:** Reserved for "Start Class" and active sessions. Includes a pulsing white dot marker.
    - **Secondary:** Paper-0 surface with a teal-500 border.
- **Inputs:**
    - **Above-field labels:** Always visible, using `label` typography.
    - **Focus State:** 1px solid teal-500 with a subtle teal-100 inner glow.
- **Sync Status Chips:**
    - **Synced:** Green dot + "Synced" text.
    - **Syncing:** Rotating teal icon.
    - **Offline:** Warning amber icon + "Working Offline."
- **Cards (Elev-1):**
    - White background (`paper-0`), 1px `paper-200` border, and the `elev-1` subtle shadow.
- **Nigerian Payment Patterns:**
    - **Bank Transfer Focus:** Specific UI blocks for "Copy Account Number" and "Upload Receipt" are treated as primary interaction patterns.
- **Status Chips:**
    - High-contrast text on semantic tint backgrounds (e.g., solid red text on light red tint for "Overdue").