import { GameSpinner } from "@/components/game-spinner"

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center px-4 py-10 sm:py-16">
      {/* Header */}
      <header className="flex flex-col items-center gap-3 pb-10">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Raid Roulette Logo" className="size-10" />
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

    </main>
  )
}
