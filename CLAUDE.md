# CLAUDE.md

Notes for working in this repository.

## Escape Rooms page (`/escape-rooms/`)

- Content lives in `app/content/escape-rooms.md` as raw HTML (not a Markdown table) inside a `.escape-rooms` grid
- Cards are ordered most-recent first
- Images live in `build/img/escape-rooms/` and are served from `/assets/img/escape-rooms/`
- Each room has three image files:
  - `[slug].jpg` — original upload
  - `[slug]-thumb.jpg` — 600×600 square crop focused on faces (used in card)
  - `[slug]-full.jpg` — original resized to max 2000px on the longest dimension (linked from card)
- Thumbnails are generated with `cv2` face detection; if a crop looks wrong, adjust the bounding box manually in the script or re-run with a tweaked `cy` offset
- Ratings use `X/10` format — Tulleys uses a 5-point scale so convert (e.g. 5/5 → 10/10)
- The 2017 "Murder at the Pier: Revenge" entry intentionally has no rating
