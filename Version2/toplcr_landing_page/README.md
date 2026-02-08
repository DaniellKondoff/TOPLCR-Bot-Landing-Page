# TOPLCR - Telegram Bot Landing Page

Landing page for **TOPLCR**, an AI-powered Telegram bot assistant for telecom sales professionals. Automates routine tasks like HLR checks, network testing, offer management, and price comparisons—saving 2-3 hours daily. Trusted by 500+ telecom professionals.

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
├── index.html          # 663 lines—all sections, forms, and content
├── css/
│   └── custom.css      # 2598 lines—custom properties, base styles, responsive components
├── js/
│   └── main.js         # 768 lines—form validation, smooth scroll, animations
├── images/
│   └── .gitkeep        # Ready for images
└── README.md
```

### index.html Details
- Meta tags for SEO (description, keywords, author)
- 7 main sections (hero, problems, benefits, how-it-works, FAQ, contact, footer)
- Bootstrap 5.3 CDN + Font Awesome 6.4 CDN for icons
- Semantic HTML5 markup with ARIA labels for accessibility
- Video placeholder for demo (replace `PLACEHOLDER_VIDEO_ID` in hero section iframe)
- Contact form with 4+ validation rules and bot protection

### css/custom.css Details
- CSS custom properties (variables) for colors: primary white, secondary teal, accent orange
- Responsive breakpoints for mobile-first design
- Component styles for cards, forms, buttons, hero section, accordion
- Smooth scroll behavior and animations (ripple effects)

### js/main.js Details  
- Form initialization and client-side validation
- Smooth scroll behavior for CTA buttons
- Scroll indicator animations
- Ripple button effects
- Error/success message handling

## Design System

### Color Palette

| Role             | Color      | Hex       | CSS Variable          |
|------------------|------------|-----------|----------------------|
| Primary          | White      | `#FFFFFF` | `--color-primary`     |
| Secondary        | Teal       | `#1ABC9C` | `--color-secondary`   |
| Accent           | Orange     | `#FF6B35` | `--color-accent`      |
| Dark Text        | Charcoal   | `#333333` | `--color-dark-text`   |
| Light Background | Light Gray | `#f8f9fa` | `--color-light-bg`    |

All colors are defined as CSS custom properties in `css/custom.css` under `:root` for easy theming.

### Typography

- **Font Family:** System fonts (-apple-system, Segoe UI, Roboto, etc.) + emoji support
- **Hero Headline:** 52px, font-weight 700
- **Section Headings:** Responsive sizing with accent colors
- **Body Text:** 16-20px, line-height 1.5
- **Letter Spacing:** Negative letter-spacing on headlines for tighter branding

## Page Sections

1. **Hero** — Eye-catching headline, video placeholder, CTA button, trust indicators (500+ users, 2-3 hrs saved, Telegram secure)
2. **Problem-Solution** — Three problem cards (shrinking market, decreasing sales, more effort) with solution badges
3. **Benefits** — Three benefit cards showcasing speed, reliability, and revenue growth
4. **How It Works** — Seven bot operations displayed as numbered cards:
   - HLR Check
   - Network Testing
   - Offer Management
   - Price Comparisons
   - Route Analysis
   - Automated Reporting
   - Quick Lookups
5. **FAQ** — Five collapsible FAQ items covering pricing, security, reliability, setup, and custom features
6. **Contact Form** — Multi-section form with:
   - Personal information (name, email, phone, optional message)
   - Security verification (math CAPTCHA, human confirmation checkbox)
   - Bot protection (honeypot field, timestamp tracking)
   - Trust indicators (no card required, 10-20 free ops, 24hr activation)
7. **Footer** — Contact info, social proof, copyright notice, Telegram bot link

## Pricing Model

- **Free Tier:** 10-20 operations with no credit card required
- **Pay-as-you-go:** €2-3 per operation
- **Monthly Subscription:** €25/user/month plus service costs

## Key Features

