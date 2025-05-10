'use client'

import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { ChevronsUpDown, Moon, PanelRightClose, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Nav() {

    const { setTheme } = useTheme();
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const user = useUser();

    const toggleTheme = () => {
        const newTheme = darkTheme ? "light" : "dark";
        setTheme(newTheme);
        setDarkTheme(!darkTheme);
    }
    
    return (
        <header className="flex justify-end items-center px-4 dark:bg-[#131313] border-[#E8E8E8] bg-[#F6F6F6] border-b dark:border-[#2d2d2d] h-16 lg:h-12 md:h-12 fixed top-0 w-full">
            <nav className="flex justify-end items-center text-foreground w-full">
                <Button variant="ghost" size="sm" className='text-sm px-2 font-medium [&_svg]:size-5'>
                    <PanelRightClose className='text-muted-foreground' />
                </Button>
                <Button variant="ghost" size="sm" className='text-sm px-2 font-medium [&_svg]:size-3'>
                    <div className="w-4 h-4 rounded-full bg-green-800"></div>
                    {user.user?.firstName}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className='me-auto text-sm px-2 [&_svg]:size-3'>
                            <ChevronsUpDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Perfil
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Configurações
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>Professores</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <SignOutButton>
                            <DropdownMenuItem>
                                Log out
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" className="dark:hover:bg-[#2D2D2D] rounded-sm text-sm" onClick={() => toggleTheme()}>
                    { darkTheme ? (
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    ) : (
                        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    ) }
                    {/* { darkTheme ? (
                        <p>Claro</p>
                    ) : (
                        <p>Escuro</p>
                    ) } */}
                    <span className="sr-only">Toggle theme</span>
                </Button>
                {/* <UserButton /> */}
            </nav>
        </header>
    )
}