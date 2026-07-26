# Vantum Website

The landing site for [Vantum](https://github.com/Hammad-hab/Vantum), a lean Puppy Linux variant built on Ubuntu Jammy packages.

## Structure

```
.
├── index.html          # Home page
├── releases.html        # Download / release page
└── css/
    ├── style.css         # Shared/base styles
    └── home.css          # Home page specific styles
└── js/
    ├── release.js         
```

Plain HTML/CSS, no build step, no framework. Fonts (IBM Plex Mono, Inter) are pulled from Google Fonts via `<link>` tags.

## Running locally

Just open `index.html` in a browser, or serve the folder if you want relative paths to behave exactly like production:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing content

- Hero copy, stats, feature cards, roadmap, and FAQ all live directly in `index.html` — no CMS, just edit the markup.
- Reuse existing classes (`.feature`, `.terminal`, `.about-strip`, `.stat`) when adding new sections so they inherit styling from `home.css` without extra work.
- Keep the roadmap section in sync with the project's actual TODO — it's meant to reflect real status, not marketing copy.

## Deploying

Static site — push to whatever host serves the repo (GitHub Pages, Netlify, etc). No build/compile step required.

## License

Matches the license of the main [Vantum](https://github.com/Hammad-hab/Vantum) repository.