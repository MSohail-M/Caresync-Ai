import { NextRequest, NextResponse } from 'next/server'

// Sarah – professional female AI receptionist voice
const AI_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'
// Adam – male patient voice (free ElevenLabs voice)
const PATIENT_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'

export async function POST(request: NextRequest) {
  const { text, speaker } = await request.json() as { text: string; speaker: string }

  const apiKey = process.env.ELEVEN_LABS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 501 })
  }

  const voiceId = speaker === 'ai' ? AI_VOICE_ID : PATIENT_VOICE_ID

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.48,
          similarity_boost: 0.78,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    }
  )

  if (!upstream.ok) {
    const err = await upstream.text()
    console.error('ElevenLabs error:', upstream.status, err)
    return NextResponse.json({ error: 'ElevenLabs API error', detail: err }, { status: upstream.status })
  }

  const audio = await upstream.arrayBuffer()

  return new NextResponse(audio, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
