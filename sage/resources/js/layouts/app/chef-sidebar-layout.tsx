import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppChefSidebar } from '@/components/app-sidebar-chef';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Bell } from "lucide-react";
import { Link } from '@inertiajs/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ChefSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>)
{
    const notifs = [
      {
        id: 1,
        type: "important",
        message: "Validation requise : publication du planning des examens.",
        date_envoi: "2025-06-22",
      },
      {
        id: 2,
        type: "alert",
        message: "Absence signalée : M. El Amrani (Analyse Numérique) — 3 jours.",
        date_envoi: "2025-06-21",
      },
    ];
    return (
        <AppShell variant="sidebar" class="relative">
            <AppChefSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <Popover >
                    <PopoverTrigger>
                        <Bell className="absolute right-5 top-5 size-5 cursor-pointer
                            hover:text-blue-600 transition-all ease-in-out duration-200"/>
                    </PopoverTrigger>
                    <PopoverContent className="absolute w-[25rem]  p-0 left-48 top-[-25px]" >
                      {notifs.map((notification) => {
                        let bgColor = "bg-white"; // default

                        if (notification.type === "important") {
                          bgColor = "bg-red-50";
                        } else if (notification.type === "alert") {
                          bgColor = "bg-yellow-50";
                        } else if (notification.type === "message") {
                          bgColor = "bg-white";
                        }

                        return (
                          <div
                            key={notification.id}
                            className={`${bgColor} p-3 w-full transition-all duration-300 `}
                          >
                            <p className="text-sm font-semibold text-gray-800">{notification.message}</p>
                            <div className="mt-2 text-xs text-gray-500 flex justify-between">
                              <span className="capitalize">{notification.type}</span>
                              <span>{notification.date_envoi}</span>
                            </div>
                          </div>
                        );
                      })}
                    </PopoverContent>
                </Popover>
                {children}
            </AppContent>
        </AppShell>
    );
}
