# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static, single-page e-bike battery percentage calculator, designed mobile-first since it's mostly used on phones. There is no build step, package manager, linter, or test suite. Open `index.html` directly in a browser to run it (or serve the folder with `python3 -m http.server`).

## Deployment

Hosted on Vercel (project `ebike-battery-percent`, team `john-74e3`) at https://ebikebattery.margotticode.com. The Vercel project is connected to the GitHub repo `jgotti1/E-Bike-Battery-Percentage-Calc`, so pushing to `main` deploys to production automatically. Manual deploy: `npx vercel deploy --prod`.

DNS is at Bluehost (A record `ebikebattery` -> `76.76.21.21`). The name `battery` was abandoned because Bluehost never published that record, so don't reuse it.

## Architecture

- `index.html` holds the form (`#batteryForm`) with the bike dropdown, cells-in-series and current-voltage inputs, an empty `#result` div, an inline SVG bike illustration (`.bike-art`), and all page styles (CSS variables and `.app-*` / `.result-*` classes in an inline `<style>`). On phones the card is full-screen with large touch targets; the floating centered card only applies at 576px and wider. Input font sizes must stay 16px or larger to avoid iOS zoom on focus. Bootstrap 5.3.2 loads from the jsDelivr CDN, so the page needs network access to be styled.
- The bike dropdown (`#bike`) is populated from the `BIKES` array in `percent.js` and fills the hidden `#cells` field. The "Other" option reveals `#cells` for manual entry. Add new bikes there. Cell counts for the XP Lite, XP 1.0 and ONE entries are unconfirmed guesses.
- `percent.js` is loaded at the end of `<body>`. On submit it divides pack voltage by cell count and interpolates the per-cell voltage against `CELL_CURVE`, a table of approximate resting Li-ion voltage to charge. The curve is deliberately non-linear, so don't replace it with a min/max linear formula. Results are clamped to 0–100%.
- The two files are coupled through element IDs (`batteryForm`, `bike`, `cellsGroup`, `cells`, `currentVolts`, `result`). Renaming an ID in one file requires updating the other.
- The result box shows the percentage, a gauge bar, and per-cell voltage, colored green (50%+), amber (20-49%) or red (under 20%) via CSS variables. The battery pack in the bike SVG (`#bikeFill`) is resized and recolored from `percent.js` to match. Set its color with `style.fill`, since SVG attributes don't resolve `var()` reliably.
