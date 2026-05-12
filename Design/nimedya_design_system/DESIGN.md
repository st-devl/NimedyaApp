---
name: Nimedya Design System
colors:
  surface: '#f9f9fb'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f5'
  surface-container: '#eeedf0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#42474d'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f1f0f2'
  outline: '#72787e'
  outline-variant: '#c2c7cd'
  surface-tint: '#3d627d'
  primary: '#001a2b'
  on-primary: '#ffffff'
  primary-container: '#003049'
  on-primary-container: '#7398b6'
  inverse-primary: '#a5cbea'
  secondary: '#b90c17'
  on-secondary: '#ffffff'
  secondary-container: '#de2e2c'
  on-secondary-container: '#fffbff'
  tertiary: '#2c1100'
  on-tertiary: '#ffffff'
  tertiary-container: '#482306'
  on-tertiary-container: '#c08863'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cae6ff'
  primary-fixed-dim: '#a5cbea'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#244a64'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000d'
  tertiary-fixed: '#ffdcc7'
  tertiary-fixed-dim: '#f8b991'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#673c1d'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 24px
  section-padding: 120px
---

## Brand & Style

The design system is engineered to position the agency as a premier partner for high-growth brands. It balances the raw energy of a creative studio with the structural precision of an elite consultancy. The aesthetic is **Modern Corporate**, utilizing expansive whitespace and high-impact visual anchors to convey "less but better."

Visual storytelling is prioritized through a split-hero architectural model, juxtaposing technical prowess with creative output. The UI remains unobtrusive to allow high-fidelity project imagery to dominate the viewer's attention. Motion should feel purposeful and fluid—utilizing ease-in-out transitions that mimic organic momentum rather than abrupt digital snaps.

## Colors

This design system utilizes a high-contrast palette anchored by **Deep Blue (#003049)** to establish authority and trust. **Red (#D62828)** serves as the primary action color for critical CTAs, while **Orange (#F77F00)** is used sparingly for highlights, notifications, or micro-interactions to inject energy.

For the high-contrast dark mode, the Deep Blue transitions into a darker base (#001A29), ensuring that the Red and Orange accents maintain AA/AAA accessibility ratings. Neutral Gray (#767779) is reserved for metadata, borders, and secondary body text to maintain a clear visual hierarchy against the stark White background.

## Typography

The typographic strategy relies on the interplay between the geometric friendliness of **Plus Jakarta Sans** and the functional clarity of **Inter**. 

Headings should utilize tight letter spacing and aggressive scale to create a "visual voice" that feels loud yet controlled. Body text is optimized for readability with a generous 1.6x line height to ensure clarity in content-heavy case studies. All uppercase labels should include a slight tracking increase (+5%) to improve scanability in navigation and metadata tags.

## Layout & Spacing

This design system uses a **Fixed Grid** model for desktop, centered on a 1440px maximum container with a 12-column structure. A rigorous 8px spatial base unit governs all dimensions.

The signature of this layout is "spacious margins"—intentionally large exterior gutters that frame the content like a gallery piece. Section-to-section breathing room is significant (120px+), preventing the high-impact imagery from feeling cluttered. Split-hero layouts should be implemented with a 50/50 or 60/40 ratio, ensuring the text side has enough internal padding to prevent visual tension with the image edge.

## Elevation & Depth

To maintain a "fresh and clean" aesthetic, this design system avoids heavy drop shadows. Depth is instead communicated through:

1.  **Tonal Layering:** Using subtle shifts between White (#FFFFFF) and very light gray backgrounds for container cards.
2.  **Image Overlays:** Placing text on high-contrast image areas using gradient scrims (Deep Blue at 40% opacity fading to transparent).
3.  **Active Elevation:** On hover, cards or buttons should perform a subtle vertical lift (-4px) accompanied by a soft, ultra-diffused Deep Blue shadow (0px 20px 40px, 5% opacity).
4.  **Glassmorphism:** Navigation bars use a backdrop blur (20px) with a 70% white tint to maintain visibility over vibrant background imagery.

## Shapes

The shape language is defined by **Soft Continuity**. A standard radius of 0.5rem (8px) is applied to all primary UI elements including input fields, buttons, and small cards. 

For larger containers and image galleries, use the `rounded-xl` token (1.5rem / 24px) to emphasize the "ultra-premium" feel. Interactive elements should never be fully sharp, as the slight rounding communicates approachability and modern refinement.

## Components

### Buttons
Primary buttons are solid Deep Blue or Red with White text, using the standard 8px radius. They feature a generous internal horizontal padding (32px). Secondary buttons use a ghost style with a 2px Deep Blue border.

### Cards
Portfolio and service cards utilize the `rounded-xl` radius. Imagery within cards should fill the top half or the full background, with text contained in a high-contrast white area or floating with a subtle scrim.

### Input Fields
Inputs use a Neutral Gray border (1px) that thickens and changes to Deep Blue on focus. Labels should always be visible (no placeholder-only labels) using the `label-sm` typography style.

### Split-Hero Components
A foundational component for this design system. It consists of a 100vh container divided vertically. The left side typically houses the `display-lg` headline and primary CTA, while the right side features a full-bleed, high-quality image or video background.

### Subtle Animations
All interactive components must have a 300ms `cubic-bezier(0.4, 0, 0.2, 1)` transition for hover states. Page transitions should use a subtle vertical slide-in with an opacity fade to reinforce the professional tone.