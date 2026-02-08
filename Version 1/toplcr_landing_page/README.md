# TOPLCR - Telegram Bot for Telecom Sales Professionals

## Project Description

TOPLCR is an intelligent Telegram bot assistant designed specifically for telecom sales professionals. It leverages advanced features to streamline sales workflows, enhance productivity, and improve customer engagement for telecom industry professionals.

**Phase 1: Foundation Setup** - This project contains the responsive landing page built with Bootstrap 5 and vanilla JavaScript.

## Tech Stack

- **Frontend Framework**: Bootstrap 5.3.0 (responsive CSS framework)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts - Plus Jakarta Sans (modern, readable)
- **JavaScript**: Vanilla JavaScript (no frameworks, ~514 lines)
- **HTML**: Semantic HTML5 (618 lines, fully accessible with ARIA labels)
- **CSS**: Custom CSS with CSS variables for theming (~2981 lines)
- **CDN Providers**: jsDelivr, Cloudflare, Google Fonts
- **Backend Integration**: Django (planned for Phase 2)

## Key Features

TOPLCR automates routine telecom sales operations directly within Telegram:

1. **HLR Check** - Verify phone numbers instantly and check network availability in real-time
2. **Network Testing** - Run comprehensive network tests on demand with immediate results
3. **Offer Management** - Store and retrieve provider offers instantly with organized pricing information
4. **Price Comparisons** - Compare rates across multiple providers in seconds
5. **Route Analysis** - Optimize telecom routes with AI-powered analysis to find most efficient paths
6. **Automated Reporting** - Generate detailed performance reports with a single command
7. **Quick Lookups** - Access telecom databases instantly for numbers, routes, and providers

## Pricing Model

- **Free Trial**: 10–20 free operations (no credit card required)
- **Pay-as-You-Go**: €2–3 per operation
- **Subscription**: €25/user/month plus service costs
- **Commitment**: No hidden fees, cancel anytime



```
toplcr_landing_page/
├── index.html              # Main landing page (HTML5, Bootstrap, responsive)
├── css/
│   └── custom.css          # Custom styles, variables, and overrides
├── js/
│   └── main.js             # Core JavaScript functionality
├── images/
│   └── .gitkeep            # Placeholder for project images
└── README.md               # This file
```

## Setup Instructions

### Quick Start
1. Navigate to the `toplcr_landing_page` folder
2. Open `index.html` in your web browser
3. The landing page will load with all Bootstrap styles and custom functionality

### No Build Process Required
This is a static HTML project with no build tools or installation steps needed. Simply open the file in any modern web browser.

## Color Palette

The project uses a carefully selected color scheme optimized for SaaS landing pages:

| Color | Value | Usage |
|-------|-------|-------|
| **Primary (White)** | `#FFFFFF` | Main background |
| **Secondary (Turquoise)** | `#1ABC9C` | Primary CTA, accents |
| **Accent (Orange)** | `#FF6B35` | Highlights, secondary CTAs |
| **Dark Text** | `#333333` | Body text, headings |
| **Light Background** | `#f8f9fa` | Section backgrounds |

All colors are defined as CSS custom properties in `css/custom.css`:
```css
:root {
    --primary-color: #FFFFFF;
    --secondary-color: #1ABC9C;
    --accent-color: #FF6B35;
    --dark-text: #333333;
    --light-background: #f8f9fa;
}
```

## File Descriptions

### index.html (618 lines)
- Bootstrap 5.3.0 from jsDelivr CDN with preconnect optimization
- Font Awesome 6.4.0 for icons
- Google Fonts - Plus Jakarta Sans for modern typography
- Semantic HTML5 with comprehensive ARIA labels and accessibility
- Responsive viewport configuration
- Meta tags for SEO and theme branding
- Major landing page sections:
  - **Hero Section**: Main value proposition with video demo and trust indicators
  - **Problem-Solution Section**: 3 pain points with solutions
  - **How It Works Section**: 7 core operations with descriptions (HLR check, network testing, offer management, price comparisons, route analysis, automated reporting, quick lookups)
  - **Benefits Section** (implied structure)
  - **Credibility Section** (implied structure)
  - **FAQ Section**: Accordion-based FAQs covering pricing, security, reliability, and integration
  - **Contact Form Section**: Lead capture form with validation, honeypot field, and CAPTCHA protection
  - **Footer**: Standard footer

### css/custom.css (~2981 lines)
- CSS custom properties (variables) for theming with 5 core colors:
  - Primary (White): `#FFFFFF`
  - Secondary (Turquoise): `#1ABC9C`
  - Accent (Orange): `#FF6B35`
  - Dark Text: `#333333`
  - Light Background: `#f8f9fa`
