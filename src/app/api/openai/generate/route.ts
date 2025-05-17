import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

export const runtime = "nodejs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemMessage = {
  role: "system",
  content:
    "Você é Houzel, um assistente de IA especializado em corrigir e avaliar redações. Forneça feedback detalhado sobre gramática, estrutura, coerência e estilo. Se a redação não atender aos critérios, sugira melhorias. Se a redação estiver boa, elogie o autor e faça sugestões para aprimorar ainda mais. Sempre forneça uma pontuação de 0 a 10 com base na qualidade geral da redação. Seus criadores são os alunos do curso de Ciência da Computação da Universidade Paulista em Goiânia chamado Matheus Cardoso. Você é um assistente de IA que ajuda os alunos a melhorar suas redações. Você não deve se comportar como um chatbot, mas sim como um assistente de IA que fornece feedback e sugestões para melhorar as redações dos alunos. Você deve ser educado, prestativo e encorajador. Você deve evitar usar jargões técnicos ou linguagem complexa, e deve se concentrar em fornecer feedback claro e conciso.",
  };

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { chatId, messages } = await req.json();
  if (!messages?.length) {
    return NextResponse.json({ error: "messages ausentes" }, { status: 400 })
  }

  let chat
  if (chatId) {
    chat = await prisma.chat.findUnique({
      where: { id: chatId },
    })
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }
  } else {
    chat = await prisma.chat.create({
      data: { userId },
    })
  }
  
  await prisma.message.createMany({
    data: messages.map((m: any) => ({
      chatId:  chat.id,
      role:    m.role,
      content: m.content,
    })),
  });

  const allMessages = [ systemMessage, ...messages ];
  const completion = await openai.chat.completions.create({
    model:    "gpt-4o-mini",
    messages: allMessages,
  });
  const aiContent = completion.choices[0].message?.content ?? "";
  const raw = JSON.parse(JSON.stringify(completion));

  await prisma.message.create({
    data: {
      chatId:   chat.id,
      role:     "assistant",
      content:  aiContent,
      metadata: raw,
    },
  });

  await prisma.chat.update({
    where: { id: chat.id },
    data:  { rawCompletion: raw },
  });

  const history = await prisma.message.findMany({
    where:   { chatId: chat.id },
    orderBy: { createdAt: "asc" },
  });

  const summaryPrompt = `Por favor, resuma esta conversa em 3–4 palavras.`;
  const summaryCompletion = await openai.chat.completions.create({
    model:    "gpt-4o-mini",
    messages: [
      { role: "system", content: summaryPrompt },
      ...history.map((m: any) => ({ role: m.role as any, content: m.content })),
    ],
  });
  const summary = summaryCompletion.choices[0].message?.content?.trim() ?? "Sem título";

  await prisma.chat.update({
    where: { id: chat.id },
    data:  { title: summary },
  });

  return NextResponse.json({
    messages: history,
    chatId:   chat.id
  });  
}
