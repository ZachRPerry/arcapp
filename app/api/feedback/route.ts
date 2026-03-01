import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, suggestion } = body

    if (!suggestion || typeof suggestion !== "string") {
      return NextResponse.json(
        { error: "Suggestion is required" },
        { status: 400 }
      )
    }

    const submission = {
      email: email || "Anonymous",
      suggestion,
      timestamp: new Date().toISOString(),
    }

    // Store in data/feedback.json
    const dataDir = join(process.cwd(), "data")
    const filePath = join(dataDir, "feedback.json")

    // Ensure data directory exists
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (err) {
      // Directory might already exist
    }

    // Read existing feedback or initialize empty array
    let feedbackList = []
    try {
      const fileContent = await readFile(filePath, "utf-8")
      feedbackList = JSON.parse(fileContent)
    } catch (err) {
      // File doesn't exist yet, start with empty array
    }

    // Add new submission
    feedbackList.push(submission)

    // Write back to file
    await writeFile(filePath, JSON.stringify(feedbackList, null, 2), "utf-8")

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error saving feedback:", error)
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    )
  }
}
