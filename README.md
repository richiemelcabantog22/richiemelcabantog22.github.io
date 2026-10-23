# richiemelcabantog22.github.io

Personal portfolio of **Richiemel Cabantog** — a full-stack developer and IT support
problem-solver from Muntinlupa City, Philippines.

**Live site:** https://richiemelcabantog22.github.io/

## What's inside

A single-page, hand-coded portfolio with no build step and no frameworks:

- **Hero** — animated terminal, rotating roles, live status
- **About** — graduation portrait, background, and an IT support callout
- **Projects** — TransTrack (flagship, with demo video), PAMANA, SAFETY-APP,
  Smart Barangay Tunasan Portal, TransTrack API, and this portfolio
- **Screens** — real on-device screenshots with a click-to-zoom lightbox
- **Skills** — mobile, frontend, backend, IT support, tools, and workflow
- **Contact** — email, GitHub, YouTube, and location

The design is a dark "aurora + glass" theme using Space Grotesk, Inter, and
JetBrains Mono. Interactions are vanilla JavaScript: project filters, scroll
reveal, active-nav tracking, a mobile menu, a lazy-loaded YouTube player, copy-to-
clipboard, and an accessible image lightbox.

## Project structure

```
.
├── index.html              # All page markup and the SVG icon sprite
├── assets/
│   ├── css/styles.css      # Theme, layout, components, responsive rules
│   ├── js/main.js          # All interactions (no dependencies)
│   └── img/
│       ├── profile.jpg     # Graduation portrait (4:5, 800×1000)
│       ├── og-cover.jpg    # Social share card (1200×630)
│       ├── transtrack-cover.svg
│       └── projects/       # Optimized app screenshots (JPEG)
├── .nojekyll               # Serve files as-is on GitHub Pages
└── README.md
```

## Run locally

No install or build required. From the project folder:

```powershell
py -m http.server 8765
```

Then open http://127.0.0.1:8765/. Opening `index.html` directly also works, but a
local server is closer to GitHub Pages (and avoids file:// quirks).

## Deploy

The site is published with **GitHub Pages** from the `main` branch, repository root.
Any push to `main` goes live in a minute or two:

```powershell
git add .
git commit -m "Update portfolio"
git push origin main
```

## Editing notes

- **Colors and fonts:** change the custom properties in `:root` at the top of
  `assets/css/styles.css`.
- **Projects:** cards live in the `#projects` section of `index.html`. Each card has
  `data-category` (`all`, `fullstack`, `mobile`, `backend`, `web`) used by the
  filter buttons. Update the filter counts in the button markup if you add or
  remove cards.
- **Screens gallery:** add a JPEG to `assets/img/projects/`, then copy a
  `<figure class="phone-shot">` block in `#screens`. The lightbox picks up figures
  automatically.
- **Portrait:** replace `assets/img/profile.jpg` with another 4:5 image
  (800×1000 recommended) to keep the card framing.
- **Contact email:** search for `cabantogrichiemel@gmail.com` in `index.html`.
- **Social preview:** update the `og:image` URL if the domain or portrait changes.

## Accessibility & performance

- Keyboard-navigable menus, filters, video, and screenshot lightbox
- Visible focus states and a skip link
- `prefers-reduced-motion` support (typewriter and reveal animations are disabled)
- Lazy-loaded screenshots and a click-to-play YouTube embed (no iframe until play)
- Semantic landmarks, descriptive alt text, and JSON-LD `Person` metadata

## Credits

Designed and built by Richiemel Cabantog. App screenshots are from his own
projects. Fonts are served by Google Fonts.
