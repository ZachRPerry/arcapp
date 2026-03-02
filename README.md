# Raid Roulette

A randomizer tool for Arc Raiders that generates random game loadouts, maps, and special rules.

## Features

- 🎲 Random weapon loadout generator
- 🗺️ Map selection (events + base maps)
- ⚡ Special rules and challenges
- 📱 Responsive design
- 🎨 Dark mode optimized
- 📊 Google Analytics integration
- 🔍 SEO optimized

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Analytics:** Google Analytics + Vercel Analytics
- **Deployment:** Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Or build and run directly with Docker
docker build -t raid-roulette .
docker run --rm -p 3000:3000 raid-roulette
```

Open `http://localhost:3000` in your browser.

If Docker Desktop shows a URL like `http://<container-id>:3000`, that hostname is usually only resolvable inside Docker networks. Use `localhost` (or your machine IP + mapped port) from Windows/macOS browsers.

## Project Structure

```
arcapp/
├── app/
│   ├── api/           # API routes (events, indexnow)
│   ├── layout.tsx     # Root layout with SEO
│   ├── page.tsx       # Homepage
│   └── sitemap.ts     # Dynamic sitemap
├── components/
│   ├── ui/            # Reusable UI components
│   ├── feedback-dialog.tsx
│   ├── game-spinner.tsx
│   ├── option-selector.tsx
│   ├── spin-animation.tsx
│   └── spin-results.tsx
├── lib/
│   ├── game-config.ts # Weapons, maps, rules
│   └── utils.ts       # Utility functions
└── public/            # Static assets
```

## Configuration

Update the following in your deployment:
- Domain in `app/layout.tsx` metadata
- Domain in `app/sitemap.ts`
- Domain in `public/robots.txt`

## License

Built for the Arc Raiders community. Not affiliated with Embark Studios.
