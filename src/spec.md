# Specification

## Summary
**Goal:** Redesign the Home page with a professional underwater theme and add a responsive 3-feature CTA section at the bottom, while keeping existing navigation behavior unchanged.

**Planned changes:**
- Update Home page styling to a professional underwater/ocean look (deep-ocean gradients, subtle highlights, typography, section styling) using the existing ocean-themed design tokens, replacing the current sky/light-blue gradient feel.
- Keep the current top navigation buttons (Home, Profile, Google Map, Comment, Calculate) and their existing onNavigate targets unchanged.
- Add a bottom section with 3 responsive boxed cards (side-by-side on larger screens, stacked on small screens) with the exact provided titles/descriptions/CTA labels, wired to existing routes:
  - Interactive Map → “Explore Map” → onNavigate('map')
  - Coral Reef Health Index → “Calculate index” → onNavigate('calculate')
  - Comment → CTA navigates to onNavigate('comment') (minimal professional description if needed)
- Ensure the 3-box section is not obscured by the footer and remains fully accessible.

**User-visible outcome:** The Home page looks professionally underwater-themed and includes three clear feature boxes with CTAs that take users to the Map, Calculate, and Comment pages.
