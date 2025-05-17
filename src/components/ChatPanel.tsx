// src/components/ChatPanel.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Loader, Copy, FileText, AudioLines, PenLine, SquareArrowDown, Mail, Atom, ArrowUp, Paperclip, X, ChevronDown, Check } from 'lucide-react'
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
    Popover, PopoverTrigger, PopoverContent
} from '@/components/ui/popover'
import {
    Tooltip, TooltipProvider, TooltipTrigger, TooltipContent
} from '@/components/ui/tooltip'
import {
    Command, CommandInput, CommandList,
    CommandEmpty, CommandGroup, CommandItem
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import Hourglass from '../../public/hourglass'

export interface ChatPanelProps {
    initialMessages: any[]
    chatId?: string,
    initialChat: any[]
}

import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

const frameworks = [
    {
        value: "dissertativo-argumentativo",
        label: "Dissertativo-argumentativo",
        icon: <FileText className="w-4 h-4" />,
    },
    {
        value: "narrativo",
        label: "Narrativo",
        icon: <AudioLines className="w-4 h-4" />,
    },
    {
        value: "descritivo",
        label: "Descritivo",
        icon: <PenLine className="w-4 h-4" />,
    },
    {
        value: "expositivo",
        label: "Expositivo",
        icon: <SquareArrowDown className="w-4 h-4" />,
    },
    {
        value: "carta",
        label: "Carta",
        icon: <Mail className="w-4 h-4" />,
    },
    {
        value: "resenha",
        label: "Resenha",
        icon: <Atom className="w-4 h-4" />,
    },
    {
        value: "reportagem",
        label: "Reportagem",
        icon: <ArrowUp className="w-4 h-4" />,
    },
]

export function ChatPanel({ initialMessages, chatId, initialChat }: ChatPanelProps) {
    const { isLoaded: userLoaded, isSignedIn } = useUser()
    const [messages, setMessages] = useState(initialMessages)
    const [chat, setChat] = useState<any>(initialChat)
    const [currentChatId, setCurrentChatId] = useState<string|undefined>(chatId)
    const [essay, setEssay] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [attach, setAttach] = useState(false)
    const [value, setValue] = useState('')
    const [attachments, setAttachments] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const user = useUser();
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setCurrentChatId(chatId);
        setMessages(initialMessages);
        setChat(initialChat);
        const el = scrollContainerRef.current
        if (el) {
            el.scrollTo({ top: el.scrollHeight })
        }
    }, [chatId, initialMessages, initialChat])

    async function handleGenerate() {
        if (!essay.trim()) return;

        const userMsg: any = { role: "user", content: essay };

        const attachmentMsgs: any[] = attachments.map((att: any) => ({
            role: "user",
            content: JSON.stringify({
                filename: att.name,
                mimetype: att.type,
                base64: att.data
            }),
        }));

        const newMessages = [userMsg, ...attachmentMsgs];
        const optimistic = [...messages, ...newMessages];
        setMessages(optimistic);
        setLoading(true);
        setEssay("");

        const res = await fetch("/api/openai/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chatId: currentChatId,
                messages: newMessages,
            }),
        });
        const json = await res.json();

        if (Array.isArray(json.messages)) {
            setMessages(json.messages);
            if (json.chatId) setCurrentChatId(json.chatId);
        }

        setAttachments([]);
        setLoading(false);
    }

    function handleEnter(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleGenerate()
        }
    }

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files ? Array.from(e.target.files) : []
        setAttachments(files)
        e.target.value = ''
    }

    function removeAttachment(i: number) {
        setAttachments(a => a.filter((_, idx) => idx !== i))
    }

    if (!userLoaded) {
        return (
            <main className="bg-neutral-100 animate-pulse">
                <div className="flex items-center justify-center w-full h-screen">
                    <Loader className="w-6 h-6 animate-spin" />
                </div>
            </main>
        )
    }

    if (!isSignedIn) {
        return <div>Por favor, faça login para continuar.</div>
    }

    return (
        <div className="flex-1 overflow-auto" ref={scrollContainerRef}>
            <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                multiple
                hidden
                onChange={handleFileChange}
            />
            <main className="flex flex-col min-h-screen bg-[var(--background-gray-main)]">
                <div className="relative flex flex-col h-full flex-1 min-w-0 mx-auto w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] px-5">
                    {messages?.length <= 0 ? (
                        <div className="flex items-center justify-start w-full gap-1 py-4">
                            <Hourglass className="w-8 h-8" />
                            <p className="text-xl tracking-tight font-serif font-bold">houzel</p>
                        </div>
                    ) : (
                        <div className="sticky top-0 z-10 bg-[var(--background-gray-main)] flex-shrink-0 flex flex-row items-center justify-between py-3">
                            <div className="flex w-full flex-col gap-[4px]">
                                <div className="text-[var(--text-primary)] text-lg font-medium w-full flex flex-row items-center justify-between flex-1 min-w-0 gap-2">
                                    <div className="flex flex-row items-center gap-1 flex-1 min-w-0">
                                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">{ chat.title ?? 'Conversa' }</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>
                                            <button className="h-8 px-3 rounded-[100px] inline-flex items-center gap-1 clickable outline outline-1 outline-offset-[-1px] outline-[var(--border-btn-main)] hover:bg-[var(--fill-tsp-white-light)] mr-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--icon-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line></svg>
                                                <span className="text-[var(--text-secondary)] text-sm font-medium">Compartilhar</span>
                                            </button>
                                        </span>
                                        <button className="p-[5px] flex items-center justify-center hover:bg-[var(--fill-tsp-white-dark)] rounded-lg cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-search text-[var(--icon-secondary)]"><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="m9 18-1.5-1.5"></path><circle cx="5" cy="14" r="3"></circle></svg>
                                        </button>
                                        <button className="p-[5px] items-center justify-center hover:bg-[var(--fill-tsp-white-dark)] rounded-lg cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-[var(--icon-secondary)]"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                        </button>
                                        <button className="p-[5px] flex items-center justify-center hover:bg-[var(--fill-tsp-white-dark)] rounded-lg cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis text-[var(--icon-secondary)]"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={messages?.length > 0 ? "w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] mx-auto mt-3 animate-home-chat-hidden" : "w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] mx-auto sm:mt-[12vh] mt-[calc(18vh+42px)] animate-home-chat-hidden"}>
                        {messages?.length > 0 ? (
                            <div className="w-full flex flex-col items-center justify-start pb-6">
                                {messages.map((m: any, i: any) => (
                                    <div key={i} className="flex flex-col items-end group gap-1 ms-auto w-full">
                                        {m.role === 'user' && (
                                            <div className="flex items-end justify-end">
                                                <div className="flex items-center justify-end gap-[2px] invisible group-hover:visible">
                                                    <TooltipProvider>
                                                        <Tooltip delayDuration={0}>
                                                            <TooltipTrigger asChild>
                                                                <div className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md">
                                                                    <Copy size={16} />
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="rounded-[6px]">
                                                                <p>Copiar</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    <div className="float-right transition text-[12px] text-[var(--text-tertiary)] invisible group-hover:visible">
                                                        {
                                                            new Date(m.createdAt).toLocaleDateString('pt-BR', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: '2-digit',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            className={`${m.role === 'user'
                                                    ? 'ms-auto relative flex items-center rounded-[12px] overflow-hidden bg-[var(--fill-white)] dark:bg-[var(--fill-tsp-white-main)] p-3 ltr:rounded-br-none rtl:rounded-bl-none border border-[var(--border-main)] dark:border-0'
                                                    : 'me-auto'
                                                }`}
                                        >
                                            {m.role === 'user' ? (
                                                <div className="flex w-full flex-col items-end justify-end gap-1 group ms-auto">
                                                    <div className="flex max-w-[90%] relative flex-col gap-2 items-end">
                                                        <div className="transition-all duration-300">
                                                            <span className="text-[var(--text-primary)] u-break-words whitespace-nowrap">
                                                                <span>{m.content}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-2 w-full group mt-3 me-auto">
                                                    <div className="flex items-center justify-between h-7 group">
                                                        <div className="flex items-center gap-[3px]">
                                                            <Hourglass className="w-5 h-5" />
                                                            <p className="text-md tracking-tight font-serif font-bold">houzel</p>
                                                        </div>
                                                        <div className="flex items-center justify-end gap-[2px]">
                                                            <div className="float-right transition text-[12px] text-[var(--text-tertiary)] invisible group-hover:visible">
                                                                <TooltipProvider>
                                                                    <Tooltip delayDuration={0}>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="float-right transition text-[12px] text-[var(--text-tertiary)] invisible group-hover:visible">
                                                                                {
                                                                                    new Date(m.createdAt).toLocaleDateString('pt-BR', {
                                                                                        day: '2-digit',
                                                                                        month: '2-digit',
                                                                                        year: '2-digit',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit'
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="rounded-[6px]">
                                                                            <p>
                                                                                {
                                                                                    new Date(m.createdAt).toLocaleDateString('pt-BR', {
                                                                                        day: '2-digit',
                                                                                        month: '2-digit',
                                                                                        year: '2-digit',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit'
                                                                                    })
                                                                                }
                                                                            </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="max-w-none p-0 m-0 prose prose-sm sm:prose-base dark:prose-invert [&_pre:not(.shiki)]:!bg-[var(--fill-tsp-white-light)] [&_pre:not(.shiki)]:text-[var(--text-primary)] text-base text-[var(--text-primary)]">
                                                        <div className="mb-4 last:mb-0 u-break-words flex flex-col gap-y-4">
                                                            {/* <span>{m.content}</span> */}
                                                            <ReactMarkdown
                                                                remarkPlugins={[remarkGfm]}
                                                                rehypePlugins={[rehypeRaw]}
                                                                components={{
                                                                img: ({node, ...props}) => (
                                                                    <img {...props} className="rounded-md" />
                                                                )
                                                                }}
                                                            >
                                                                {m.content}
                                                            </ReactMarkdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <TextShimmerWave
                                        className='me-auto'
                                        duration={1}
                                        spread={1}
                                        zDistance={1}
                                        scaleDistance={1.1}
                                        rotateYDistance={20}
                                    >
                                        Pensando...
                                    </TextShimmerWave>
                                )}
                            </div>
                        ) : (
                            <div className="w-full flex pl-4 items-center justify-start pb-4">
                                <span className="text-[var(--text-primary)] text-start font-serif text-[32px] leading-[40px]">
                                    Olá {user.user?.fullName != null ? ' ' + user.user?.fullName + ',' : '!'}
                                    <br />
                                    <span className="text-[var(--text-tertiary)]">Deixe me ver sua redação</span>
                                </span>
                            </div>
                        )}

                        {messages?.length <= 0 && (
                            <>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-col bg-[var(--background-gray-main)] w-full">
                                        <div className="[&:not(:empty)]:pb-2 bg-[var(--background-gray-main)] rounded-[22px_22px_0px_0px]">
                                            <div className="pb-3 relative bg-[var(--background-gray-main)]">
                                                <div className="flex flex-col gap-3 rounded-[22px] transition-all relative bg-[var(--fill-input-chat)] py-3 max-h-[300px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.02)] border border-black/8 dark:border-[var(--border-main)]">
                                                    {attachments.length > 0 && (
                                                        <div className="w-full relative rounded-md overflow-hidden flex-shrink-0 pb-3 -mb-3">
                                                            <div className="w-full overflow-y-hidden overflow-x-auto scrollbar-hide pb-[10px] -mb-[10px] pl-4 pr-2 flex gap-3">
                                                                {attachments.map((att: any, idx) => {
                                                                    const sizeKB = (att.size / 1024).toFixed(2);
                                                                    return (
                                                                        <div key={att.name + idx} className="flex gap-3 group">
                                                                            <div className="flex items-center gap-2 p-2 pr-2.5 w-[280px] rounded-[10px] bg-[var(--fill-tsp-white-main)] group/attach relative overflow-hidden cursor-pointer hover:bg-[var(--fill-tsp-white-dark)]">
                                                                                <div className="flex items-center justify-center w-8 h-8 rounded-md">
                                                                                    <img src={att.data} alt={att.name} className="w-full h-full object-cover rounded-md" />
                                                                                </div>
                                                                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                                                                    <div className="flex-1 min-w-0 flex items-center">
                                                                                        <div className="text-sm text-[var(--text-primary)] text-ellipsis overflow-hidden whitespace-nowrap flex-1 min-w-0">
                                                                                            {att.name}
                                                                                        </div>
                                                                                        <div
                                                                                            onClick={() => removeAttachment(idx)}
                                                                                            className="hidden touch-device:flex group-hover/attach:flex rounded-full p-[2px] bg-[var(--icon-tertiary)] transition-all duration-200 hover:opacity-85">
                                                                                            <X className="text-white w-3 h-3" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="text-xs text-[var(--text-tertiary)]">
                                                                                        {att.type.split("/")[1].toUpperCase()} · {sizeKB} KB
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="overflow-y-auto pl-4 pr-2">
                                                        <textarea name="search" onKeyDown={handleEnter} value={essay} onChange={e => setEssay(e.target.value)} id="search" rows={2} placeholder="Escreva sua redação aqui..." className="flex rounded-md border-input focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden flex-1 bg-transparent p-0 pt-[1px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full placeholder:text-[var(--text-disable)] text-[15px] shadow-none resize-none min-h-[40px]"></textarea>
                                                    </div>
                                                    <div className="flex flex-row justify-between w-full px-3">
                                                        <div className="flex gap-2 pe-2 items-center">
                                                            <DropdownMenu onOpenChange={() => setAttach(true)}>
                                                                <TooltipProvider>
                                                                    <Tooltip open={attach} delayDuration={0}>
                                                                        <TooltipTrigger asChild>
                                                                            <DropdownMenuTrigger asChild>
                                                                                <Button variant={'ghost'} onMouseEnter={() => setAttach(true)} onMouseLeave={() => setAttach(false)} className="rounded-full border border-[var(--border-main)] inline-flex items-center justify-center gap-1 clickable cursor-pointer text-xs text-[var(--text-secondary)] hover:bg-[var(--fill-tsp-gray-main)] w-8 h-8 p-0">
                                                                                    <Paperclip />
                                                                                </Button>
                                                                            </DropdownMenuTrigger>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="rounded-[6px] py-1 px-2">
                                                                            <p>Anexe arquivos e mais</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                                <DropdownMenuContent className="w-56 p-1 bg-[var(--background-menu-white)] shadow-[0_4px_11px_0px_var(--shadow-S)] rounded-xl border border-[var(--border-dark)] dark:border-[var(--border-light)] max-h-[350px] overflow-auto">
                                                                    <DropdownMenuGroup>
                                                                        <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                                                                            <Paperclip />
                                                                            Escolher arquivo local
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuGroup>
                                                                    <DropdownMenuSeparator className="h-[1px] bg-[var(--border-main)] my-[2px] mx-[12px]" />
                                                                    <DropdownMenuGroup>
                                                                        <DropdownMenuItem className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78">
                                                                                <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z" />
                                                                                <path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A9.06 9.06 0 0 0 0 53h27.5z" />
                                                                                <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z" />
                                                                                <path fill="#00832d" d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" />
                                                                                <path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" />
                                                                                <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5z" />
                                                                            </svg>
                                                                            Escolher do drive
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuGroup>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <TooltipProvider>
                                                                    <Tooltip open={open} delayDuration={0}>
                                                                        <TooltipTrigger asChild>
                                                                            <PopoverTrigger asChild>
                                                                                <Button variant={'ghost'} role="combobox" aria-expanded={open} className="h-8 rounded-full border border-[var(--border-main)] inline-flex items-center justify-center gap-1 clickable cursor-pointer text-xs text-[var(--text-secondary)] hover:bg-[var(--fill-tsp-gray-main)] px-2.5 py-1.5">
                                                                                    <div className="flex items-center gap-1">
                                                                                        <PenLine />
                                                                                        <span className="text-[var(--text-secondary)] text-sm ms-1">
                                                                                            {value
                                                                                                ? frameworks.find((framework) => framework.value === value)?.label
                                                                                                : "Selecione o tipo..."
                                                                                            }
                                                                                        </span>
                                                                                        <ChevronDown />
                                                                                    </div>
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="rounded-[6px] py-1 px-2">
                                                                            <p>Tipo da redação</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                                <PopoverContent className="w-82 p-1 bg-[var(--background-menu-white)] shadow-[0_4px_11px_0px_var(--shadow-S)] rounded-xl border border-[var(--border-dark)] dark:border-[var(--border-light)] max-h-[350px] overflow-auto">
                                                                    <Command>
                                                                        <CommandInput placeholder="Pesquisar tipo..." className="h-9" />
                                                                        <CommandList>
                                                                            <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                                                                            <CommandGroup>
                                                                                {frameworks.map((framework) => (
                                                                                    <CommandItem
                                                                                        key={framework.value}
                                                                                        value={framework.value}
                                                                                        onSelect={(currentValue) => {
                                                                                            setValue(currentValue === value ? "" : currentValue)
                                                                                            setOpen(false)
                                                                                        }}
                                                                                    >
                                                                                        {framework.icon}
                                                                                        {framework.label}
                                                                                        <Check
                                                                                            className={cn(
                                                                                                "ml-auto",
                                                                                                value === framework.value ? "opacity-100" : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                    </CommandItem>
                                                                                ))}
                                                                            </CommandGroup>
                                                                        </CommandList>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="relative">
                                                                <span className="rounded-full hover:bg-[var(--fill-tsp-white-main)] h8 px-2 py-1 flex items-center gap-1 border border-[var(--border-main)] cursor-pointer">
                                                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2102 1.57437C15.2709 1.39188 15.529 1.39188 15.5897 1.57437L15.9325 2.60482C16.1315 3.20299 16.6008 3.67234 17.199 3.87131L18.2294 4.21408C18.4119 4.27478 18.4119 4.53293 18.2294 4.59363L17.199 4.9364C16.6008 5.13537 16.1315 5.60472 15.9325 6.20289L15.5897 7.23334C15.529 7.41583 15.2709 7.41583 15.2102 7.23334L14.8674 6.20289C14.6684 5.60472 14.1991 5.13537 13.6009 4.9364L12.5705 4.59363C12.388 4.53293 12.388 4.27478 12.5705 4.21408L13.6009 3.87131C14.1991 3.67234 14.6684 3.20299 14.8674 2.60482L15.2102 1.57437Z" fill="var(--icon-secondary)"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.10529 6.19431C7.64765 7.5701 6.56814 8.6496 5.19235 9.10724L2.42617 10.0274C1.96992 10.1791 1.96992 10.8245 2.42617 10.9763L5.19236 11.8964C6.56815 12.354 7.64765 13.4335 8.10529 14.8093L9.02543 17.5755C9.17719 18.0318 9.82255 18.0318 9.97431 17.5755L10.8945 14.8093C11.3521 13.4335 12.4316 12.354 13.8074 11.8964L16.5736 10.9763C17.0298 10.8245 17.0298 10.1791 16.5736 10.0274L13.8074 9.10724C12.4316 8.6496 11.3521 7.5701 10.8945 6.19431L9.97431 3.42812C9.82255 2.97188 9.17719 2.97188 9.02543 3.42812L8.10529 6.19431ZM9.49987 7.22075C8.86634 8.69339 7.69143 9.86829 6.2188 10.5018C7.69143 11.1354 8.86634 12.3103 9.49987 13.7829C10.1334 12.3103 11.3083 11.1354 12.7809 10.5018C11.3083 9.86829 10.1334 8.69339 9.49987 7.22075Z" fill="var(--icon-secondary)"></path></svg>
                                                                    <span className="text-sm text-[var(--text-secondary)]">1000</span>
                                                                </span>
                                                            </div>
                                                            {loading || essay ? (
                                                                <Button onClick={handleGenerate} variant={'ghost'} className="whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-[var(--Button-primary-black)] hover:opacity-90">
                                                                    {loading ? (
                                                                        <Loader className="animate-spin" />
                                                                    ) : (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M7.91699 15.0642C7.53125 15.0642 7.22119 14.9397 6.98682 14.6907C6.75244 14.4465 6.63525 14.1218 6.63525 13.7166V6.39966L6.77441 3.34546L7.48486 3.89478L5.62451 6.12134L3.99121 7.76196C3.87402 7.87915 3.73975 7.97681 3.58838 8.05493C3.44189 8.13306 3.271 8.17212 3.07568 8.17212C2.73389 8.17212 2.4458 8.05981 2.21143 7.83521C1.98193 7.60571 1.86719 7.3103 1.86719 6.94897C1.86719 6.60229 1.99902 6.29712 2.2627 6.03345L6.97949 1.30933C7.0918 1.19214 7.2334 1.10181 7.4043 1.03833C7.5752 0.969971 7.74609 0.935791 7.91699 0.935791C8.08789 0.935791 8.25879 0.969971 8.42969 1.03833C8.60059 1.10181 8.74463 1.19214 8.86182 1.30933L13.5786 6.03345C13.8423 6.29712 13.9741 6.60229 13.9741 6.94897C13.9741 7.3103 13.8569 7.60571 13.6226 7.83521C13.3931 8.05981 13.1074 8.17212 12.7656 8.17212C12.5703 8.17212 12.397 8.13306 12.2456 8.05493C12.0991 7.97681 11.9673 7.87915 11.8501 7.76196L10.2095 6.12134L8.34912 3.89478L9.05957 3.34546L9.19141 6.39966V13.7166C9.19141 14.1218 9.07422 14.4465 8.83984 14.6907C8.60547 14.9397 8.29785 15.0642 7.91699 15.0642Z" fill="var(--icon-onblack)"></path></svg>
                                                                    )}
                                                                </Button>
                                                            ) : (
                                                                <Button variant={'ghost'} className="whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-not-allowed bg-[var(--fill-tsp-white-dark)] hover:opacity-90">
                                                                    {loading ? (
                                                                        <Loader className="animate-spin" />
                                                                    ) : (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M7.91699 15.0642C7.53125 15.0642 7.22119 14.9397 6.98682 14.6907C6.75244 14.4465 6.63525 14.1218 6.63525 13.7166V6.39966L6.77441 3.34546L7.48486 3.89478L5.62451 6.12134L3.99121 7.76196C3.87402 7.87915 3.73975 7.97681 3.58838 8.05493C3.44189 8.13306 3.271 8.17212 3.07568 8.17212C2.73389 8.17212 2.4458 8.05981 2.21143 7.83521C1.98193 7.60571 1.86719 7.3103 1.86719 6.94897C1.86719 6.60229 1.99902 6.29712 2.2627 6.03345L6.97949 1.30933C7.0918 1.19214 7.2334 1.10181 7.4043 1.03833C7.5752 0.969971 7.74609 0.935791 7.91699 0.935791C8.08789 0.935791 8.25879 0.969971 8.42969 1.03833C8.60059 1.10181 8.74463 1.19214 8.86182 1.30933L13.5786 6.03345C13.8423 6.29712 13.9741 6.60229 13.9741 6.94897C13.9741 7.3103 13.8569 7.60571 13.6226 7.83521C13.3931 8.05981 13.1074 8.17212 12.7656 8.17212C12.5703 8.17212 12.397 8.13306 12.2456 8.05493C12.0991 7.97681 11.9673 7.87915 11.8501 7.76196L10.2095 6.12134L8.34912 3.89478L9.05957 3.34546L9.19141 6.39966V13.7166C9.19141 14.1218 9.07422 14.4465 8.83984 14.6907C8.60547 14.9397 8.29785 15.0642 7.91699 15.0642Z" fill="var(--icon-disable)"></path></svg>
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex group">
                                    <div className="flex-1 flex flex-wrap gap-2 items-center justify-center">
                                        <div className="min-w-[42px] flex items-center gap-1.5 py-2 px-3 rounded-[100px] bg-[var(--fill-tsp-white-light)] hover:opacity-90 cursor-pointer">
                                            <span className="text-[var(--text-secondary)] text-[13px] leading-[20px]">Data analysis & visualization</span>
                                            <ArrowUp className="w-4 h-4 stroke-[var(--icon-secondary)]" />
                                        </div>
                                        <div className="min-w-[42px] flex items-center gap-1.5 py-2 px-3 rounded-[100px] bg-[var(--fill-tsp-white-light)] hover:opacity-90 cursor-pointer">
                                            <span className="text-[var(--text-secondary)] text-[13px] leading-[20px]">College savings planning</span>
                                            <ArrowUp className="w-4 h-4 stroke-[var(--icon-secondary)]" />
                                        </div>
                                        <div className="min-w-[42px] flex items-center gap-1.5 py-2 px-3 rounded-[100px] bg-[var(--fill-tsp-white-light)] hover:opacity-90 cursor-pointer">
                                            <span className="text-[var(--text-secondary)] text-[13px] leading-[20px]">EV charging stations map</span>
                                            <ArrowUp className="w-4 h-4 stroke-[var(--icon-secondary)]" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {messages?.length > 0 && (
                        <div className="flex flex-col bg-[var(--background-gray-main)] sticky bottom-0 mt-auto">
                            {/* <button className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[var(--background-white-main)] hover:bg-[var(--background-gray-main)] clickable border border-[var(--border-main)] shadow-[0px_5px_16px_0px_var(--shadow-S),0px_0px_1.25px_0px_var(--shadow-S)] absolute -top-20 left-1/2 -translate-x-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down text-[var(--icon-primary)]"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
                            </button> */}
                            <div className="pb-3 relative bg-[var(--background-gray-main)]">
                                <div className="flex flex-col gap-3 rounded-[22px] transition-all relative bg-[var(--fill-input-chat)] py-3 max-h-[300px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.02)] border border-black/8 dark:border-[var(--border-main)]">
                                    <div className="overflow-y-auto pl-4 pr-2">
                                        <textarea name="search" onKeyDown={handleEnter} value={essay} onChange={e => setEssay(e.target.value)} placeholder="Diga mais sobre..." className="flex rounded-md border-input focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden flex-1 bg-transparent p-0 pt-[1px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full placeholder:text-[var(--text-disable)] text-[15px] shadow-none resize-none min-h-[28px]"></textarea>
                                    </div>
                                    <div className="flex flex-row justify-between w-full px-3">
                                        <div className="flex gap-2 pe-2 items-center">
                                            <button className="rounded-full border border-[var(--border-main)] inline-flex items-center justify-center gap-1 clickable cursor-pointer text-xs text-[var(--text-secondary)] hover:bg-[var(--fill-tsp-gray-main)] w-8 h-8 p-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--icon-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip"><path d="M13.234 20.252 21 12.3"></path><path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"></path></svg>
                                            </button>
                                        </div>
                                        <div className="flex gap-2">
                                            {loading || essay ? (
                                                <Button onClick={handleGenerate} variant={'ghost'} className="whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-[var(--Button-primary-black)] hover:opacity-90">
                                                    {loading ? (
                                                        <Loader className="animate-spin" />
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M7.91699 15.0642C7.53125 15.0642 7.22119 14.9397 6.98682 14.6907C6.75244 14.4465 6.63525 14.1218 6.63525 13.7166V6.39966L6.77441 3.34546L7.48486 3.89478L5.62451 6.12134L3.99121 7.76196C3.87402 7.87915 3.73975 7.97681 3.58838 8.05493C3.44189 8.13306 3.271 8.17212 3.07568 8.17212C2.73389 8.17212 2.4458 8.05981 2.21143 7.83521C1.98193 7.60571 1.86719 7.3103 1.86719 6.94897C1.86719 6.60229 1.99902 6.29712 2.2627 6.03345L6.97949 1.30933C7.0918 1.19214 7.2334 1.10181 7.4043 1.03833C7.5752 0.969971 7.74609 0.935791 7.91699 0.935791C8.08789 0.935791 8.25879 0.969971 8.42969 1.03833C8.60059 1.10181 8.74463 1.19214 8.86182 1.30933L13.5786 6.03345C13.8423 6.29712 13.9741 6.60229 13.9741 6.94897C13.9741 7.3103 13.8569 7.60571 13.6226 7.83521C13.3931 8.05981 13.1074 8.17212 12.7656 8.17212C12.5703 8.17212 12.397 8.13306 12.2456 8.05493C12.0991 7.97681 11.9673 7.87915 11.8501 7.76196L10.2095 6.12134L8.34912 3.89478L9.05957 3.34546L9.19141 6.39966V13.7166C9.19141 14.1218 9.07422 14.4465 8.83984 14.6907C8.60547 14.9397 8.29785 15.0642 7.91699 15.0642Z" fill="var(--icon-onblack)"></path></svg>
                                                    )}
                                                </Button>
                                            ) : (
                                                <Button variant={'ghost'} className="whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-not-allowed bg-[var(--fill-tsp-white-dark)] hover:opacity-90">
                                                    {loading ? (
                                                        <Loader className="animate-spin" />
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M7.91699 15.0642C7.53125 15.0642 7.22119 14.9397 6.98682 14.6907C6.75244 14.4465 6.63525 14.1218 6.63525 13.7166V6.39966L6.77441 3.34546L7.48486 3.89478L5.62451 6.12134L3.99121 7.76196C3.87402 7.87915 3.73975 7.97681 3.58838 8.05493C3.44189 8.13306 3.271 8.17212 3.07568 8.17212C2.73389 8.17212 2.4458 8.05981 2.21143 7.83521C1.98193 7.60571 1.86719 7.3103 1.86719 6.94897C1.86719 6.60229 1.99902 6.29712 2.2627 6.03345L6.97949 1.30933C7.0918 1.19214 7.2334 1.10181 7.4043 1.03833C7.5752 0.969971 7.74609 0.935791 7.91699 0.935791C8.08789 0.935791 8.25879 0.969971 8.42969 1.03833C8.60059 1.10181 8.74463 1.19214 8.86182 1.30933L13.5786 6.03345C13.8423 6.29712 13.9741 6.60229 13.9741 6.94897C13.9741 7.3103 13.8569 7.60571 13.6226 7.83521C13.3931 8.05981 13.1074 8.17212 12.7656 8.17212C12.5703 8.17212 12.397 8.13306 12.2456 8.05493C12.0991 7.97681 11.9673 7.87915 11.8501 7.76196L10.2095 6.12134L8.34912 3.89478L9.05957 3.34546L9.19141 6.39966V13.7166C9.19141 14.1218 9.07422 14.4465 8.83984 14.6907C8.60547 14.9397 8.29785 15.0642 7.91699 15.0642Z" fill="var(--icon-disable)"></path></svg>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
