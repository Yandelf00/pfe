import { useState } from "react";
import AppLayout from '@/layouts/chef-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm} from '@inertiajs/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Eye, Trash, Pencil, Check, CircleOff } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Calendrier', href: '/professors/calendrier' },
];

export default function EnseignantCalendrier() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  // Événements dans le calendrier
  const calendarEvents = [
    { title: 'Début du semestre', start: '2025-09-01' },
    { title: 'Présentation des clubs', start: '2025-09-07' },
    { title: 'Séminaire IA', start: '2025-09-14' },
    { title: 'Forum des stages', start: '2025-10-12' },
    { title: 'Conférence cybersécurité', start: '2025-11-04' },
    { title: 'Examens mi-semestre', start: '2025-11-10', end: '2025-11-15' },
    { title: "Vacances d'hiver", start: '2025-12-20', end: '2026-01-05' },
  ];

  // Événements en attente
  const attentes = [
    { title: "Inscription pédagogique", start: "2025-08-25" },
    { title: "TP réseau prévu", start: "2025-09-21" },
    { title: "Atelier DevOps", start: "2025-10-05" },
    { title: "Journée portes ouvertes", start: "2025-10-15" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Calendrier" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex w-full h-10 flex justify-end">
          {/* AddEvent button can go here if needed */}
          <AddEvent/>
        </div>
        <div className="w-full h-full flex flex-row gap-4">
          {/* Calendrier */}

          <div className="w-2/3 h-full">

            <style>{`
              .fc .fc-day-today { background-color: #fef3c7!important; }
              .fc .fc-button { background-color: #4f46e5; border:none; }
              .fc .fc-button:hover { background-color: #6169c6; }
            `}</style>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="100%"
              events={calendarEvents}
              eventClick={(info) => {
                setSelectedEvent({ title: info.event.title, start: info.event.startStr });
                setOpen(true);
              }}
            />
          </div>

          {/* Événements en attente */}
          <div className="flex flex-col w-1/3">
            <h1 className="font-bold text-gray-800 mb-2">Événements en attente</h1>
            {attentes.length > 0 ? (
              <div className="flex flex-col gap-3 p-3">
                {attentes.map((evt, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded-md shadow flex justify-between border-l-4 border-[#6169c6]">
                    <span className="font-semibold">{evt.title}</span>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-600">{evt.start}</span>
                        <div className="flex flex-row gap-2 justify-end items-end">
                            <Check className="text-green-300 size-5"/>
                            <CircleOff className="text-red-300 size-4"/>
                        </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-400">Aucun événement en attente</p>
              </div>
            )}
          </div>
        </div>

        {/* Dialog pour modifier un événement */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier l’événement</DialogTitle>
              <DialogDescription>Changez le titre ou la date, puis enregistrez.</DialogDescription>
            </DialogHeader>
            {selectedEvent && (
              <form onSubmit={(e) => {
                e.preventDefault();
                console.log("Mis à jour :", selectedEvent);
                // 💾 envoyer à backend avec router.put(...)
                setOpen(false);
              }} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Titre</label>
                  <input
                    type="text"
                    value={selectedEvent.title}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                    className="border px-3 py-2 rounded text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm">Date</label>
                  <input
                    type="date"
                    value={selectedEvent.start}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, start: e.target.value })}
                    className="border px-3 py-2 rounded text-sm"
                  />
                </div>

                <div className="flex flex-row gap-1 justify-end">
                    <div className="flex justify-end pt-2">
                        <button className="bg-[#6169c6] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-md">Mettre à jour</button>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button className="bg-red-400 text-white px-4 py-2 rounded-md">Supprimer</button>
                    </div>
                </div>

              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}



{/* $table->string('type'); */}
{/* $table->date('date_evenement'); */}
{/* $table->text('description'); */}
{/* $table->string('status'); */}
{/* $table->foreignId('user_id') */}
{/*       ->nullable() */}
{/*       ->constrained('users') */}
{/*       ->onDelete('set null'); */}
{/* $table->foreignId('calendrier_id') */}
{/*       ->nullable() */}
{/*       ->constrained('calendriers') */}
{/*       ->onDelete('set null'); */}

function AddEvent() {
    const {data, setData, post, reset, processing, errors } = useForm({
        type : "",
        date_evenement : "",
        description : "",
        status : "",
    })
    return(
        <Dialog>
            <DialogTrigger asChild>
                <button className="h-9
                    text-white px-4 rounded w-36 cursor-pointer
                    dark:bg-white dark:text-black bg-[#6169c9]">
                     + Evenement
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ajouter un Evenement
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <section className="min-h-48 w-full ">
                    <form className ="w-full gap-3 h-full flex flex-col">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row w-full justify-between">
                                <h2>type</h2>
                            </div>
                            <input
                                type="text"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                name="type"
                                placeholder="Entrez le titre"
                                className="w-full border p-1 rounded"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row w-full justify-between">
                                <h2>date</h2>
                            </div>
                            <input
                                type = "date"
                                name="date"
                                onChange={(e) => setData('date_evenement', e.target.value)}
                                className="w-full resize-none border p-1 rounded"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row w-full justify-between">
                                <h2>Description</h2>
                            </div>
                            <textarea
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Entrez la description"
                                className="w-full h-24 resize-none border p-1 rounded"
                            />
                        </div>
                        <button
                        type = "submit"
                        disabled = {processing}
                        className="mt-5 bg-linear-to-bl rounded-sm
                          text-white py-1 from-[#6169c6] to-[#6d4798]
                          cursor-pointer">
                            Creer l'annonce
                        </button>
                    </form>
                </section>
            </DialogContent>

        </Dialog>
    )
}


