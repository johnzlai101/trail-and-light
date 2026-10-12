# Trail & Light — Trip Journal

A personal photo trip journal. Static site, no build step, no external
dependencies (no Google Fonts, no CDNs) — loads fast everywhere, including
mainland China.

## Files

- `index.html` — homepage with trip cards
- `trip.html` — trip detail page (opened as `trip.html?id=trip-id`)
- `admin.html` — fill-in form that generates the JSON for a new trip
- `css/styles.css` — all styling
- `js/trips.js` — **your trips live here** (edit this to add trips)
- `js/app.js` — rendering logic
- `photos/` — put your photos and mp4 videos here

Photos are always displayed at their **original aspect ratio** — never cropped.

## Add a new trip

1. Copy photos into `photos/` (simple filenames, no spaces).
2. Open `admin.html` in a browser, fill the form, click **Generate JSON**, copy it.
3. Paste it into `js/trips.js` inside the `TRIPS` array (after the previous
   trip's closing `},`).
4. Open `index.html` to preview.

## Publish to Cloudflare Pages (free)

**Option A — drag & drop (fastest, no GitHub needed):**
1. Go to https://dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets.
2. Name the project (e.g. `trail-and-light`), drag this whole folder in, Deploy.
3. You get `https://trail-and-light.pages.dev` — live in ~1 minute.

**Option B — GitHub (auto-redeploy on every update):**
1. Push this folder to a GitHub repo.
2. Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: framework preset **None**, build command empty, output directory `/`.
4. Every `git push` redeploys automatically.

Later you can add a custom domain in Pages → Custom domains (free SSL included).
No ICP filing is needed since the site is hosted outside mainland China.

## China-access notes

- No Google services, no third-party fonts/scripts — nothing for the firewall to block.
- Keep total page weight reasonable (compress photos; ~200–400 KB each is plenty for web).
- Videos: use plain `.mp4` files in `photos/` and list them in the trip's `videos` array.

## Import photos quickly (after a hike)

Export JPGs (and reframed flat MP4s from the Osmo 360) into an `inbox/` folder,
then run:

```bash
./scripts/prep-photos.sh inbox chocorua
```

It resizes everything to web size (longest edge 1920px, original aspect ratio —
never cropped), drops the files into `photos/`, and prints the JSON lines to
paste into `js/trips.js`. Add captions to each line, preview `index.html`,
then redeploy.

## Deployment

Auto-deploys to Cloudflare Pages from GitHub: push to `main` and the site
at https://trail-and-light.pages.dev updates within a minute or two.
No build command; the repo root is served as-is.
