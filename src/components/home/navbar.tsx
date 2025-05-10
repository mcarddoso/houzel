'use client'

import { Button } from "@/components/ui/button";
import { Bell, Check, ChevronDown, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import Hourglass from "../../../public/hourglass";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between">
        <div className="flex justify-between items-center w-full max-w-[1600px] mx-auto h-14 px-6 transition-all duration-200">
          <div className="flex items-center gap-[40px]">
            <div className="flex items-center gap-2">
              <Hourglass />
              <p className="text-xl tracking-tight font-serif font-bold">houzel</p>
            </div>
            <div className="flex gap-10 h-full items-center flex-wrap flex-row overflow-hidden">
              <div className="flex items-center relative justify-center gap-1 rounded-lg clickable h-full font-medium text-[var(--text-primary)] duration-50 border border-[var(--border-btn-main)] border-none outline-none hover:opacity-70">
                <Link href={"#use-cases"} className="text-sm">Casos de uso</Link>
              </div>
              <div className="flex items-center relative justify-center gap-1 rounded-lg clickable h-full font-medium text-[var(--text-primary)] duration-50 border border-[var(--border-btn-main)] border-none outline-none hover:opacity-70">
                <Link href={"#caseCommunity"} className="text-sm">Comunidade</Link>
              </div>
              <div className="flex items-center relative justify-center gap-1 rounded-lg clickable h-full font-medium text-[var(--text-primary)] duration-50 border border-[var(--border-btn-main)] border-none outline-none hover:opacity-70">
                <Link href={""} className="text-sm">Escolas</Link>
              </div>
              <div className="flex items-center relative justify-center gap-1 rounded-lg clickable h-full font-medium text-[var(--text-primary)] duration-50 border border-[var(--border-btn-main)] border-none outline-none hover:opacity-70">
                <Link href={""} className="text-sm">Preço</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[20px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-[max-content] gap-2 h-[32px] ps-2 pe-1 rounded-[.5rem] flex items-center justify-between hover:bg-[#37352f0a] cursor-pointer focus-visible:ring-0">
                  <Globe className="text-black w-4 h-4" />
                  <span className="text-sm font-medium">Português</span>
                  <ChevronDown className="text-black w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-1 bg-[var(--background-menu-white)] shadow-[0_4px_11px_0px_var(--shadow-S)] rounded-xl border border-[var(--border-dark)] dark:border-[var(--border-light)] max-h-[350px] overflow-auto">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                    Deutsch
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                    Português (BR)
                    <Check className="ms-auto" />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-[var(--fill-tsp-white-main)] cursor-pointer text-sm text-[var(--text-secondary)]">
                    Português (PT)
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="flex justify-center items-center cursor-pointer relative hover:opacity-80 w-[32px] h-[32px] rounded-lg hover:bg-[#37352f0a] [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0">
                    <div className="h-[6px] w-[6px] bg-red-500 rounded-full top-[3px] right-[3px] absolute"></div>
                    <Bell />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="rounded-[6px]">
                  <p>Atualizações</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Link href="/sign-in">
              <Button className="flex items-center justify-center gap-1.5 rounded-[20px] clickable group h-9 w-[110px] bg-[var(--Button-primary-black)] text-white duration-150">
                <span className="text-sm font-medium">Comece já</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
}