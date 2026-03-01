import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { urlList, keyLocation } = body

    // Notify Bing IndexNow
    const bingResponse = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'raidroulette.com',
        key: 'fc129c9c1e584edc9dbabebd7a1202ae',
        keyLocation: keyLocation || 'https://raidroulette.com/indexnow-key.txt',
        urlList: urlList,
      }),
    })

    if (bingResponse.ok) {
      return NextResponse.json(
        { success: true, message: 'URLs submitted to IndexNow' },
        { status: 200 }
      )
    } else {
      throw new Error('Failed to submit to IndexNow')
    }
  } catch (error) {
    console.error('[IndexNow] Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow' },
      { status: 500 }
    )
  }
}
