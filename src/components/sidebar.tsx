'use client'

import { Bell, CalendarIcon, Cog, Command, LogOut, Plus } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { PanelRightOpenIcon } from "./ui/panel-right-open";
import { SearchIcon } from "./ui/search";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function Sidebar() {
    const user = useUser();

    if(!user.isLoaded) {
        return (
          <main className="bg-neutral-200 animate-pulse"></main>
        )
    }

    return (
        <aside className="max-w-0 lg:max-w-[360px] w-full flex flex-col overflow-hidden bg-[var(--background-nav)] h-full opacity-100 translate-x-0">
            <div className="h-full w-full flex flex-col items-start">
                <div className="flex items-center px-3 py-3 flex-row h-[52px] gap-1 justify-end w-full">
                    <div className="flex justify-between w-full px-1 pt-2">
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <div className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded">
                                        <PanelRightOpenIcon size={22} className="text-[var(--icon-secondary)]" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="rounded-[6px] mx-3 py-1 px-2">
                                    <p>Otimizar</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <div className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded">
                                        <SearchIcon size={20} className="text-[var(--icon-secondary)]" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="rounded-[6px] py-1 px-2">
                                    <p>Pesquisar</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="px-3 mb-1 flex justify-center flex-shrink-0 w-full">
                    <Button className="flex text-foreground min-w-[36px] w-full items-center justify-center gap-1.5 rounded-md h-[36px] bg-[var(--Button-primary-white)] hover:bg-white/20 dark:hover:bg-black/60 cursor-pointer shadow-[0px_0.5px_3px_0px_var(--shadow-S)]">
                        <Plus className="w-6 h-6" />
                        Nova redação
                        <div className="flex items-center gap-0.5">
                            <span className="flex text-[var(--text-tertiary)] justify-center items-center min-w-5 h-5 px-1 rounded-[4px] bg-[var(--fill-tsp-white-light)] border border-[var(--border-light)]">
                                <Command />
                            </span>
                            <span className="flex justify-center items-center w-5 h-5 px-1 rounded-[4px] bg-[var(--fill-tsp-white-light)] border border-[var(--border-light)] text-sm font-normal text-[var(--text-tertiary)] ">
                                K
                            </span>
                        </div>
                    </Button>
                </div>

                <footer className="mt-auto px-3 overflow-x-hidden border-t border-[var(--border-main)] w-full">
                    <div className="w-full py-4 gap-4 flex flex-col justify-between items-center">
                        <div className="w-full flex justify-between items-center">
                            <HoverCard openDelay={0}>
                                <HoverCardTrigger asChild>
                                    <div className="flex items-center gap-[6px] cursor-pointer flex-1 min-w-0 max-w-fit">
                                        <div className="relative flex items-center justify-center font-bold cursor-pointer flex-shrink-0">
                                            <Image 
                                                src={user.user?.imageUrl ?? 'https://www.svgrepo.com/show/452030/avatar-default.svg'} 
                                                alt={user.user?.fullName ?? 'Profile avatar'}
                                                className="w-8 h-8 object-cover rounded-full overflow-hidden"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                        <span className="text-sm leading-5 font-medium text-[var(--text-primary)] truncate">
                                            {user.user?.firstName}
                                        </span>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-[280px] m-3">
                                    <div className="flex justify-between space-x-4">
                                        <div className="flex flex-col space-y-2 w-full">
                                            <div className="flex items-center gap-[6px] cursor-pointer flex-1 min-w-0 max-w-fit">
                                                <div className="relative flex items-center justify-center font-bold cursor-pointer flex-shrink-0">
                                                    <Image 
                                                        src={user.user?.imageUrl ?? 'https://www.svgrepo.com/show/452030/avatar-default.svg'} 
                                                        alt={user.user?.fullName ?? 'Profile avatar'}
                                                        className="w-8 h-8 object-cover rounded-full overflow-hidden"
                                                        width={30}
                                                        height={30}
                                                    />
                                                </div>
                                                <span className="text-md leading-5 font-medium text-[var(--text-primary)] truncate">
                                                    {user.user?.fullName}<br />
                                                    <span className="text-sm leading-5 font-normal text-[var(--text-tertiary)] truncate">{user.user?.emailAddresses[0].emailAddress}</span>
                                                </span>
                                            </div>
                                            <SignOutButton>
                                                <Button variant="ghost" className="w-full items-center justify-start">
                                                    <LogOut color="red" />
                                                    Sair
                                                </Button>
                                            </SignOutButton>
                                            <div className="h-[1px] bg-[var(--border-main)]"></div>
                                            <div className="flex items-center pt-2">
                                                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                <span className="text-xs text-muted-foreground">
                                                    Entrou em {user.user?.createdAt!.toLocaleDateString("pt-BR", {})}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                            <div className="flex items-center gap-1">
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <div className="relative">
                                                <div className="w-1.5 h-1.5 top-[2px] right-[2px] absolute bg-function-error rounded-full bg-[var(--function-error)]"></div>
                                                <div className="flex items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md w-8 h-8">
                                                    <Bell className="h-5 w-5 text-[var(--icon-secondary)]" />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="rounded-[6px] py-1 px-2">
                                            <p>Notificações</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                        <div className="flex items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md w-8 h-8">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-[var(--icon-secondary)]"><path d="M13.3574 13.3291C14.6331 12.6198 15.6295 11.5263 16.1923 10.2181C16.7551 8.90992 16.8528 7.46002 16.4704 6.09308C16.0879 4.72614 15.2466 3.51847 14.0768 2.65719C12.907 1.79591 11.474 1.3291 9.9998 1.3291C8.52566 1.3291 7.09266 1.79591 5.92284 2.65719C4.75303 3.51847 3.91171 4.72614 3.52924 6.09308C3.14677 7.46002 3.2445 8.90992 3.8073 10.2181C4.37009 11.5263 5.36653 12.6198 6.64221 13.3291" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.6998 18.7C10.5696 18.8183 9.43005 18.8183 8.2998 18.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.1998 16.2C10.746 16.4751 9.25357 16.4751 7.7998 16.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.5388 5.5L9.01779 7.195C8.97045 7.24796 8.93807 7.31258 8.92397 7.3822C8.90987 7.45183 8.91457 7.52395 8.93759 7.59116C8.9606 7.65836 9.0011 7.71823 9.05491 7.7646C9.10873 7.81097 9.17392 7.84217 9.24379 7.855L10.7318 8.126C10.8055 8.13937 10.874 8.17318 10.9295 8.22359C10.9849 8.27399 11.0251 8.33896 11.0454 8.41109C11.0658 8.48322 11.0654 8.55961 11.0444 8.63155C11.0235 8.7035 10.9827 8.7681 10.9268 8.818L9.03879 10.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="rounded-[6px] py-1 px-2">
                                            <p>Base de conhecimento</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </aside>
    )
}