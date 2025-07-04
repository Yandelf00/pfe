import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavChef} from '@/components/nav-chef';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid,
BookCopy, UserRoundCog, GraduationCap, User, UserPlus,
CalendarDays, Calendar, Megaphone, TriangleAlert, BookMarked} from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion Etudiants',
        href: '/department-chiefs/gestion_etudiants',
        icon: GraduationCap,
    },
    {
        title: 'Gestion Enseignants',
        href: '/department-chiefs/gestion_enseignants',
        icon: User,
    },
    {
        title: 'Emploi du Temps',
        href: '/department-chiefs/emploi_de_temps',
        icon: CalendarDays,
    },
    {
        title: 'Modules',
        href: '/department-chiefs/modules',
        icon: BookMarked,
    },
    {
        title: 'Calendrier',
        href: '/department-chiefs/calendrier',
        icon: Calendar,
    },
    {
        title: 'Annonces',
        href: '/department-chiefs/annonces',
        icon: Megaphone,
    },
    {
        title: 'Etudiants en Difficulté',
        href: '/admins/type-utilisateur',
        icon: TriangleAlert,
    },
];


export function AppChefSidebar() {
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
                <NavChef/>
            </SidebarFooter>
        </Sidebar>
    );
}
