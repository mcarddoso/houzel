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
import HourglassPNG from "../../../public/Hourglass.png";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import React from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="top-0 left-0 w-full z-[2] flex items-center gap-2 py-3 px-4 border-b border-[var(--border-main)] bg-[var(--background-gray-main)] lg:hidden ">
        <div className="relative w-9 h-9 bg-[var(--Button-primary-white)] rounded-lg border border-[var(--border-main)] flex items-center justify-center text-[var(--text-primary)]">
          <Image
            src={HourglassPNG}
            width={20}
            alt="houzel"
          />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <div className="text-[var(--text-primary)] text-sm font-semibold">
            Houzel App
          </div>
          <div className="text-[var(--text-tertiary)] text-xs">Deixa com a Houzel</div>
        </div>
        <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-[var(--Button-primary-black)] text-[var(--text-onblack)] h-[32px] px-[8px] rounded-[8px] gap-[4px] hover:opacity-90">Download</div>
      </div>
      <div className="flex justify-between items-center w-full max-w-[1600px] mx-auto h-14 px-6 transition-all duration-200">
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center gap-2">
            <Hourglass />
            <p className="text-xl tracking-tight font-serif font-bold">houzel</p>
          </div>
          <div className="lg:flex hidden gap-10 h-8 items-center flex-wrap flex-row overflow-hidden">
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
          <Link href="/sign-in" className="hidden lg:block">
            <Button className="flex items-center justify-center gap-1.5 rounded-[20px] clickable group h-9 w-[110px] bg-[var(--Button-primary-black)] text-white duration-150">
              <span className="text-sm font-medium">Comece já</span>
            </Button>
          </Link>
          <div className="lg:hidden block" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" color="var(--icon-primary)"><g clipPath="url(#:R3j4bqqdb:_clip0)"><path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id=":R3j4bqqdb:_clip0"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
          </div>
        </div>
      </div>
      { menuOpen && (
        <>
          <div className="fixed top-[130px] left-0 w-full h-full duration-150 bg-black opacity-[0.6] z-[89]" onClick={() => setMenuOpen(!menuOpen)}></div>
          <div className="absolute w-full top-[115px] z-[90]">
            <div className="px-[20px] [background:#fefefe] w-full">
              <div className="h-[64px] flex items-center text-[var(--theme-text-primary)] text-[16px] font-semibold leading-[120%]">Casos de uso</div>
              <div className="h-[64px] flex items-center text-[var(--theme-text-primary)] text-[16px] font-semibold leading-[120%]">Comunidade</div>
              <div className="h-[64px] flex items-center text-[var(--theme-text-primary)] text-[16px] font-semibold leading-[120%]">Benchmarks</div>
              <div className="h-[64px] flex items-center text-[var(--theme-text-primary)] text-[16px] font-semibold leading-[120%]">Pricing</div>
              <Link href="/sign-in" className="h-[64px] flex items-center text-[var(--theme-text-primary)] text-[16px] font-semibold leading-[120%]">
                Comece já
              </Link>
            </div>
          </div>
        </>
      ) }
    </div>
  )
}