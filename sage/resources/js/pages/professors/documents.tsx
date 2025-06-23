import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/enseignant-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Head, usePage, useForm, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'documents',
        href: '/professors/documents',
    },
];

export default function EnseignantDocuments()
{

    const documents = [
      {
        id: 1,
        titre: "Chapitre 1 - Les pointeurs",
        type: "cours",
        fichier: "cours1_intro_programmation.pdf",
      },
      {
        id: 2,
        titre: "TD 1 - Structures de Données",
        type: "TD",
        fichier: "td2_structures_donnees.docx",
      },
      {
        id: 3,
        titre: "TD 2 - Structures de Données",
        type: "TD",
        fichier: "seminaire_ia_support.pdf",
      },
    ];
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row w-full h-10 justify-between items-center px-3 pt-4">
                    <div className="flex flex-row items-center gap-5">
                        <select className="border rounded-md px-3 py-2 text-sm">
                            <option value="programmation">Programmation II</option>
                            <option value="structures">Structures de données</option>
                            <option value="systeme">Système d'Exploitation II</option>
                            <option value="analyse">Analyse Numérique I</option>
                            <option value="architecture">Architecture des Ordinateurs</option>
                            <option value="electromagnetisme">Électromagnétisme</option>
                        </select>
                        <select className="border rounded-md px-3 py-2 text-sm">
                            <option value="tout">Tout</option>
                            <option value="cours">Cours</option>
                            <option value="td">TD</option>
                            <option value="tp">TP</option>
                        </select>
                    </div>
                    <AddDocument/>
                </div>
                <ul className="space-y-3 mt-5">
                    {documents.map((doc) => (
                        <li
                            key={doc.id}
                            className="flex items-center justify-between bg-gray-50
                            border rounded-lg py-3 px-4 shadow dark:bg-[#171818]"
                        >
                            <div>
                                <h2 className="font-semibold">{doc.titre}</h2>
                                <p className="text-sm text-gray-500">{doc.type.toLowerCase()}</p>
                            </div>

                            <div className="flex items-center flex-row gap-3">
                                <a
                                    href={`/storage/${doc.fichier}`}
                                    download
                                    className="h-8 w-20 text-[13px] flex items-center
                                    text-white justify-center
                                    bg-gradient-to-bl from-[#6169c6] to-[#6d4798]
                                    rounded-full cursor-pointer transition
                                    ease-in-out duration-200"
                                >
                                    Télécharger
                                </a>
                                <DeleteDocument/>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </AppLayout>
    )
}

function DeleteDocument() {
    return(
        <Dialog >
            <DialogTrigger asChild>
                <button
                    className="text-white
                    bg-red-400 h-8 w-20 text-[13px]
                    rounded-full cursor-pointer transition
                    ease-in-out duration-200"
                >
                     Supprimer
                </button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>
                        Supprimer le document
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>

                <div className="w-full h-full flex flex-col gap-4">
                    <p className="">
                        Est ce que vous êtes sûr de vouloir supprimer le document?
                    </p>
                    <div className="w-full flex flex-row justify-end items-center gap-3">
                        <DialogClose asChild>
                          <button className="bg-gray-200 text-black px-2 py-1 w-24 cursor-pointer rounded-md">
                            Annuler
                          </button>
                        </DialogClose>
                        <button className="bg-red-400 text-white cursor-pointer w-24 px-2 py-1 rounded-md">
                            Supprimer
                        </button>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}

function AddDocument() {
  const { data, setData, post, reset, processing, errors } = useForm({
    titre: "",
    type: "",
    fichier: null,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post("/documents", {
      onSuccess: () => reset(),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-9 text-white px-4 rounded w-36 cursor-pointer dark:bg-white dark:text-black bg-[#6169c9]">
          + Document
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un Document</DialogTitle>
        </DialogHeader>

        <section className="min-h-48 w-full">
          <form onSubmit={handleSubmit} className="w-full gap-4 flex flex-col">
            <div className="flex flex-col gap-1">
              <label htmlFor="titre" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Titre du document
              </label>
              <input
                type="text"
                id="titre"
                value={data.titre}
                onChange={(e) => setData("titre", e.target.value)}
                className="border rounded-md px-3 py-2 text-sm dark:bg-[#1e1e1e] dark:text-white"
                required
              />
              {errors.titre && <span className="text-sm text-red-500">{errors.titre}</span>}
            </div>

            <div className="flex flex-row gap-1">
                <div className="flex flex-col w-1/2 gap-1">
                    <label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Type
                    </label>
                    <select
                        id="type"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm dark:bg-[#1e1e1e] dark:text-white"
                        required
                    >
                        <option value="">-- Sélectionner --</option>
                        <option value="Cours">Cours</option>
                        <option value="TD">TD</option>
                        <option value="TP">TP</option>
                    </select>
                    {errors.type && <span className="text-sm text-red-500">{errors.type}</span>}
                </div>
                <div className="flex flex-col w-1/2 gap-1">
                    <label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Module
                    </label>
                    <select
                        id="type"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm dark:bg-[#1e1e1e] dark:text-white"
                        required
                    >
                        <option value="">Programmation II</option>
                        <option value="Cours">Cours</option>
                        <option value="TD">TD</option>
                        <option value="TP">TP</option>
                    </select>
                    {errors.type && <span className="text-sm text-red-500">{errors.type}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fichier" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Fichier
              </label>
              <input
                type="file"
                id="fichier"
                onChange={(e) => setData("fichier", e.target.files[0])}
                className="text-sm text-gray-700 file:bg-[#6169c9] file:text-white file:px-4 file:py-2 file:rounded-md file:border-0 file:cursor-pointer dark:text-white"
                required
              />
              {errors.fichier && <span className="text-sm text-red-500">{errors.fichier}</span>}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={processing}
                className="bg-[#6d4798] hover:bg-[#5a387f] text-white px-4 py-2 rounded-md transition duration-200"
              >
                {processing ? "Envoi..." : "Ajouter"}
              </button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
function AddADocument() {
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
                     + Document
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
                    </form>
                </section>
            </DialogContent>

        </Dialog>
    )
}
