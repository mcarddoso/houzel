"use client"

import { ChatPanel } from "@/components/ChatPanel";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardChatPage() {
    const params = useParams();
    const rawId = params.chatId;
    const chatId = Array.isArray(rawId) ? rawId[0] : rawId;

    const [initialMessages, setInitialMessages] = useState<any[]>([]);
    const [initialChat, setInitialChat] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!chatId) return;
        fetch(`/api/messages/${chatId}`)
            .then((res) => res.json())
            .then(({ messages }: { messages: any[] }) => {
                setInitialMessages(messages);
                setLoading(false);
            })
            .catch(console.error);
        
        fetch(`/api/chats/${chatId}`)
            .then((res) => res.json())
            .then(({ chat }: { chat: any[] }) => {
                setInitialChat(chat);
                setLoading(false);
            })
            .catch(console.error);
    }, [chatId]);

    if (!chatId) {
        return <div>Chat não encontrado.</div>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader className="animate-spin" />
            </div>
        );
    }

    return (
        <ChatPanel initialMessages={initialMessages} chatId={chatId} initialChat={initialChat} />
    );
}
