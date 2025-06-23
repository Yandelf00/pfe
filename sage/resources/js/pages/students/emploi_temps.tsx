import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { type EventApi } from "@fullcalendar/core";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/students/dashboard',
    },
];

export default function StudentEmploi()
{
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 py-10 flex-col gap-4 rounded-xl p-4">

                <FullCalendar
                  plugins={[timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  allDaySlot={false}
                  nowIndicator={false}
                  headerToolbar={false}
                  slotMinTime="08:00:00"
                  slotMaxTime="20:00:00"
                  initialDate="2023-01-02"
                  locale={frLocale}
                  editable={false}
                  selectable={false}
                  height="auto"
                  dayHeaderContent={(args) =>
                    args.date.toLocaleDateString("fr-FR", { weekday: "short" })
                  }
                  eventClick={(info) => handleEventClick(info.event)}
                  eventClassNames={() =>
                    "bg-indigo-500 hover:bg-green-600 cursor-pointer transition-colors duration-200 text-white px-2 py-1 rounded-md"
                  }
                  events={[
                    {
                      title: "Mathématiques",
                      start: "2023-01-02T08:30:00",
                      end: "2023-01-02T10:30:00",
                    },
                    {
                      title: "Physique",
                      start: "2023-01-03T10:00:00",
                      end: "2023-01-03T12:00:00",
                    },
                    {
                      title: "Informatique TD",
                      start: "2023-01-04T14:00:00",
                      end: "2023-01-04T16:00:00",
                    },
                    {
                      title: "Chimie",
                      start: "2023-01-05T09:00:00",
                      end: "2023-01-05T11:00:00",
                    },
                    {
                      title: "Projet",
                      start: "2023-01-06T13:00:00",
                      end: "2023-01-06T15:00:00",
                    },
                  ]}
                />
            </div>
        </AppLayout>
    )
}
