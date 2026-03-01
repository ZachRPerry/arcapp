import { GameSpinner } from "@/components/game-spinner"
import { GoogleAd } from "@/components/google-ad"

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center px-4 py-10 sm:py-16">
      {/* Header */}
      <header className="flex flex-col items-center gap-3 pb-10">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-6 text-primary"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
              <polyline points="2 15.5 12 8.5 22 15.5" />
              <line x1="12" y1="2" x2="12" y2="8.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
            Raid Roulette
          </h1>
        </div>
        <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          Randomize your next drop. Pick your categories, hit spin, and see what the mission demands.
        </p>
      </header>

      {/* Spinner */}
      <GameSpinner />

      {/* Footer */}
      <footer className="mt-auto flex flex-col items-center gap-2 pt-10 pb-4">
        <p className="text-xs text-muted-foreground/60 text-center">
          Map data provided by{" "}
          <a
            href="https://metaforge.app/arc-raiders"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/80 underline underline-offset-2 transition-colors hover:text-primary"
          >
            MetaForge
          </a>
        </p>
        <p className="text-xs text-muted-foreground/40 text-center">
          Not affiliated with Embark Studios. Built for the Arc Raiders community.
        </p>
      </footer>

      {/* Google Ad */}
      <div className="w-full flex justify-center pt-8">
        <GoogleAd slot="2154540259" format="horizontal" responsive={true} />
      </div>
    </main>
  )
}
