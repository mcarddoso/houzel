import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ chatId: string }> }
) {
    const { chatId } = await params

    const chat = await prisma.chat.findUnique({
        where: { id: chatId },
        include: { messages: true },
    })

    if (!chat) {
        return NextResponse.json({ chat: [] }, { status: 404 })
    }
    return NextResponse.json({ chat: chat })
}
