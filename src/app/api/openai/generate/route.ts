import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const systemMessage = {
  role: 'system',
  content: 'Você é Houzel, um assistente de IA especializado em corrigir e avaliar redações. Forneça feedback detalhado sobre gramática, estrutura, coerência e estilo.'
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  if (!messages?.length) {
    return NextResponse.json({ error: 'messages ausentes' }, { status: 400 })
  }

  // Prepara histórico completo incluindo o contexto do sistema
  const allMessages = [systemMessage, ...messages]

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: allMessages
  })

  const aiMessage = {
    role: 'assistant',
    content: completion.choices[0].message?.content ?? ''
  }

  // Retorna apenas o histórico do usuário e da AI (sem repetir o systemMessage)
  return NextResponse.json({ messages: [...messages, aiMessage] })
}
