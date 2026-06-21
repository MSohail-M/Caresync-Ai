import { NextRequest, NextResponse } from 'next/server'

// Bella – warm, bright, professional American female (AI receptionist)
const AI_VOICE_ID = 'hpp4J3VqNfWAUOO0d1Us'
// Roger – easy-going, casual American male (patient caller)
const PATIENT_VOICE_ID = 'CwhRBWXzGAHq8TQ4Fs17'

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
          stability: 0.42,          // lower = more expressive, natural cadence
          similarity_boost: 0.85,   // stays true to the chosen voice
          style: 0.15,              // slight style boost for personality
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