✅ **Routine Tasks** — HLR checks, testing, offer storage in seconds  
✅ **Reliability** — Backed by top-tier market providers  
✅ **Security** — End-to-end encryption via Telegram  
✅ **No Installation** — Works directly in Telegram (desktop, mobile, web)  
✅ **Team Ready** — Designed for telecom sales professionals  

## Form Features & Security

- **Client-side validation** for all required fields (name, email, phone, CAPTCHA)
- **Math CAPTCHA** for human verification
- **Honeypot field** to catch bot submissions
- **Form timestamp tracking** for spam detection
- **Error/success messages** with ARIA live regions for accessibility
- **Pattern validation** for email and phone inputs

## JavaScript Functions

- `initSmoothScroll()` — CTA buttons scroll to contact form smoothly
- `initScrollIndicator()` — Hero scroll indicator animates to problem section
- `initRippleEffect()` — Button ripple animation on click
- `initContactForm()` — Form validation, submission, error/success handling

## Static Site — No Backend Required

This is a standalone static landing page. Future phase will integrate it into a Django project as a template, with the contact form submitting to a Django backend for lead management.

## SEO & Meta Tags

- **Meta Description:** "Free Telegram bot assistant for telecom sales. Save 2-3 hours daily on routine tasks. 20 years expertise. Try 10-20 operations free."
- **Keywords:** TOPLCR, Telegram bot, telecom sales, sales assistant, lead management
- **Viewport:** Mobile-responsive with `initial-scale=1.0`
- **CDN Preconnect:** jsDelivr and Cloudflare for optimized resource loading

## Browser Compatibility

Tested against the latest versions of:

- **Google Chrome** — Full support
- **Mozilla Firefox** — Full support
- **Apple Safari** — Full support
- **Microsoft Edge** — Full support

## Accessibility

- **Semantic HTML5** markup (`<section>`, `<article>`, `<button>`, etc.)
- **ARIA Labels** on all form fields, icons, and interactive elements
- **Form Error Regions** with `aria-live="polite"` for screen readers
- **Keyboard Navigation** fully supported (no `tabindex` issues)
- **Color Contrast** meets WCAG AA standards (dark text on light backgrounds)

## Customization Guide

### Video Demo
Replace `PLACEHOLDER_VIDEO_ID` in the hero section iframe with your actual YouTube video ID:
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ...></iframe>
```

### Contact Form Endpoint
Currently displays success/error messages client-side. To submit data:
1. Update the form's `action` attribute or add JavaScript `fetch()` handler
2. Point to your Django backend endpoint (or any backend service)
3. See the future Django integration phase in the roadmap

### Telegram Bot Link
Update footer link `@TOPLCRBot` with your actual bot username:
```html
<a href="https://t.me/YOUR_BOT_USERNAME" ...>
```

### Color Scheme
Edit CSS custom properties in `css/custom.css`:
```css
:root {
    --color-primary: #FFFFFF;      /* Change primary color */
    --color-secondary: #1ABC9C;    /* Change accent color */
    --color-accent: #FF6B35;       /* Change secondary color */
}
```

## Deployment

### Simple Deployment Options

**GitHub Pages (Free)**
```bash
# Push to gh-pages branch
git checkout -b gh-pages
git push origin gh-pages
```

**Netlify (Free)**
1. Connect your Git repository
2. Build command: (leave empty — static site)
3. Publish directory: `toplcr_landing_page/`

**Vercel (Free)**
```bash
npm i -g vercel
vercel deploy
```

**Self-Hosted**
```bash
# Copy entire toplcr_landing_page/ directory to your server
# No build step needed — serve as-is
```

## Future Roadmap

- [ ] Django backend integration for form submissions and lead management
- [ ] Add admin dashboard for managing leads and operations
- [ ] Implement payment processing (Stripe/PayPal integration)
- [ ] Add analytics tracking (Google Analytics/Mixpanel)
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Blog section for telecom sales tips
