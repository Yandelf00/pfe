import { useState } from "react";
import AppLayout from "@/layouts/chef-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { type EventApi } from "@fullcalendar/core";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Emploi du temps",
    href: "/department-chief/dashboard",
  },
];

export default function EmploiTemps() {
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEventClick = (event: EventApi) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Emploi du temps" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {/* FullCalendar */}

        <div className="flex flex-row items-center justify-between gap-4 mb-4">
          {/* Select for filtering */}
          <div className="flex items-center gap-2">
            <label htmlFor="filiere" className="text-sm font-medium text-gray-700 dark:text-white">
              Filtrer par Promotion
            </label>
            <select
              id="filiere"
              name="filiere"
              className="rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="smi-s1">SMI-S1</option>
              <option value="smi-s2">SMI-S2</option>
              <option value="sma-s1">SMA-S1</option>
              <option value="sma-s2">SMA-S2</option>
              <option value="smp-s1">SMP-S1</option>
              <option value="smp-s2">SMP-S2</option>
              <option value="smc-s1">SMC-S1</option>
              <option value="smc-s2">SMC-S2</option>
              <option value="svt-s1">SVT-S1</option>
              <option value="svt-s2">SVT-S2</option>
              <option value="stu-s1">STU-S1</option>
              <option value="stu-s2">STU-S2</option>
            </select>
          </div>

          {/* Add event button */}
          <AjouterEvent/>
        </div>

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

        {/* Dialog (shadcn) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title ?? "Événement"}</DialogTitle>
            <DialogDescription>
              <p>
                Début :{" "}
                <strong>
                  {selectedEvent?.start?.toLocaleString("fr-FR")}
                </strong>
              </p>
              <p>
                Fin :{" "}
                <strong>
                  {selectedEvent?.end?.toLocaleString("fr-FR")}
                </strong>
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setConfirmDeleteOpen(true)}
              className="text-white bg-red-400 h-7 w-24 rounded hover:bg-red-800 text-sm"
            >
              Supprimer
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setEditDialogOpen(true);
              }}
              className="text-white bg-blue-400 h-7 w-24 rounded hover:bg-blue-800 text-sm"
            >
              Modifier
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Second: Delete confirmation dialog (separate, controlled outside) */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Es-tu sûr de vouloir supprimer cette seance?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <button className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                Annuler
              </button>
            </DialogClose>
            <button
              className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-700 rounded"
              onClick={() => {
                alert("Suppression effectuée");
                setConfirmDeleteOpen(false);
                setOpen(false);
              }}
            >
              Supprimer
            </button>
          </div>
        </DialogContent>
      </Dialog>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la seance</DialogTitle>
              <DialogDescription>
                Mets à jour les informations de la seance.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-white">Titre</label>
                <input
                  type="text"
                  defaultValue={selectedEvent?.title}
                  className="rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium text-gray-700 dark:text-white">Heure de début</label>
                  <input
                    type="time"
                    defaultValue={selectedEvent?.start?.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                    className="rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium text-gray-700 dark:text-white">Heure de fin</label>
                  <input
                    type="time"
                    defaultValue={selectedEvent?.end?.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                    className="rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-bl from-[#6169c6] to-[#6d4798] hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}


function AjouterEvent() {
    return (
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="bg-gradient-to-bl from-[#6169c6] to-[#6d4798] hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                + Ajouter une seance
              </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="font-bold text-gray-700">
                    Ajouter une seance
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <form className="flex flex-col gap-2 ">
                    <div className="flex flex-row w-full gap-1 justify-between">
                      <div className="flex flex-col items-start gap-2 w-1/2">
                        <label htmlFor="filiere" className="text-sm px-1 font-medium text-gray-700 dark:text-white">
                            Promotion
                        </label>
                        <select
                          id="filiere"
                          name="filiere"
                          className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="smi-s1">SMI-S1</option>
                          <option value="smi-s2">SMI-S2</option>
                          <option value="sma-s1">SMA-S1</option>
                          <option value="sma-s2">SMA-S2</option>
                          <option value="smp-s1">SMP-S1</option>
                          <option value="smp-s2">SMP-S2</option>
                          <option value="smc-s1">SMC-S1</option>
                          <option value="smc-s2">SMC-S2</option>
                          <option value="svt-s1">SVT-S1</option>
                          <option value="svt-s2">SVT-S2</option>
                          <option value="stu-s1">STU-S1</option>
                          <option value="stu-s2">STU-S2</option>
                        </select>
                      </div>
                      <div className="flex flex-col items-start gap-2 w-1/2">
                        <label htmlFor="filiere" className="text-sm px-1 font-medium text-gray-700 dark:text-white">
                            Module
                        </label>
                        <select
                          id="filiere"
                          name="filiere"
                          className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="smi-s1">Algèbre I</option>
                          <option value="smi-s2">SMI-S2</option>
                          <option value="sma-s1">SMA-S1</option>
                          <option value="sma-s2">SMA-S2</option>
                          <option value="smp-s1">SMP-S1</option>
                          <option value="smp-s2">SMP-S2</option>
                          <option value="smc-s1">SMC-S1</option>
                          <option value="smc-s2">SMC-S2</option>
                          <option value="svt-s1">SVT-S1</option>
                          <option value="svt-s2">SVT-S2</option>
                          <option value="stu-s1">STU-S1</option>
                          <option value="stu-s2">STU-S2</option>
                        </select>
                      </div>
                    </div>

                    {/* time  */}

                    <div className="flex flex-row gap-1 justify-between">
                        <div className="flex gap-1 w-1/3 flex-col">
                            <label className="text-sm px-1 font-medium text-gray-700 dark:text-white">Heure de début</label>
                            <input
                                type="time"
                                className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex gap-1 w-1/3 flex-col">
                            <label className="text-sm px-1 font-medium text-gray-700 dark:text-white">Heure de fin</label>
                            <input
                                type="time"
                                className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex gap-1 w-1/3 flex-col">
                            <label className="text-sm px-1 font-medium text-gray-700 dark:text-white">Salle</label>
                            <input
                                type="text"
                                className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <button
                    className="bg-gradient-to-bl from-[#6169c6] to-[#6d4798] hover:brightness-110 text-white px-4 py-2 rounded-lg mt-3 text-sm font-medium transition"
                    >Ajouter</button>
                </form>
            </DialogContent>

          </Dialog>
    )
}
