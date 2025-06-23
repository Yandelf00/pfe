import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calendrier',
        href: '/students/calendrier',
    },
];

export default function StudentCalender()
{
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <style>{`
                    .fc .fc-day-today {
                      background-color: #fef3c7 !important;
                    }
                    .fc .fc-button {
                      background-color: #4f46e5;
                      border : none;
                    }

                    .fc .fc-button:hover {
                      background-color: #6169c6;
                      border : none;
                    }
                    `}</style>
                      <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        height="100%"
                        events={[
                          {
                            title: 'Début du semestre',
                            start: '2025-09-01',
                          },
                          {
                            title: 'Présentation des clubs',
                            start: '2025-09-07',
                          },
                          {
                            title: 'Séminaire Intelligence Artificielle',
                            start: '2025-09-14',
                          },
                          {
                            title: 'Soutenance de projets',
                            start: '2025-10-01',
                            end: '2025-10-03',
                          },
                          {
                            title: 'Journée Portes Ouvertes',
                            start: '2025-10-15',
                          },
                          {
                            title: 'Examens Mi-Semestre',
                            start: '2025-11-10',
                            end: '2025-11-15',
                          },
                          {
                            title: 'Vacances d\'hiver',
                            start: '2025-12-20',
                            end: '2026-01-05',
                          },
                        ]}
                      />
                </div>
        </AppLayout>
    )
}
