# ProjectHub — Premium Digital Marketplace

## Tone & Direction
Premium, professional, trustworthy marketplace similar to Envato/Gumroad but more minimal and refined. Dark mode as default with light mode toggle. Emphasis on clean visual hierarchy and smooth interactions.

## Color Palette

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| Primary | `0.5 0.17 265` (Indigo) | `0.65 0.18 265` (Bright Indigo) | Brand, buttons, active states |
| Accent | `0.72 0.18 45` (Gold/Amber) | `0.75 0.19 45` (Warm Gold) | Pricing, CTAs, premium highlights |
| Background | `0.98` (Off-white) | `0.12` (Deep charcoal) | Page background |
| Card | `0.995` (Pure white) | `0.16` (Card dark) | Product cards, modals |
| Muted | `0.93` (Light gray) | `0.22` (Muted dark) | Borders, dividers, secondary UI |

## Typography
Display: Space Grotesk (bold, distinctive, tech-forward)
Body: Figtree (friendly, readable, premium)
Mono: Geist Mono (code, technical content)

## Structural Zones
| Zone | Light | Dark | Treatment |
|------|-------|------|----------|
| Header/Nav | `bg-card` with `border-b` | `bg-card` with subtle border | Fixed top, elevated above content |
| Hero/Featured | `bg-background` + accent gradient accent | `bg-background` with gold accent | Large hero section with featured products |
| Product Grid | `bg-background` cards grid | `bg-background` with `bg-card` cards | 3–4 columns desktop, 1–2 mobile |
| Footer | `bg-muted/40` with `border-t` | `bg-muted/30` with subtle border | Muted background, secondary content |
| Admin Panel | `bg-card` with primary accent | `bg-card` with primary accent | Hidden from regular nav, role-protected |

## Component Patterns
- **Cards**: `rounded-lg` (12px), `shadow-subtle` on light / `shadow-md` on dark, `card-hover` for elevation on hover
- **Buttons**: Primary (indigo), Accent (gold for CTA), minimal padding, no borders on primary
- **Pricing Badge**: Gold/amber accent text, bold weight, sparingly applied
- **Links**: Indigo primary, underline on hover, no color change

## Motion & Animation
- **Card hover**: `scale-[1.02]` + `shadow-elevated` over 0.3s smooth easing
- **Button hover**: Color shift, shadow elevation
- **Page load**: Staggered `fade-in` animations for card grid
- **Transitions**: All interactive elements use `transition-smooth` (0.3s cubic-bezier)
- **Framer Motion ready**: Hook-based animation orchestration on product discovery

## Responsive Design
- Mobile: Single column layout, full-width cards, touch-friendly spacing
- Tablet: 2 columns, adjusted padding
- Desktop: 3–4 columns, fixed navigation, sidebar admin links hidden

## Differentiation
Clean, minimal card-based marketplace with strong visual hierarchy using indigo primary and gold accent sparingly. Dark mode premium feel. Smooth hover animations and elevated shadows for depth. Every structural zone has intentional background and border treatment — no ghost text on flat backgrounds.
