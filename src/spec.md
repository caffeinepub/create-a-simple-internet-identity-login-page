# Specification

## Summary
**Goal:** Update the Home and Fishing Zone pages to use the existing baby-blue theme, expand Fishing Zone search to include states, and remove the yellow map pointer in favor of a single red search marker.

**Planned changes:**
- Switch Home page styling from the current dark/ocean underwater theme to the existing baby-blue theme (colors/gradients/typography/cards/buttons) without changing layout, content, or navigation behavior.
- Update Fishing Zone page styling to match the baby-blue theme (consistent with existing baby-blue variables/classes).
- Extend Fishing Zone search to recognize and return matches for states, and display the matched entity type label as “State”.
- Update Fishing Zone map behavior so successful searches (sea, ocean, city, district, state) show exactly one red marker at the searched location, and remove the yellow fish hotspot pointer behavior and related UI text.

**User-visible outcome:** The Home and Fishing Zone pages appear in the baby-blue theme; Fishing Zone searches now work for states as well as seas/oceans/cities/districts, and the map highlights the searched location with a red marker only (no yellow pointer).
