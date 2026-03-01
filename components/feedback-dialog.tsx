"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageSquarePlus } from "lucide-react"

export function FeedbackDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In production, this would POST to an API route / database
    console.log("[v0] Feedback submitted:", { name, suggestion })
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setName("")
      setSuggestion("")
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50">
          <MessageSquarePlus className="size-4" />
          Suggest a Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Suggest a Special Rule</DialogTitle>
          <DialogDescription>
            Have an idea for a new special rule? Share it below and we may add it to the spinner.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-2 py-6">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageSquarePlus className="size-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Thanks for your suggestion!</p>
            <p className="text-xs text-muted-foreground">We will review it soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback-name" className="text-sm font-medium text-foreground">
                Your Name <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="feedback-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Raider123"
                className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback-suggestion" className="text-sm font-medium text-foreground">
                Rule Suggestion <span className="text-destructive">*</span>
              </label>
              <textarea
                id="feedback-suggestion"
                required
                rows={3}
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="e.g. Pistols Only - You can only use pistol-class weapons..."
                className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={!suggestion.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Suggestion
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
