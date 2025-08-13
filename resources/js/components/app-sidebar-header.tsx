import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, type User } from '@/types';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
}

export function AppSidebarHeader({ breadcrumbs = [] }: AppSidebarHeaderProps) {
    const { auth } = usePage<{ auth: { user?: User } }>().props;
    const { post, processing } = useForm();

    const handleNewChat = () => {
        if (!auth.user) {
            router.visit('/login');
        } else {
            post('/chat');
        }
    };

    return (
        <header className="border-sidebar-border/50 bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 px-6 transition-[width,height] ease-linear md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-2">
                {!auth.user ? (
                    <>
                        <Button variant="ghost" size="sm" asChild className='flex min-w-[74px] min-h-9 py-2 px-3 justify-center items-center content-center gap-y-1.5 gap-x-1.5 flex-wrap rounded-[10px] bg-primary hover:opacity-80 duration-300 cursor-pointer select-none'>
                            <Link href="/login" className="text-sm font-medium text-primary-foreground">Sign in</Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="flex h-9 min-w-16 min-h-9 py-2 px-3 justify-center items-center gap-1.5 rounded-[10px] border border-[#0000001f] hover:opacity-80 duration-300 cursor-pointer select-none">
                            <Link href="/register" className='text-[var(--text-primary)] text-sm font-medium'>Sign up</Link>
                        </Button>
                    </>
                ) : (
                    <Button variant="ghost" size="icon" onClick={handleNewChat} disabled={processing}>
                        <Plus className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </header>
    );
}
