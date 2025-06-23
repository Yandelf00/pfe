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
import { Eye, Trash, Pencil} from 'lucide-react';
import { toast } from "sonner";
import { useState, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modules',
        href: '/department-chief/modules',
    },
];

export default function ChefDashboard()
{
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row items-center justify-between gap-4 mb-4">
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
                    <AjouterModules/>
                </div>
                <AfficherModules/>

            </div>
        </AppLayout>
    )
}

function AjouterModules(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="bg-gradient-to-bl from-[#6169c6] to-[#6d4798] hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    + Ajouter un module
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un module</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>

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
                                Enseignant
                            </label>
                            <select
                              id="filiere"
                              name="filiere"
                              className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="smi-s1">Pr. El Mahdi Bakkali</option>
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
                            <input
                              type ="text"
                              id="filiere"
                              name="filiere"
                              className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                            </input>
                          </div>
                        </div>
                        <button
                        className="bg-gradient-to-bl from-[#6169c6] to-[#6d4798] hover:brightness-110 text-white px-4 py-2 rounded-lg mt-3 text-sm font-medium transition"
                        >Ajouter</button>
                    </form>

                <DialogClose asChild>
                    <div className="hidden" />
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

function AfficherModules(){
    const modules = [
        { name: "Algèbre I", prof: "Pr. El Mahdi Bakkali" },
        { name: "Analyse I", prof: "Pr. Fatima Zahra Bennani" },
        { name: "Introduction à l'informatique", prof: "Pr. Youssef Amrani" },
        { name: "Logique Mathématique", prof: "Pr. Khadija Idrissi" },
        { name: "Méthodologie et Communication", prof: "Pr. Rachid El Alaoui" },
    ];
    return(
        <section className="w-full h-full flex flex-col gap-3">
            {modules.map((module, index)=>(
                <div className="p-2 w-full h-28 bg-gray-50
                    shadow-md rounded-md flex gap-1 flex-col
                    border-l-4 border-[#6169c6]"
                    key={index}>
                    <div className="w-full flex flex-row justify-between">
                        <h2 className="font-semibold text-[19px] ">{module.name}</h2>
                        <p>{module.prof}</p>
                    </div>
                    <div className="h-full w-full flex items-end justify-end ">
                        <div className="flex gap-2 flex-row">
                            {/* <Eye className="size-4 cursor-pointer hover:text-blue-600 */}
                            {/* transition-all ease-in-out duration-200"/> */}
                            <DeleteModule/>
                            <ModifierModule name={module.name}/>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

function ModifierModule({name} : {name : string}){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil className="size-4 cursor-pointer hover:text-green-600
                transition-all ease-in-out duration-200"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier le module</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>
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
                                Enseignant
                            </label>
                            <select
                              id="filiere"
                              name="filiere"
                              className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="smi-s1">Pr. El Mahdi Bakkali</option>
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
                            <input
                              type ="text"
                              id="filiere"
                              value={name}
                              name="filiere"
                              className="rounded-md w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                            </input>
                          </div>
                        </div>
                        <button
                        className="bg-gradient-to-bl from-[#6169c6] to-[#6d4798] hover:brightness-110 text-white px-4 py-2 rounded-lg mt-3 text-sm font-medium transition"
                        >Modifier</button>
                    </form>

                <DialogClose asChild>
                    <div className="hidden" />
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}


function DeleteModule(){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Trash className="size-4 cursor-pointer hover:text-red-600
                transition-all ease-in-out duration-200"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Supprimer le module</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>
                <section className="flex flex-col">
                    <p>êtes-vous sûr de vouloir supprimer le module? </p>
                    <div className="w-full flex flex-row items-end justify-end">
                        <button className="w-24 h-8 text-white rounded-md bg-red-400">delete</button>
                    </div>
                </section>
                <DialogClose asChild>
                    <div className="hidden" />
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
