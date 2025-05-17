'use client'

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { ArrowLeft, Check, ChevronsUpDown, Download, Focus, ImageUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
]  

export default function Essay() {
    const user = useUser();

    return (
        <main className="flex min-h-screen flex-col w-full items-center justify-start bg-[#FBFBFB] pt-16 lg:pt-12 md:pt-12 dark:bg-[#191919]">
            <div className="max-w-screen-xl w-full mx-auto py-6 px-4">
                <Link href={'/home'} className="flex items-center gap-2 mb-6 text-sm text-blue-600">
                    <ArrowLeft size={18} className="text-blue-600" />
                    Voltar
                </Link>
                <p className="text-xl font-semibold mb-3 leading-6">
                    Bom te ver aqui {user && user.user?.firstName}! Escolha qual maneira você quer enviar sua redação
                </p>
                <p className="text-sm mb-8">
                    Abaixo, você pode escolher entre enviar sua redação através de um arquivo ou tirar uma foto dela.
                </p>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-start gap-2">
                        <div className="w-16 flex items-start pt-1">
                            <Focus className="text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-medium">Tirar foto</p>
                            <span className="text-sm text-muted-foreground leading-4">
                                Abra a câmera do seu celular ou computador e tire uma foto da sua redação. Você pode usar a câmera frontal ou traseira.
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-2">
                        <div className="w-16 flex items-start pt-1">
                            <ImageUp className="text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-medium">Escolher da galeria</p>
                            <span className="text-sm text-muted-foreground leading-4">
                                Escolha uma foto da sua galeria ou câmera do celular. Você pode usar a câmera frontal ou traseira.
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-2">
                        <div className="w-16 flex items-start pt-1">
                            <Download className="text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-medium">Escolher dos arquivos</p>
                            <span className="text-sm text-muted-foreground leading-4">
                                Escolha um arquivo do seu computador. Você pode escolher entre PDF, DOCX ou TXT.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}