# Dumpster Directory

Static US dumpster-rental directory. Brand name: **Dumpster Directory**. Operator: Jordan Craig, craigja88@gmail.com. Live URL: https://craigja88-sudo.github.io/ . No custom domain / CNAME.

Plain HTML, one CSS file (`css/site.css`), a little vanilla JS (`js/site.js`). No build step.

```bash
python3 -m http.server 8765 --directory /workspace/which-dumpster
```

Then open http://127.0.0.1:8765/ . Opening the HTML files directly also works (search and forms are DOM-only; they do not fetch JSON).

## How to add a city

1. Pick a real US city. Choose a slug like `miami-fl` (city, hyphen, lowercase state abbreviation).
2. Copy `cities/_template.html` to `cities/{slug}.html`.
3. Replace `{{CITY}}`, `{{ST}}`, `{{STATE_NAME}}`, and `{{SLUG}}`. Write a short local intro that is generally true (climate, construction mix, city vs county permit desks). **Do not invent company names, phones, reviews, or municipal fees.**
4. Add the city to `data/cities.json`:
   `{"name": "Miami", "slug": "miami-fl", "state": "FL", "stateName": "Florida"}`
5. Remove that object from `data/city-queue.json` if it was queued.
6. Add the new city to the visible lists by copying a list item in `index.html` and `cities/index.html` (same `data-filter` pattern as existing cities). National directory: do not pin or feature Miami over other cities; search is the front door.
7. Add the URL to `sitemap.xml`.
8. Keep the in-content affiliate line next to the quote CTA: “We may earn a commission if you book through this site.”
9. Leave **Local haulers** as “Coming soon” until you have a verified company.

Nightly publishes can take the next row from `data/city-queue.json` (real US cities waiting).

## Pages

- `index.html` — city search as the front door, how it works, size snapshot, quote placeholder (FTC disclosure by the CTA). National database, no launch-city featured block.
- `sizes.html` — 10/15/20/30/40 yard guide + project chooser.
- `permits.html` — driveway vs street; check with the city; no invented fees.
- `pricing.html` — honest US ranges; weight, days, distance, overage.
- `cities/` — city guides. Treat every city equally; do not pin Miami.
- `guides/` — roof, kitchen remodel, garage cleanout, whole-house cleanout, concrete/dirt (weight warning).
- `for-haulers.html` — featured listing, finder's fee on completed jobs, 60-day out. mailto:craigja88@gmail.com.
- `privacy.html` — operator, email, form behavior, fonts, affiliates.
- `404.html` — GitHub Pages not-found page.

Quote CTAs are placeholders for later affiliate wiring.

## Partner ledger

`ops/ledger.csv` is the payment log for affiliate/partner payouts. Columns: `date, partner, city, tracking_email, status, amount, notes`. Add a row when a booking is confirmed and a commission is owed. Do not record amounts until then.

