import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/chef-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import SearchInput from '@/components/search-input';
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
        title: 'Annonces',
        href: '/department-chief/annonces',
    },
];

export default function ChefAnnonce()
{
    const { props } = usePage();
    const annonces = props.annonces;
    const dialogCloseTag = useRef<HTMLDivElement>(null);

    //fonction pour supprimer l'annonce
    function deleteAnnonce(annonceId : number){
        router.delete(route('depchiefs.supprimerAnnonce', annonceId), {
            preserveScroll:true,
            onSuccess : () => {
                toast.success("Annonce supprimée !");
                dialogCloseTag.current?.click();
            },
        })
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl ">
                <div className="w-full flex flex-row justify-between p-4">
                    <SearchInput />
                    <div className="flex flex-row gap-4">
                        <AjouterAnnonce />
                    </div>
                </div>
                <div className="w-full h-full ">
                    {annonces.length > 0 ? (
                        <div className="w-full h-full flex flex-col gap-3 p-3 ">
                            {annonces.map((annonce)=>(
                                <div className="p-2 w-full h-28 bg-gray-50
                                    shadow-md rounded-md flex gap-1 flex-col
                                    border-l-4 border-[#6169c6]"
                                    key={annonce.id}>
                                    <div className="w-full flex flex-row justify-between">
                                        <h2 className="font-semibold text-[19px] ">{annonce.titre}</h2>
                                        <p>{annonce.created_at.slice(0,10)}</p>
                                    </div>
                                    <div className="flex flex-row justify-between h-full w-full">
                                        <p>{annonce.contenu}</p>
                                        <div className="flex items-end gap-2 flex flex-row" >
                                            <Eye className="size-4 cursor-pointer hover:text-blue-600
                                            transition-all ease-in-out duration-200"/>

                                            <Dialog>
                                                <DialogTrigger>
                                                    <Trash className="size-4 cursor-pointer hover:text-red-600
                                                    transition-all ease-in-out duration-200"/>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Supprimer l'annonce
                                                        </DialogTitle>
                                                        <DialogDescription></DialogDescription>
                                                    </DialogHeader>
                                                    {/* <p>msld</p> */}
                                                    {/* <button onClick={()=>deleteAnnonce(annonce.id)}>supprimer</button> */}
                                                    <div ref={dialogCloseTag} className="hidden"></div>

                                                    <DeleteModal tableId={annonce.id} deleteTable={deleteAnnonce} />
                                                </DialogContent>
                                            </Dialog>
                                            <ModifierAnnonce annonce = { annonce }/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full w-full flex justify-center items-center">
                            <p className="font-semibold text-gray-400">Aucune annonce à afficher pour le moment</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

type DeleteModalProps = {
    tableId : number;
    deleteTable : (tbi : number) => void;
}

function DeleteModal({ tableId, deleteTable } : DeleteModalProps)
{
    return (
        <section className="flex flex-col">
            <p>êtes-vous sûr de vouloir supprimer l'annonce ? </p>
            <div className="w-full flex flex-row items-end justify-end">
                <button className="w-24 h-8 text-white rounded-md bg-red-400"
                onClick={()=>deleteTable(tableId)}>delete</button>
            </div>
        </section>
    )
}


function AjouterAnnonce() {
    const { auth } = usePage().props;
    const { data, setData, reset, post, processing, errors } = useForm({
    title : "",
    description : "" ,
    });
    const closeDialog = useRef<HTMLDivElement>(null);

    function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        post('/department-chiefs/annonces', {
            preserveScroll: true,
            onSuccess : () => {
                reset();
                toast.success("Annonce ajouté !");
            },
        });
        closeDialog.current?.click();
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="h-9
                        text-white px-4 rounded w-48 cursor-pointer bg-linear-to-bl
                        from-[#6169c6] to-[#6d4798]
                        dark:bg-white dark:text-black">
                        + Nouvelle Annonce
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un annonce</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                        <div className="min-h-48 w-full ">
                            <form onSubmit={handleSubmit} className ="w-full gap-3 h-full flex flex-col">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-row w-full justify-between">
                                        <h2>Titre</h2>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        name="titre"
                                        placeholder="Entrez le titre"
                                        className="w-full border p-1 rounded"
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
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-row w-full justify-between">
                                        <h2>Attachement</h2>
                                    </div>
                                    <input
                                        type="file"
                                        name="piece"
                                        className="w-full border p-1 rounded"
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
                        </div>
                        <DialogClose asChild>
                            <div ref={closeDialog} className="hidden"></div>
                        </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    )
}


function ModifierAnnonce({ annonce }: { annonce: any }) {
    const { data, setData, reset, put, processing, errors } = useForm({
        title: annonce.titre || '',
        description: annonce.contenu || '',
        attachment: null
    });

    const closeDialog = useRef<HTMLDivElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.attachment) formData.append('attachment', data.attachment);

        put(`/department-chiefs/annonces/${annonce.id}`, {
            preserveScroll: true,
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                toast.success('Annonce modifiée !');
                closeDialog.current?.click();
            },
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil className="size-4 cursor-pointer hover:text-green-600
                transition-all ease-in-out duration-200"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier l’annonce</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="border p-1 rounded"
                    />
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="border p-1 rounded resize-none h-24"
                    />
                    <input
                        type="file"
                        onChange={(e) => setData('attachment', e.target.files?.[0] || null)}
                        className="border p-1 rounded"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-purple-600 text-white py-1 rounded"
                    >
                        Sauvegarder
                    </button>
                </form>
                <DialogClose asChild>
                    <div ref={closeDialog} className="hidden" />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
