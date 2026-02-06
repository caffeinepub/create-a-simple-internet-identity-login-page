# Specification

## Summary
**Goal:** Update the Home and Fishing Zone experiences with a baby-blue theme, improved Fishing Zone discovery (sea/ocean/city/district search), and map marker highlighting for searched locations and fish hotspots.

**Planned changes:**
- Home: add a dedicated “Fishing Zone” feature card in the feature-box section placed beside the existing “Comment” card on desktop/tablet, keeping existing header navigation and routing behavior unchanged.
- Home: replace the current coral reef background with a new baby-blue coral reef background image using the existing background class wiring.
- Fishing Zone: switch page styling to a baby-blue palette (background, cards, buttons, text) while keeping the current layout sections and close (X) behavior.
- Fishing Zone: extend search to support seas, oceans, cities, and districts; show the matched entity type in results, and show an English error message when no match is found.
- Fishing Zone: update the map section from static image-only to an existing marker-capable map component so it can render coordinate-based markers.
- Fishing Zone: render a red pointer for the searched location and (for sea/ocean searches) a yellow pointer for a “more fish presence” hotspot simultaneously.
- Fishing Zone: compute and display a Coral Reef Health Index based on temperature, pH, oxygen level, and turbidity (using fetched values when available, otherwise labeled estimates), and display the input values used.

**User-visible outcome:** On Home, users see a new Fishing Zone card beside Comment and a baby-blue coral reef background; on Fishing Zone, users get a baby-blue themed page where they can search seas/oceans/cities/districts, see the result type, and view red/yellow map pointers plus a Coral Reef Health Index calculated from the four specified metrics.
