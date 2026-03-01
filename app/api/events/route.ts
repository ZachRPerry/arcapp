import { NextResponse } from "next/server"

export interface MapEvent {
  name: string
  map: string
  icon: string
  startTime: number
  endTime: number
}

export async function GET() {
  try {
    const res = await fetch("https://metaforge.app/api/arc-raiders/events-schedule", {
      next: { revalidate: 300 }, // cache for 5 minutes across all users
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch events schedule" },
        { status: 502 }
      )
    }

    const json = await res.json()
    // MetaForge wraps the array in { data: [...] }
    const events: MapEvent[] = Array.isArray(json) ? json : json.data ?? []
    return NextResponse.json(events)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch events schedule" },
      { status: 500 }
    )
  }
}
