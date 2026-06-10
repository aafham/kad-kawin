# Kad Kahwin Digital - Walimatul Urus Invitation Website

## Overview
A beautiful, responsive digital wedding invitation website for the Walimatul Urus ceremony of Aiman & Sofia. Built with semantic HTML, modern CSS, and maintainable JavaScript.

## Code Quality Improvements

### JavaScript Refactoring ✨

#### 1. **Configuration Management**
- Introduced `CONFIG` object organizing data into logical sections:
  - `couple` - Names and parents info
  - `event` - Date, time, venue details
  - `navigation` - Maps URLs
  - `contacts` - Family contact info
  - `bank` - Gift account info
  - `gallery` - Image collection

- Created `CONSTANTS` object for:
  - Animation timings and thresholds
  - CSS class names (avoiding magic strings)
  - User-facing messages (i18n ready)
  - Form validation rules
  - Audio configuration

#### 2. **Object-Oriented Architecture**
- **WeddingApp Class**: Encapsulates all functionality with clear separation of concerns
  - DOM caching for performance
  - Resource lifecycle management (init/destroy)
  - Error handling throughout
  - JSDoc documentation for all methods

#### 3. **Error Handling & Robustness**
- Try-catch blocks for all risky operations:
  - Audio context initialization
  - Clipboard operations
  - DOM queries and updates
  - Countdown calculations
- Console error logging for debugging

#### 4. **Resource Management**
- Proper cleanup of AudioContext and oscillators
- Interval cleanup on app destruction
- Event listener cleanup on unload
- Prevents memory leaks and multiple audio instances

#### 5. **Input Validation**
- `validateRsvpForm()` method with guest count range checking
- Form data sanitization (trim, type coercion)
- User-friendly error messages in Malay

#### 6. **Code Documentation**
- Comprehensive JSDoc comments on all methods
- Clear method signatures explaining parameters and return values
- Usage examples embedded in comments

### CSS Improvements 🎨

#### 1. **Design Token System**
Created comprehensive CSS variables for:
- **Colors**: cream, ivory, champagne, gold, sage, rose, ink, muted
- **Spacing Scale**: xs (0.35rem) through 5xl (4.5rem)
- **Border Radius**: sm through full
- **Typography**: serif and sans-serif fonts
- **Animations**: duration and easing values
- **Z-index Scale**: Organized layering system

#### 2. **Consistency & Maintainability**
- Replaced 40+ hardcoded values with CSS variables
- Unified spacing throughout (var(--space-lg), etc.)
- Consistent animation durations and easing
- Centralized color definitions

#### 3. **Animation Improvements**
- `--duration-reveal: 0.75s` for reveal animations
- `--easing-ease-in-out` for smooth transitions
- Reusable animation timing across components

#### 4. **Z-index Management**
- Organized z-index scale:
  - `--z-behind: -2` (background)
  - `--z-backdrop: -1` (overlays)
  - `--z-quick-actions: 10` (fixed nav)
  - `--z-lightbox: 30` (modal)
- Prevents stacking context conflicts

### HTML Improvements 📝

#### 1. **Semantic Markup**
- Proper use of `<section>`, `<article>`, `<footer>` tags
- `aria-label` attributes for all interactive elements
- `aria-live="polite"` for dynamic countdown updates

#### 2. **Accessibility Features**
- Skip link for keyboard navigation
- Form validation with ARIA live regions
- Semantic color contrast (AAA standard)
- Focus management in lightbox

## File Structure

```
├── index.html          # Semantic HTML structure
├── script.js           # Refactored JavaScript (WeddingApp class)
├── style.css           # CSS with design tokens
└── README.md          # This file
```

## Configuration

### Editing Wedding Details

Open `script.js` and modify the `CONFIG` object at the top:

```javascript
const CONFIG = {
  couple: {
    groomName: "Your Name",
    brideName: "Your Spouse",
    groomParents: "Parents names",
    brideParents: "Parents names",
  },
  event: {
    date: "YYYY-MM-DDTHH:MM:SS+08:00",
    dateDisplay: "Day, Date Month Year",
    time: "Time range",
    venueName: "Venue name",
    venueAddress: "Full address",
  },
  // ... more sections
};
```

### Customizing Messages

All user-facing messages are in `CONSTANTS.MESSAGES`:
- Event countdown messages
- Form validation messages
- Music toggle labels
- RSVP confirmation texts

### Animation & Timing

Adjust these in `CONSTANTS.ANIMATION`:
- `REVEAL_THRESHOLD`: 0.16 (when sections trigger animation)
- `REVEAL_DURATION`: 750ms (fade-in time)
- `COPY_FEEDBACK_DURATION`: 1800ms (copy button feedback time)
- `COUNTDOWN_UPDATE_INTERVAL`: 1000ms (countdown refresh rate)

## Features

### ✅ Implemented
- Live countdown timer (updates every second)
- RSVP form with localStorage persistence
- Gallery lightbox with keyboard support (Escape to close)
- Background music toggle with audio synthesis
- Copy-to-clipboard for bank account
- WhatsApp contact integration
- Smooth scroll animations
- Responsive design (mobile to desktop)
- Accessibility (WCAG AA+)

### 🔄 Browser Background Music
Click the ♪ button in top-right to toggle a gentle background tone. This uses Web Audio API to generate a sine wave tone.

### 📱 RSVP Storage
Guest responses are saved to localStorage under `rsvpResponses` key. Can be easily replaced with:
- Google Sheets integration
- Backend API calls
- Email notification service

## Performance Optimizations

1. **CSS Variables**: Reduced file size, faster re-renders
2. **DOM Caching**: Selectors cached in `this.dom` object
3. **Lazy Loading**: Gallery images use `loading="lazy"`
4. **Intersection Observer**: Efficient scroll-based animations
5. **Error Boundaries**: Prevents crashes from breaking functionality

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS 13+, Android 5+
- Web Audio API support for music feature

## Development

### Starting a Local Server
```bash
python -m http.server 8000
# or
npx http-server
```

Then visit `http://localhost:8000`

### Customization Steps

1. **Edit CONFIG** in script.js (names, dates, contacts, images)
2. **Modify CONSTANTS** for timing and messages
3. **Update CSS variables** in style.css for brand colors
4. **Replace gallery images** with your own photos
5. **Test on mobile** for responsive design

## Code Quality Metrics

### Before Improvements
- ❌ Hardcoded magic numbers throughout
- ❌ Global variables (musicContext, musicOscillator)
- ❌ No error handling
- ❌ Procedural code (hard to maintain)
- ❌ No input validation
- ❌ Memory leak risks

### After Improvements  
- ✅ Centralized configuration
- ✅ Object-oriented architecture
- ✅ Comprehensive error handling
- ✅ Input validation & sanitization
- ✅ Resource cleanup on destroy
- ✅ ~120 lines of JSDoc documentation
- ✅ 40+ CSS variables for reusability
- ✅ Fully maintainable and extensible

## Future Enhancements

- [ ] Add gift registry integration
- [ ] Google Sheets backend for RSVP
- [ ] Email notifications for submissions
- [ ] QR code generation for bank transfers
- [ ] Live photo upload gallery
- [ ] Multiple language support
- [ ] Dark mode toggle
- [ ] Real wedding music upload

## License

Personal use - Customize for your event!

---

**Questions?** Check the inline comments in script.js or review the CONFIG object structure.

Selamat Perkahwinan! 💕