- Comprehensive global resets and element styling
- Detailed hero section styling with gradient backgrounds and decorative elements
- Section-specific styling for all major sections
- Responsive design breakpoints (mobile 320px-480px, tablet 768px, desktop 1024px+)
- Button and link styling with hover states
- Form styling with icons and error states
- Utility classes for colors, spacing, and layout
- Smooth scrolling behavior with `scroll-behavior: smooth`

### js/main.js (~514 lines)
- DOM initialization on `DOMContentLoaded` event
- Bootstrap 5 availability verification
- **Contact Form Validation**:
  - Real-time validation for name, email, phone, and message fields
  - Field-specific error handling and clearing
  - Email format validation
  - Phone number validation (10-15 digits pattern)
- **Honeypot Field**: Hidden field to catch bot submissions
- **CAPTCHA Protection**:
  - Dynamic math CAPTCHA generation
  - Answer validation on form submission
- **Submission Timing Check**: Rejects submissions that occur too quickly (bot detection)
- **Form Submission Handler**: Handles form data with validation and success/error messaging
- **Placeholder comments**: For future implementations:
  - Smooth scroll behavior
  - Form analytics/tracking
  - Telegram bot handlers
  - CDN failure error handling



## Features & Security

### Security Features
- **End-to-End Encryption**: Uses Telegram's native E2E encryption for all communications
- **Bot Protection**: Multi-layer bot detection including:
  - Honeypot field (hidden form field)
  - Submission timing validation
  - Dynamic CAPTCHA math questions
- **Data Privacy**: No sensitive information stored on servers - all operations happen within Telegram's infrastructure
- **No Credit Card Required**: Free trial requires no payment information

### Form Validation
- Real-time validation with immediate user feedback
- Field-specific error messages (name, email, phone format)
- CAPTCHA answer validation before submission
- Success/error message display after submission



This landing page is compatible with the latest versions of:
- ✅ Google Chrome (v90+)
- ✅ Mozilla Firefox (v88+)
- ✅ Apple Safari (v14+)
- ✅ Microsoft Edge (v90+)

## Responsive Design

The landing page is fully responsive and tested at:
- **Mobile**: 320px and 480px widths
- **Tablet**: 768px widths
- **Desktop**: 1024px and 1920px widths

## Verification Checklist

After opening `index.html` in your browser, verify:

- [ ] Bootstrap styles are applied (colored test section)
- [ ] Test section displays with turquoise background (#1ABC9C)
- [ ] Orange bottom border is visible on test section
- [ ] White text is visible on test section
- [ ] No console errors (open DevTools with F12)
- [ ] Console shows "TOPLCR Landing Page Initialized"
- [ ] Bootstrap 5 loaded successfully message in console
- [ ] Page responds correctly when resized to mobile width

## Future Phases

### Phase 2: Django Backend Integration
- REST API endpoints for form submissions
- Database integration
- User authentication
- Telegram bot API integration

### Phase 3: Advanced Features
- Dynamic content loading
- Analytics integration
- Email notification system
- CRM integration

### Phase 4: Production Deployment
- Performance optimization
- SEO enhancements
- Security hardening
- CDN optimization

## Development Notes

- This project uses **no external JavaScript frameworks** - only vanilla JavaScript and Bootstrap CSS
- All styling can be easily customized by modifying CSS custom properties in `css/custom.css`
- The landing page is production-ready with proper semantic HTML and accessibility considerations
- Bootstrap components are available for future enhancements (modals, dropdowns, carousels, etc.)

## CDN Fallback

Bootstrap CSS and JS are loaded from jsDelivr CDN. If the CDN is unavailable:
- CSS will not load, and the page will display without Bootstrap styling
- JavaScript fallback error handler logs a warning to the console (see `js/main.js`)

For production deployment, consider downloading Bootstrap files locally as a fallback.

## Getting Started with Content

To add content to each section:

1. Open `index.html`
2. Find the comment section for the area you want to edit
3. Add content between the opening and closing tags
4. Use Bootstrap classes for consistent styling (e.g., `container`, `row`, `col-*`, `btn`, `btn-primary`)
5. Reference colors from CSS variables for consistency

## License

This project is part of the TOPLCR initiative for telecom sales enablement.

## Support

For questions or issues with the landing page setup, please refer to:
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [HTML5 Specification](https://html.spec.whatwg.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Last Updated**: February 8, 2026  
**Version**: 1.0.0 - Phase 1 Foundation
