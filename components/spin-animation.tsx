"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SpinAnimationProps {
  isSpinning: boolean
  onComplete: () => void
  duration?: number
}

const GLYPHS = [
  "//SCANNING",
  ">>LOADING",
  "##DECRYPT",
  "..ANALYZE",
  "**PROCESS",
  "<<DEPLOY",
  "~~SEARCH",
  "!!LOCKED",
  "@@ACTIVE",
  "--RANDOM",
]

export function SpinAnimation({ isSpinning, onComplete, duration = 2500 }: SpinAnimationProps) {
  const [tick, setTick] = useState(0)
  const [phase, setPhase] = useState<"idle" | "spinning" | "done">("idle")

  useEffect(() => {
    if (!isSpinning) {
      setPhase("idle")
      return
    }

    setPhase("spinning")
    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 80)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setPhase("done")
      onComplete()
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isSpinning, duration, onComplete])

  if (phase === "idle") return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        phase === "done" && "animate-out fade-out duration-300"
      )}
      role="status"
      aria-label="Spinning for random result"
    >
      <div className="flex flex-col items-center gap-4">
      {phase === "spinning" && (
        <>
          {/* Outer ring animation */}
          <div className="relative flex items-center justify-center">
            <div className="absolute size-28 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/40" style={{ animationDuration: "0.8s" }} />
            <div className="absolute size-20 animate-spin rounded-full border-2 border-transparent border-b-primary/60 border-l-primary/20" style={{ animationDuration: "0.5s", animationDirection: "reverse" }} />

            {/* Center glyph */}
            <div className="z-10 flex size-14 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary">
              {GLYPHS[tick % GLYPHS.length]}
            </div>
          </div>

          {/* Scrolling text bar */}
          <div className="w-full max-w-xs overflow-hidden rounded border border-border bg-secondary/50 px-3 py-1.5">
            <p className="animate-pulse font-mono text-xs text-primary tracking-wider text-center">
              {">>> RANDOMIZING PARAMETERS <<<"}
            </p>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all ease-linear"
              style={{
                width: `${Math.min(100, (tick * 80 / duration) * 100)}%`,
                boxShadow: "0 0 10px rgba(0,220,180,0.5)",
              }}
            />
          </div>
        </>
      )}
      </div>
    </div>
  )
}
