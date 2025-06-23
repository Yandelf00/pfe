import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavEnseignant} from '@/components/nav-enseignant';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid,
BookCopy, UserRoundCog, GraduationCap, User, UserPlus,
CalendarDays, FileStack, BookCheck, Calendar, Megaphone, TriangleAlert} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Etudiants',
        href: '/professors/etudiants',
        icon: GraduationCap,
    },
    {
        title: 'Notes',
        href: '/professors/notes',
        icon: BookCheck,
    },
    {
        title: 'Documents',
        href: '/professors/documents',
        icon: FileStack ,
    },
    {
        title: 'Calendrier',
        href: '/professors/calendrier',
        icon: Calendar,
    },
    {
        title: 'Annonces',
        href: '/professors/annonces',
        icon: Megaphone,
    },
    {
        title: 'Absences',
        href: '/professors/absences',
        icon: TriangleAlert,
    },
];


export function AppEnseignantSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                {/* <AppLogo /> */}
                                <h1 class="font-semibold text-[20px] ">SAGE</h1>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavEnseignant/>
            </SidebarFooter>
        </Sidebar>
    );
}
