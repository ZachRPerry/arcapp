import { SPECIAL_RULES } from "@/lib/game-config"
import { FeedbackDialog } from "@/components/feedback-dialog"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Special Rules - Raid Roulette",
  description: "Browse all available special rules and challenges for Arc Raiders gameplay.",
}

export default function RulesPage() {
  return (
    <main className="flex min-h-svh flex-col px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <header className="flex flex-col gap-6 rounded-xl border border-border/70 bg-card/70 p-4 pb-8 backdrop-blur-sm sm:p-6 sm:pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="size-4" />
            Back to Spinner
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Special Rules
            </h1>
            <p className="mt-2 text-muted-foreground">
              All available special rules and challenges for your Arc Raiders gameplay.
            </p>
          </div>
        </header>

        {/* Rules List */}
        <div className="grid gap-4 sm:grid-cols-2">
          {SPECIAL_RULES.map((rule) => (
            <div
              key={rule.id}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {rule.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {rule.description}
              </p>
              {(rule.requiresMapEvent || rule.requiresNoGunLoadout) && (
                <div className="flex flex-wrap gap-2">
                  {rule.requiresNoGunLoadout && (
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      No Gun Loadout Required
                    </span>
                  )}
                  {rule.requiresMapEvent && (
                    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                      Map: {rule.requiresMapEvent.join(", ")}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center border-t border-border/80 pt-4">
          <FeedbackDialog />
        </div>

        {/* Footer */}
        <footer className="mt-16 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Spinner
          </Link>
        </footer>
      </div>
    </main>
  )
}
