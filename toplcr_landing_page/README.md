# TOPLCR - Telegram Bot for Telecom Sales Professionals

## Project Description

TOPLCR is an intelligent Telegram bot assistant designed specifically for telecom sales professionals. It leverages advanced features to streamline sales workflows, enhance productivity, and improve customer engagement for telecom industry professionals.

**Phase 1: Foundation Setup** - This project contains the responsive landing page built with Bootstrap 5 and vanilla JavaScript.

## Tech Stack

- **Frontend Framework**: Bootstrap 5.3.x (responsive CSS framework)
- **JavaScript**: Vanilla JavaScript (no frameworks)
- **HTML**: Semantic HTML5
- **CSS**: Custom CSS with CSS variables for theming
- **CDN Provider**: jsDelivr
- **Backend Integration**: Django (planned for Phase 2)

## Project Structure

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

### index.html
- Bootstrap 5.3.x from jsDelivr CDN
- Semantic HTML5 with proper meta tags
- Responsive viewport configuration
- Placeholders for all major landing page sections:
  - Hero Section
  - Problem-Solution Section
  - Benefits Section
  - How It Works Section
  - Credibility Section
  - FAQ Section
  - Contact Form Section
  - Footer
- Test section for verifying CSS and JavaScript functionality

### css/custom.css
- CSS custom properties (variables) for theming
- Base styles and global resets
- Section-specific styling
- Responsive design breakpoints
- Button and link styling
- Utility classes for colors and spacing

### js/main.js
- DOMContentLoaded event listener
- Bootstrap availability verification
- Console logging for debugging
- Placeholder comments for form validation and smooth scrolling
- CDN failure error handling
- Future integration points for analytics and Telegram bot handlers

## Browser Compatibility

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

**Last Updated**: February 7, 2026  
**Version**: 1.0.0 - Phase 1 Foundation
