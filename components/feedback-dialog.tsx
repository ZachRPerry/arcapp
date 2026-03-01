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
  const [email, setEmail] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://formbold.com/s/9E4Vk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, suggestion }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      // Track feedback submission in Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'feedback_submitted', {
          'has_email': !!email,
          'suggestion_length': suggestion.length
        })
      }

      setSubmitted(true)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Failed to submit suggestion. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        // Reset form when dialog closes
        setSubmitted(false)
        setEmail("")
        setSuggestion("")
        setIsSubmitting(false)
      }
    }}>
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
              <label htmlFor="feedback-email" className="text-sm font-medium text-foreground">
                Your Email <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="feedback-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="raider@example.com"
                disabled={isSubmitting}
                className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isSubmitting}
                className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <Button
              type="submit"
              disabled={!suggestion.trim() || isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Suggestion"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
