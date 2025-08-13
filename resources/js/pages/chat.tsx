import Conversation from '@/components/conversation';
import TitleGenerator from '@/components/title-generator';
import SidebarTitleUpdater from '@/components/sidebar-title-updater';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useStream } from '@laravel/stream-react';
import { ArrowUp, Info } from 'lucide-react';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

type Message = {
    id?: number;
    type: 'response' | 'error' | 'prompt';
    content: string;
};

type ChatType = {
    id: number;
    title: string;
    messages: Message[];
    created_at: string;
    updated_at: string;
};

type PageProps = {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    chat?: ChatType;
    flash?: {
        stream?: boolean;
    };
};

function ChatWithStream({ chat, auth, flash }: { chat: ChatType | undefined; auth: PageProps['auth']; flash: PageProps['flash'] }) {
    const [messages, setMessages] = useState<Message[]>(chat?.messages || []);
    const [currentTitle, setCurrentTitle] = useState<string>(chat?.title || 'Untitled');
    const [shouldGenerateTitle, setShouldGenerateTitle] = useState<boolean>(false);
    const [isTitleStreaming, setIsTitleStreaming] = useState<boolean>(false);
    const [shouldUpdateSidebar, setShouldUpdateSidebar] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const currentChatId = chat?.id || null;
    const streamUrl = currentChatId ? `/chat/${currentChatId}/stream` : '/chat/stream';

    const { data, send, isStreaming, isFetching, cancel, id } = useStream(streamUrl);

    // Auto-focus input and handle auto-streaming on mount
    useEffect(() => {
        inputRef.current?.focus();

        // Auto-stream if we have a chat with exactly 1 message (newly created chat)
        // OR if flash.stream is true (fallback)
        const shouldAutoStream = chat?.messages?.length === 1 || (flash?.stream && chat?.messages && chat.messages.length > 0);

        if (shouldAutoStream) {
            setTimeout(() => {
                send({ messages: chat.messages });
            }, 100);
        }
    }, [chat?.messages, flash?.stream, send]); // Only run on mount

    // Scroll to bottom when streaming
    useEffect(() => {
        if (isStreaming) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [isStreaming, data]);

    // Focus input when streaming completes and trigger title generation
    useEffect(() => {
        if (!isStreaming && inputRef.current) {
            inputRef.current.focus();
            
            // Trigger title generation if this is an authenticated user with "Untitled" chat and we have a response
            if (auth.user && chat && currentTitle === 'Untitled' && data && data.trim()) {
                setShouldGenerateTitle(true);
                setShouldUpdateSidebar(true);
            }
        }
    }, [isStreaming, auth.user, chat, currentTitle, data]);

    // Update current title when chat changes
    useEffect(() => {
        if (chat?.title) {
            setCurrentTitle(chat.title);
        }
    }, [chat?.title]);

    // Track title state changes
    useEffect(() => {
        // Title state tracking
    }, [currentTitle, isTitleStreaming]);


    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.querySelector('input') as HTMLInputElement;
        const query = input?.value.trim();

        if (!query) return;

        const toAdd: Message[] = [];

        // If there's a completed response from previous streaming, add it first
        if (data && data.trim()) {
            toAdd.push({
                type: 'response',
                content: data,
            });
        }

        // Add the new prompt
        toAdd.push({
            type: 'prompt',
            content: query,
        });

        // Update local state
        setMessages((prev) => [...prev, ...toAdd]);

        // Send all messages including the new ones
        send({ messages: [...messages, ...toAdd] });

        input.value = '';
        inputRef.current?.focus();
    }, [send, data, messages]);

    return (
        <>
            <Head title={currentTitle} />
            {/* Title generator with working EventStream */}
            {shouldGenerateTitle && auth.user && chat && (
                <TitleGenerator
                    chatId={chat.id}
                    onTitleUpdate={(newTitle, isStreaming = false) => {
                        setCurrentTitle(newTitle);
                        setIsTitleStreaming(isStreaming);
                        document.title = `${newTitle} - LaraChat`;
                    }}
                    onComplete={() => {
                        setIsTitleStreaming(false);
                        setShouldGenerateTitle(false);
                    }}
                />
            )}
            
            {/* Sidebar title updater - separate EventStream for sidebar */}
            {shouldUpdateSidebar && auth.user && chat && (
                <SidebarTitleUpdater
                    chatId={chat.id}
                    onComplete={() => {
                        setShouldUpdateSidebar(false);
                    }}
                />
            )}
            
            <AppLayout
                currentChatId={chat?.id}
                className="flex h-[calc(100vh-theme(spacing.4))] flex-col overflow-hidden md:h-[calc(100vh-theme(spacing.8))]"
            >
                {!auth.user && (
                    <div className="bg-background flex-shrink-0 p-4">
                        <Alert className="mx-auto max-w-3xl">
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                                Você está conversando anonimamente. Sua conversa não será salva.
                                <Button variant="link" className="h-auto p-0 text-sm" onClick={() => router.visit('/login')}>
                                    Faça login para salvar suas conversas
                                </Button>
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                {/* Chat Title Display */}
                {auth.user && chat && (
                    <div className="bg-background flex-shrink-0 px-4">
                        <div className="w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] mx-auto px-6 py-4">
                            <h1 className="text-lg font-semibold text-foreground">
                                {currentTitle}
                                {isTitleStreaming && (
                                    <span className="ml-1 animate-pulse">|</span>
                                )}
                            </h1>
                        </div>
                        {/* <div className="w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] mx-auto p-6 max-sm:px-4 animate-home-chat-hidden">
                            {(messages.length === 0 && auth.user) ? (
                                <p className='text-foreground text-4xl mt-8 text-start libre-baskerville'>Olá {auth.user.name || auth.user.email},<br/><span className='text-muted-foreground'>Como posso ajudar você hoje?</span></p>
                            ) : (
                                <p className="text-foreground text-4xl mt-8 text-center libre-baskerville">O que posso fazer para você?</p>
                            )}
                        </div> */}
                    </div>
                )}

                <Conversation messages={messages} streamingData={data} isStreaming={isStreaming} streamId={id} />

                <div className="w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] mx-auto p-6 max-sm:px-4 animate-home-chat-hidden">
                    <div className="flex flex-col gap-4 rounded-[22px] transition-all relative bg-[var(--fill-input-chat)] p-3 max-h-[300px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.02)] border border-black/8 dark:border-[#ffffff14]">
                        <div className="flex-shrink-0">
                            <div className="mx-auto max-w-3xl">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-3">
                                        <Input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Dê à Houzel uma redação para trabalhar..."
                                            className="flex-1 border-0 shadow-none focus:ring-0 focus-visible:ring-0 focus:border-0 bg-transparent px-1.5"
                                            disabled={isStreaming || isFetching}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    document.getElementById('send-button')?.click();
                                                    if (inputRef.current) {
                                                        inputRef.current.blur();
                                                        setInputValue('');
                                                    }
                                                }
                                            }}
                                        />
                                        <Button 
                                            type="submit" 
                                            id='send-button'
                                            disabled={isStreaming || isFetching || !inputValue.trim()} 
                                            className='rounded-full w-8 h-8 ms-auto p-0'
                                        >
                                            <ArrowUp />
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

export default function Chat() {
    const { auth, chat, flash } = usePage<PageProps>().props;

    // Use the chat ID as a key to force complete re-creation of the ChatWithStream component
    // This ensures useStream is completely reinitialized with the correct URL
    const key = chat?.id ? `chat-${chat.id}` : 'no-chat';

    return <ChatWithStream key={key} chat={chat} auth={auth} flash={flash} />;
}
