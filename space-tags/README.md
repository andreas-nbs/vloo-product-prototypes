# Space Tags

Public-facing prototype for showing host-selected workspace signals on VLOO space pages.

## Files

- `object-page-space-tags.html` - object page placement, max 4 public tags.
- `space-entry-card-tags.html` - listing card placement, max 3 tags and compact max 2 tags.
- `assets/space-signals.js` - shared priority, dedupe, and rendering helper.
- `assets/object-page-reference.jpg` - object page screenshot reference.
- `assets/space-entry-reference.jpg` - listing card screenshot reference.

## Public Tag Priority

1. First 2 selected `workspaceVibe` tags.
2. First 1 selected `bestSuitedFor` tag.
3. Selected `energyLevel`.
4. Fill remaining slots with more `bestSuitedFor`, then `noiseLevel`, then extra `workspaceVibe`.

The helper dedupes repeated labels or ids and renders nothing when no public tags are available.
