import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/chef-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/department-chief/dashboard',
    },
];

export default function ChefCalendrier()
{
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full h-10 flex justify-end ">
                    <AddEvent/>
                </div>
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
                  plugins={[ dayGridPlugin ]}
                  initialView="dayGridMonth"
                  height="100%"
                />
            </div>
        </AppLayout>
    )
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
                                className="w-full h-24 resize-none border p-1 rounded"
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


