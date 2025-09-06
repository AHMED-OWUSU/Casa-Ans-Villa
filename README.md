# CASA Villa - Luxury Accommodation Website

A premium, high-end website for CASA Villa featuring modern design, interactive galleries, and luxury aesthetics.

## 🌟 Features

### Design & User Experience
- **Luxury Design System** - Premium typography, elegant color palette, and sophisticated animations
- **Responsive Design** - Mobile-first approach with seamless experience across all devices
- **Video Hero Section** - Immersive video background with elegant overlay
- **Interactive Room Gallery** - Detailed room modals with image carousels and booking integration
- **Lightbox Gallery** - Professional image viewing with navigation controls
- **Smooth Animations** - Subtle, refined transitions and scroll effects

### Technical Excellence
- **Performance Optimized** - Lazy loading, image optimization, and efficient caching
- **PWA Ready** - Progressive Web App capabilities with offline support
- **SEO Optimized** - Semantic HTML, meta tags, and structured data
- **Accessibility Compliant** - WCAG guidelines with keyboard navigation and screen reader support
- **Modern Standards** - HTML5, CSS3, ES6+, and best practices

### Interactive Features
- **Dynamic Navigation** - Smooth scrolling with active section highlighting
- **Contact Form** - Validated form with notification system
- **Room Booking Integration** - Seamless flow from room viewing to booking
- **Social Media Integration** - Ready for social sharing and engagement
- **Analytics Ready** - Event tracking and performance monitoring

## 🚀 Quick Start

### Prerequisites
- Web server (Apache, Nginx, or local development server)
- Modern web browser with JavaScript enabled

### Installation

1. **Clone or Download** the project files to your web server directory
2. **Upload Assets** - Ensure all images and videos are in the correct `casa assets/` directory
3. **Configure Server** - Set up your web server to serve the files
4. **Access Website** - Open `index.html` in your browser

### Local Development

For local development, you can use any of these methods:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP (if installed)
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
casa1/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and design system
├── script.js               # JavaScript functionality
├── sw.js                   # Service Worker for PWA
├── manifest.json           # PWA manifest
├── README.md               # This file
└── casa assets/            # Media assets
    ├── images/
    │   ├── casa logo.png
    │   ├── gallery/        # Gallery images
    │   ├── hero images/    # Hero section images
    │   ├── room 1 images/  # Room 1 photos
    │   ├── room 2 images/  # Room 2 photos
    │   ├── room 3 images/  # Room 3 photos
    │   └── room 4 images/  # Room 4 photos
    └── intro video/
        └── CASA ANS villa 2.mp4
```

## 🎨 Customization

### Colors
The color scheme is defined in CSS custom properties in `styles.css`:

```css
:root {
    --primary-gold: #D4AF37;
    --secondary-gold: #B8860B;
    --deep-navy: #1a1a2e;
    --charcoal: #2c2c54;
    --warm-white: #fafafa;
    /* ... more colors */
}
```

### Typography
- **Primary Font**: Playfair Display (headings)
- **Secondary Font**: Inter (body text)
- **Icons**: Font Awesome 6.4.0

### Content Updates
- **Room Information**: Edit the `roomData` object in `script.js`
- **Contact Information**: Update the contact section in `index.html`
- **Images**: Replace images in the `casa assets/` directory
- **Video**: Replace the hero video in `casa assets/intro video/`

## 📱 PWA Features

The website includes Progressive Web App capabilities:

- **Offline Support** - Cached content available when offline
- **Install Prompt** - Users can install the app on their devices
- **App Shortcuts** - Quick access to booking and gallery
- **Background Sync** - Form submissions sync when connection is restored
- **Push Notifications** - Ready for booking confirmations

## 🔧 Performance Optimizations

- **Lazy Loading** - Images load as they come into view
- **Image Optimization** - Proper sizing and compression
- **Caching Strategy** - Service Worker caches static assets
- **Minification Ready** - Code structure supports easy minification
- **CDN Integration** - External resources loaded from CDN

## 📊 Analytics & Tracking

The website includes tracking for:
- Room detail views
- Gallery interactions
- Contact form submissions
- Button clicks and user engagement

## 🌐 Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: Progressive enhancement ensures basic functionality on older browsers

## 📞 Support & Contact

For technical support or customization requests:
- **Email**: info@casavilla.com
- **Phone**: +1 (555) 123-4567

## 📄 License

This project is proprietary software created for CASA Villa. All rights reserved.

---

**CASA Villa** - Where luxury meets comfort in perfect harmony.
