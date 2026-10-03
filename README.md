# Ultraviolet Google-Style UI

This is the frontend shell for an Ultraviolet proxy.

## Current state

The page is intentionally standalone right now:
- Google-style layout
- Search/URL input
- URL normalization
- Search fallback
- Responsive design

## Connecting Ultraviolet

The `script.js` file contains the spot where the UV service-worker routing should be connected.

Do not simply expose an arbitrary public proxy endpoint without adding appropriate access controls and abuse protections. For a personal deployment, run the Ultraviolet server under your own domain and configure the frontend to use that instance.

## Files

- `index.html` — page markup
- `style.css` — Google-style UI
- `script.js` — input behavior and navigation
