import { GameSpinner } from "@/components/game-spinner"

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center px-4 py-6 sm:px-6 sm:py-8">
      <section className="retro-shell relative isolate w-full overflow-hidden p-6 sm:p-10">
        <div className="relative z-10 flex w-full flex-col items-center gap-8">
          <header className="flex w-full max-w-3xl flex-col items-center gap-3">
            <h1 className="text-center text-4xl font-black tracking-tight text-foreground uppercase sm:text-6xl">
              RaidRoulette
            </h1>
            <div className="flex w-full items-center gap-4">
              <span className="retro-divider" />
              <p className="text-sm font-bold tracking-[0.22em] text-primary uppercase sm:text-lg">
                raidroulette.com
              </p>
              <span className="retro-divider" />
            </div>
          </header>

          <GameSpinner />
        </div>
      </section>

      <footer className="mt-6 flex flex-col items-center gap-2 pb-4 text-center">
        <p className="text-xs text-muted-foreground/70">
          Map data provided by{" "}
          <a
            href="https://metaforge.app/arc-raiders"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary/90 underline underline-offset-2 transition-colors hover:text-primary"
          >
            MetaForge
          </a>
        </p>
        <p className="text-xs text-muted-foreground/50">
          Not affiliated with Embark Studios. Built for the Arc Raiders community.
        </p>
      </footer>
    </main>
  )
}
