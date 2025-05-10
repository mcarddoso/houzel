'use client'

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ArrowUp, Atom, AudioLines, Check, ChevronDown, ChevronsUpDown, FileText, Mail, Paperclip, PenLine, SquareArrowDown } from "lucide-react";
import Hourglass from "../../../public/hourglass";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils";

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

export default function Home() {

  const user = useUser();
  const [open, setOpen] = React.useState(false);
  const [attach, setAttach] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <main className="flex min-h-screen flex-col w-full items-center justify-start p-4 h-full bg-[var(--background-gray-main)]">
        <div className="flex items-center justify-start w-full gap-1">
            <Hourglass className="w-8 h-8" />
            <p className="text-xl tracking-tight font-serif font-bold">houzel</p>
        </div>
        <div className="w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] mx-auto sm:mt-[12vh] mt-[calc(18vh+42px)] animate-home-chat-hidden">
            <div className="w-full flex pl-4 items-center justify-start pb-4">
                <span className="text-[var(--text-primary)] text-start font-serif text-[32px] leading-[40px]">
                    Olá {user.user?.fullName ?? 'Usuário'},
                    <br />
                    <span className="text-[var(--text-tertiary)]">Em que posso ajudar?</span>
                </span>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col bg-[var(--background-gray-main)] w-full">
                    <div className="[&:not(:empty)]:pb-2 bg-[var(--background-gray-main)] rounded-[22px_22px_0px_0px]">
                        <div className="pb-3 relative bg-[var(--background-gray-main)]">
                            <div className="flex flex-col gap-3 rounded-[22px] transition-all relative bg-[var(--fill-input-chat)] py-3 max-h-[300px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.02)] border border-black/8 dark:border-[var(--border-main)]">
                                <div className="overflow-y-auto pl-4 pr-2">
                                    <textarea name="search" id="search" rows={2} placeholder="Dê uma tarefa para a Houzel te ajudar..." className="flex rounded-md border-input focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden flex-1 bg-transparent p-0 pt-[1px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full placeholder:text-[var(--text-disable)] text-[15px] shadow-none resize-none min-h-[40px]"></textarea>
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
                                                    <DropdownMenuItem className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                                                        <Paperclip />
                                                        Escolher arquivo local
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator className="h-[1px] bg-[var(--border-main)] my-[2px] mx-[12px]" />
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78">
                                                            <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"/>
                                                            <path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A9.06 9.06 0 0 0 0 53h27.5z"/>
                                                            <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z"/>
                                                            <path fill="#00832d" d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z"/>
                                                            <path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
                                                            <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5z"/>
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
                                                                        { value
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
                                        <Button variant={'ghost'} className="whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-not-allowed bg-[var(--fill-tsp-white-dark)] hover:opacity-90">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M7.91699 15.0642C7.53125 15.0642 7.22119 14.9397 6.98682 14.6907C6.75244 14.4465 6.63525 14.1218 6.63525 13.7166V6.39966L6.77441 3.34546L7.48486 3.89478L5.62451 6.12134L3.99121 7.76196C3.87402 7.87915 3.73975 7.97681 3.58838 8.05493C3.44189 8.13306 3.271 8.17212 3.07568 8.17212C2.73389 8.17212 2.4458 8.05981 2.21143 7.83521C1.98193 7.60571 1.86719 7.3103 1.86719 6.94897C1.86719 6.60229 1.99902 6.29712 2.2627 6.03345L6.97949 1.30933C7.0918 1.19214 7.2334 1.10181 7.4043 1.03833C7.5752 0.969971 7.74609 0.935791 7.91699 0.935791C8.08789 0.935791 8.25879 0.969971 8.42969 1.03833C8.60059 1.10181 8.74463 1.19214 8.86182 1.30933L13.5786 6.03345C13.8423 6.29712 13.9741 6.60229 13.9741 6.94897C13.9741 7.3103 13.8569 7.60571 13.6226 7.83521C13.3931 8.05981 13.1074 8.17212 12.7656 8.17212C12.5703 8.17212 12.397 8.13306 12.2456 8.05493C12.0991 7.97681 11.9673 7.87915 11.8501 7.76196L10.2095 6.12134L8.34912 3.89478L9.05957 3.34546L9.19141 6.39966V13.7166C9.19141 14.1218 9.07422 14.4465 8.83984 14.6907C8.60547 14.9397 8.29785 15.0642 7.91699 15.0642Z" fill="var(--icon-disable)"></path></svg>
                                        </Button>
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
        </div>
    </main>
  )
}