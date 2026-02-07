# TOPLCR - Telegram Bot Landing Page

Landing page for TOPLCR, an AI-powered Telegram bot assistant built for telecom sales professionals. Helps manage leads, automate follow-ups, and close deals faster.

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, responsive design
- **Bootstrap 5.3** — Layout, components, utilities (CDN)
- **Vanilla JavaScript** — No frameworks or libraries beyond Bootstrap

## Setup

No build step required. Open `index.html` in a browser:

```bash
# From the project root
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

Or serve locally with any static file server:

```bash
npx serve .
```

## File Structure

```
toplcr_landing_page/
├── index.html          # Main page — all sections live here
├── css/
│   └── custom.css      # Custom properties, base styles, component styles
├── js/
│   └── main.js         # Initialization, form validation, scroll behavior
├── images/
│   └── .gitkeep        # Placeholder — add images here
└── README.md
```

## Color Palette

| Role             | Color   | Hex       |
|------------------|---------|-----------|
| Primary          | White   | `#FFFFFF` |
| Secondary        | Turquoise | `#1ABC9C` |
| Accent           | Orange  | `#FF6B35` |
| Dark text        | Charcoal | `#333333` |
| Light background | Light gray | `#f8f9fa` |

All colors are defined as CSS custom properties in `css/custom.css` under `:root`.

## Sections (Planned)

1. Hero
2. Problem-Solution
3. Benefits
4. How It Works
5. FAQ
6. Contact Form
7. Footer

## Django Integration

This is a standalone static landing page. A future phase will integrate it into a Django project as a template, with the contact form submitting to a Django backend.

## Browser Compatibility

Tested against the latest versions of:

- Google Chrome
- Mozilla Firefox
- Apple Safari
- Microsoft Edge
