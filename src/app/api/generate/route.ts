import { NextResponse } from 'next/server'
import { OpenAIStreamPayload, OpenAIStream } from '@/utils/openAiStream'
export const runtime = 'edge'

export const POST = async (request: Request) => {
  const res = await request.json()
  const { prompt } = res
  if (!prompt) return new Response('No propmt provided', { status: 400 })

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
