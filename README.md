# NSBLPA Prototype

A mobile‑first, responsive redesign prototype for **NSBLPA.com**, inspired by **nfl.com** and **fvnsport.com**. Built with semantic HTML5, custom CSS, and vanilla JS (no build tools).

Note: no php used so you can run by directly file open.

## Folder Structure

```
nsblpa-prototype/
├─ index.html
├─ ownership.html
├─ teams.html
├─ apps.html
├─ contact.html
├─ assets/
│  ├─ styles.css
│  ├─ scripts.js
│  ├─ logo.svg
│  └─ team-logos/
│     ├─ ny.svg  atl.svg  den.svg  chi.svg  tx.svg  dc.svg  mia.svg
```

## How to Run Locally

No build step. Works fully offline.

1. Download and unzip this folder.
2. Open `index.html` in your browser.
3. Navigate via the top navigation.

> Tip: For a cleaner local preview with proper file routing, you can also start a simple local server (optional):

## Design & Implementation Notes

- **Mobile‑first**: Base styles target small screens; progressive enhancements with media queries at 720px and 1000px.
- **Look & Feel**: Navy/indigo dark theme with subtle gradients, soft shadows, rounded corners, and clear hierarchy inspired by major sports sites.
- **Grid System**: CSS Grid for cards and teams; Flexbox for header/footer layouts.
- **Typography**: System font stack (no external requests) for performance. Clear headings and muted body copy for contrast.
- **Accessibility**: Semantic landmarks (`header`, `main`, `footer`), skip link, focus states, labeled form controls, descriptive alt text, `details/summary` for FAQs.
- **Performance**: No external fonts or frameworks; single CSS & JS file; SVG logos (tiny & crisp); optimized DOM.
- **No Boilerplate Bootstrap**: 100% custom CSS. (Tailwind/Bootstrap were allowed but avoided to ensure offline + bespoke design.)

## Content Mapping

- **Home**: Hero + Quick Links to Teams & Apps + Feature split.
- **Ownership**: Benefits, process steps, and FAQs — structurally modeled after “ownership” patterns.
- **Teams**: Grid of 7 teams with local SVG logos and required outbound links.
- **Apps**: Grouped lists for Team apps, Fan apps, and League/Owners/Players/Network with **Play Store** links.
- **Contact**: Email form with client‑side validation (demo logs to console) + league contact info.

## Assumptions

- Exact copy and assets from NSBLPA.com are not provided, so content is editorial placeholder focusing on structure and UX.
- Contact form is front‑end only per assignment scope; backend submission intentionally omitted.
- All links to teams and apps open in a new tab with `rel="noopener"` for safety.

## How to Record Loom (for the submission)

1. Open the project locally.
2. Start Loom (or any screen recorder).
3. Show: mobile view (responsive dev tools), navigation, hero, teams grid, apps lists, contact form validation.
4. Keep under 3 minutes; narrate design decisions briefly (mobile‑first, grids, accessibility, performance).

## Optional: Deploy to GitHub Pages

1. Create a repo named `nsblpa-prototype`.
2. Push these files.
3. In **Settings → Pages**, select branch `main` and `/root`.
4. Share the Pages URL in your email.

---

**Author:** Swati Pansuriya • © NSBLPA
