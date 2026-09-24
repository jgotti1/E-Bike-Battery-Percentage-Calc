# E-Bike Battery Percentage Calculator

A simple, mobile-first web app that estimates how much charge is left in an e-bike battery from its pack voltage.

**Live site:** https://ebikebattery.margotticode.com

## How it works

1. Choose your bike (or "Other bike / battery" to enter the cell count yourself).
2. Enter the battery's current voltage, read from a multimeter or the bike's display.
3. Tap **Calculate** to see the estimated charge.

The app divides the pack voltage by the number of cells in series, then interpolates that per-cell voltage against a table of approximate resting Li-ion voltages. The curve is deliberately non-linear, since Li-ion voltage doesn't drop evenly as the battery drains. Results are clamped to 0-100%.

The result is color coded: green at 50% or more, amber at 20-49%, and red under 20%. The battery pack on the bike illustration fills and changes color to match.

For the best accuracy, measure with the bike at rest, since voltage sags under load. The percentage is an estimate, not an exact reading.

## Supported bikes

Lectric XP4 750/500, XPress 750, XPeak 2.0, XPedition, XP 3.0, XP 2.0, XP Trike, XP 1.0, ONE, XP Lite 2.0 and XP Lite. Cell counts for the XP Lite, XP 1.0 and ONE entries are unconfirmed guesses, so check the label on your battery. Use "Other bike / battery" for anything else.

## Running locally

There is no build step, package manager, or dependencies to install. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server
```

Bootstrap 5.3.2 loads from the jsDelivr CDN, so the page needs network access to be styled.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup, inline SVG bike illustration, and all styles |
| `percent.js` | Bike list (`BIKES`), voltage curve (`CELL_CURVE`), and calculation logic |

The two files are coupled through element IDs (`batteryForm`, `bike`, `cellsGroup`, `cells`, `currentVolts`, `result`), so renaming an ID in one requires updating the other.

To add a bike, add an entry to the `BIKES` array in `percent.js`.

## Deployment

Hosted on Vercel. Pushing to `main` deploys to production automatically. Usage is tracked with Vercel Web Analytics, which uses no cookies or visitor identifiers.

## Support

If you like the app, check out my [Etsy store](https://jmcreationshub.etsy.com) for e-bike accessories, or buy me a coffee on Venmo (@John-Margotti).

## Portfolio card

The block below is machine-readable project info for a portfolio site (invisible on GitHub). Keep it in sync when the project, URL or tech changes. To build a card: read this JSON and use `title`, `tagline`/`description`, `thumbnail`, `tech`, and link to `liveUrl` and `repoUrl`.

<!-- portfolio-card:start
{
  "title": "E-Bike Battery Calculator",
  "category": "web app",
  "tagline": "Estimate how much charge is left in an e-bike battery from its voltage.",
  "description": "A mobile-first calculator for Lectric e-bike owners. Pick your bike, enter the battery's current voltage, and it converts the pack voltage to a per-cell reading and interpolates it against a non-linear Li-ion discharge curve. The result shows a percentage, a color-coded gauge, and a bike illustration whose battery fills to match.",
  "liveUrl": "https://ebikebattery.margotticode.com",
  "repoUrl": "https://github.com/jgotti1/E-Bike-Battery-Percentage-Calc",
  "thumbnail": "https://raw.githubusercontent.com/jgotti1/E-Bike-Battery-Percentage-Calc/main/docs/preview.jpg",
  "tech": ["HTML", "CSS", "JavaScript", "Bootstrap 5", "SVG", "Vercel"],
  "features": [
    "Preset cell counts for Lectric bike models, plus a custom option",
    "Non-linear per-cell Li-ion voltage curve for realistic estimates",
    "Green, amber and red result gauge",
    "Bike illustration with a battery that fills to match the result",
    "Full-screen, touch-friendly layout on phones"
  ],
  "platforms": ["mobile", "tablet", "desktop"],
  "status": "live",
  "origin": "Personal project"
}
portfolio-card:end -->
