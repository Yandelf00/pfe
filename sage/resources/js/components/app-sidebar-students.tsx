import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-student';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Megaphone, Folder, LayoutGrid, BookCopy,
GraduationCap, CalendarDays, Calendar, BookX} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Contenu Pédagogique',
        href: '/students/pedagogie',
        icon: BookCopy,
    },
    {
        title: 'Notes',
        href: '/students/notes',
        icon: GraduationCap,
    },
    {
        title: 'Emploi du Temps',
        href: '/students/emploi_de_temps',
        icon: CalendarDays,
    },
    {
        title: 'Calendrier',
        href: '/students/calendrier',
        icon: Calendar,
    },
    {
        title: 'Absences',
        href: '/students/absences',
        icon: BookX,
    },
    {
        title: 'Annonces',
        href: '/students/annonces',
        icon: Megaphone,
    },
];


export function AppStudentSidebar() {
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
