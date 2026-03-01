'use client'

import { useEffect } from 'react'

interface GoogleAdProps {
  slot: string
  format?: string
  responsive?: boolean
}

export function GoogleAd({ slot, format = 'auto', responsive = true }: GoogleAdProps) {
  useEffect(() => {
    // Push the ad to Google's queue to be processed
    if (typeof window !== 'undefined') {
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      ;(window as any).adsbygoogle.push({})
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8963796494044865"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  )
}
