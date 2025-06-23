import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from "react";
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
        title: 'Absences',
        href: '/students/absences',
    },
];


export default function StudentDashboard()
{
    const absences = [
      { module: "Programmation II", motif: "", date: "2025-03-12" },
      { module: "Système d'Exploitation II", motif: "Retard de transport", date: "2025-04-03" },
      { module: "Électromagnétisme", motif: "Problème personnel", date: "2025-05-09" },
    ];
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {absences.map((absence, index) => {
                  return !absence.motif ? (
                    <li
                      key={index}
                      className="flex items-center h-20 justify-between bg-red-50
                      border rounded-lg py-3 px-4 shadow dark:bg-[#2c2c1f]"
                    >
                      <div>
                        <h2 className="font-semibold text-red-900">{absence.module}</h2>
                        <p className="text-sm text-red-700">{absence.date}</p>
                      </div>

                        <Justifier/>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className="flex items-center h-20 justify-between bg-green-50
                      border rounded-lg py-3 px-4 shadow dark:bg-[#171818]"
                    >
                      <div>
                        <h2 className="font-semibold text-green-900">{absence.module}</h2>
                        <p className="text-sm text-gray-500">{absence.date}</p>
                        <p className="text-xs italic text-green-600">Motif : {absence.motif}</p>
                      </div>
                    </li>
                  );
                })}
            </div>
        </AppLayout>
    )
}

function Justifier({ module, date }: { module: string; date: string }) {
  const [motif, setMotif] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can later replace this with Inertia.post or fetch
    console.log("Justification submitted:", {
      module,
      date,
      motif,
      file,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="px-4 py-2 text-white bg-red-400 rounded-full cursor-pointer transition ease-in-out duration-200"
        >
          justifier
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Justifier l’absence</DialogTitle>
          <DialogDescription>
            {module} — {date}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="motif" className="text-sm font-medium">Motif</label>
            <textarea
              id="motif"
              name="motif"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Ex : Maladie, rendez-vous médical, etc."
              className="border rounded-md p-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="justificatif" className="text-sm font-medium">Fichier justificatif</label>
            <input
              id="justificatif"
              name="justificatif"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Annuler
              </button>
            </DialogClose>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Envoyer
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
