import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import SearchInput from '@/components/search-input';
import NoData from '@/components/no-data';
import AppLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { type User} from '@/types';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { toast } from "sonner";
import { Search, Trash, Pencil} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Enseignants',
        href: '/admins/enseignants',
    },
];

export default function Enseignants()
{
    const [isList, setIsList] = useState(true)
    const [search, setSearch] = useState("")
    const { props } = usePage();
    const enseignants = props.enseignants;

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl ">
                <div className="w-full flex flex-row justify-between p-4">
                    <SearchInput />
                    <div className="flex flex-row gap-4">
                        <ImportEnseignants/>
                        {isList ? (
                            <button onClick={()=>setIsList(false)} className="h-8 cursor-pointer text-white w-24 px-4 rounded bg-black dark:bg-white dark:text-black">
                                Ajouter
                            </button>
                        ):(
                            <button onClick={()=>setIsList(true)} className="h-8 cursor-pointer text-white w-24 px-4 rounded bg-black dark:bg-white dark:text-black">
                                Liste
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-full h-full">
                {isList === true ? (
                    enseignants.length <= 0 ? (
                        <NoData text="aucun enseignant à afficher"/>
                    ) : (
                        <div className="w-full h-full">
                            <AfficherEnseignant search={search}/>
                        </div>
                    )
                ):(
                    <div className="w-full h-full px-4">
                        <AjouterEnseignant/>
                    </div>
                )}
                </div>
            </div>
        </AppLayout>
    )
}

//modifier l'enseignant

function ModifierEnseignant({ chef } : { chef : User})
{
    const { data, setData, reset, processing, errors } = useForm({
    name: chef.name,
    prenom: chef.prenom,
    email: chef.email,
    departement: chef.departement,
    number: chef.number,
    address: chef.address,
    date_naissance: chef.date_naissance,
    cin: chef.cin,
    speciality: chef.profile.speciality,
    });

    function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        router.patch(route('admins.updateEnseignant', chef.id), data, {
            onSuccess : () => {
                toast.success("Enseignant modifié!")
            },
            onError: (err) => {
              console.error('Validation errors:', err);
              toast.error("Une erreur est survenue.");
            },
        });
    }

    return(
        <section className="h-full w-full text-black">
            <form onSubmit={ handleSubmit } className="space-y-4 w-full">
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Nom</h2>
                            {errors.name && <p className="text-red-500 text-[10px]">{errors.name}</p>}
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Entrez le nom :"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Prenom</h2>
                            {errors.prenom && <p className="text-red-500 text-[10px]">{errors.prenom}</p>}
                        </div>
                        <input
                            type="text"
                            name="prenom"
                            value={data.prenom}
                            onChange={(e) => setData('prenom', e.target.value)}
                            placeholder="Entrez le prenom : "
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Email</h2>
                            {errors.email&& <p className="text-red-500 text-[10px]">{errors.email}</p>}
                        </div>
                        <input
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Entrez l'email:"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Numero de téléphone</h2>
                            {errors.number && <p className="text-red-500 text-[10px]">{errors.number}</p>}
                        </div>
                        <input
                            type="text"
                            name="number"
                            value={data.number}
                            onChange={(e) => setData('number', e.target.value)}
                            placeholder="Entrez le numero : "
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Departement</h2>
                            {errors.departement&& <p className="text-red-500 text-[10px]">{errors.departement}</p>}
                        </div>
                        <input
                            type="text"
                            name="departement"
                            value={data.departement}
                            onChange={(e) => setData('departement', e.target.value)}
                            placeholder="Entrez le département"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Adresse</h2>
                            {errors.address && <p className="text-red-500 text-[10px]">{errors.address}</p>}
                        </div>
                        <input
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Entrez l'adresse"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>CIN</h2>
                            {errors.cin && <p className="text-red-500 text-[10px]">{errors.cin}</p>}
                        </div>
                        <input
                            type="text"
                            name="cin"
                            value={data.cin}
                            onChange={(e) => setData('cin', e.target.value)}
                            placeholder="Entrez le cin"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Spécialité</h2>
                            {errors.speciality && <p className="text-red-500 text-[10px]">{errors.speciality}</p>}
                        </div>
                        <input
                            type="text"
                            name="speciality"
                            value={data.speciality}
                            onChange={(e) => setData('speciality', e.target.value)}
                            placeholder="Entrez la spécialité"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row w-full justify-between">
                        <h2>Date de naissance</h2>
                        {errors.date_naissance && <p className="text-red-500 text-[10px]">{errors.date_naissance}</p>}
                    </div>
                    <input
                        type="date"
                        name="date_naissance"
                        value={data.date_naissance}
                        onChange={(e) => setData('date_naissance', e.target.value)}
                        placeholder="Date de naissance"
                        className="w-full border p-2 rounded text-gray-500"
                    />
                </div>

                <div className="w-full flex justify-center items-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black cursor-pointer w-48 mt-3 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Modifier
                    </button>
                </div>
            </form>

        </section>
    )
}


//afficher les enseignants
function AfficherEnseignant({ search } : { search : string })
{
    const { props } = usePage();
    const [open, setOpen] = useState(false);
    const closeDialog = useRef<HTMLButtonElement>(null);
    const enseignants = props.enseignants;

    //filter function for the search
    const filteredEnseignants= enseignants.filter((enseignant) => {
        const fullText = `${enseignant.name} ${enseignant.prenom} ${enseignant.email} ${enseignant.departement} ${enseignant.cin} ${enseignant.profile.speciality}`.toLowerCase();
        return fullText.includes(search.toLowerCase());
    });

    //function that deletes the desired chef
    function deleteEnseignant(profId : number){
        console.log("im here")
        router.delete(route('admins.deleteEnseignant', profId), {
            preserveScroll: true,
            onSuccess: () => {
                // optional: show success toast or alert
                toast.success("Enseignant supprimé avec succès!")
                closeDialog.current?.click();
            },
        });
    }
    return (
        <section className="w-full py-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-gray-100 dark:bg-[#171818] dark:text-gray-100 text-gray-700 rounded text-left">
                            <tr>
                                <th className="p-3">Nom</th>
                                <th className="p-3">Prénom</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Département</th>
                                <th className="p-3">CIN</th>
                                <th className="p-3">Spécialité</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEnseignants.map((enseignant, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition ease-in-out duration-200 dark:hover:bg-[#171818]">
                                    <td className="p-3">{enseignant.name}</td>
                                    <td className="p-3">{enseignant.prenom}</td>
                                    <td className="p-3">{enseignant.email}</td>
                                    <td className="p-3">{enseignant.departement}</td>
                                    <td className="p-3">{enseignant.cin}</td>
                                    <td className="p-3">{enseignant.profile.speciality}</td>
                                    <td className="p-3 gap-4 flex flex-row items-center justify-center ">
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Trash className="cursor-pointer
                                            size-4 hover:text-red-600 transition ease-in-out duration-200"/>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Confirmation</DialogTitle>
                                              <DialogDescription>
                                              </DialogDescription>
                                                <div className="w-full h-full flex flex-col gap-4">
                                                    <p className="">
                                                        Est ce que vous êtes sur de vouloir supprimer le chef de departement ?
                                                    </p>
                                                    <div className="w-full flex flex-row justify-end items-center gap-3">
                                                        <DialogClose asChild>
                                                          <button ref={closeDialog} className="bg-gray-200 text-black px-2 py-1 w-24 cursor-pointer rounded-md">
                                                            Annuler
                                                          </button>
                                                        </DialogClose>
                                                        <button onClick={()=>deleteEnseignant(enseignant.id)} className="bg-red-400 text-white cursor-pointer w-24 px-2 py-1 rounded-md">
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                          </DialogContent>
                                        </Dialog>

                                        <Dialog >
                                          <DialogTrigger asChild>
                                            <Pencil className="cursor-pointer size-4 hover:text-green-600 transition ease-in-out duration-200" />
                                          </DialogTrigger>
                                          <DialogContent className="w-[60rem] max-w-[90vw]">
                                            <DialogHeader>
                                              <DialogTitle >Modifier</DialogTitle>
                                              <DialogDescription>
                                              </DialogDescription>
                                                <div className="h-[31rem] w-full">
                                                    <ModifierEnseignant chef = {enseignant}/>
                                                </div>
                                            </DialogHeader>
                                          </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </section>
    )

}

//importer les enseignants en utilisant excel files
function ImportEnseignants()
{
    return(
        <div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-black h-8 text-white px-4 rounded w-24 cursor-pointer
                dark:bg-white dark:text-black">
                    Importer
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importer les enseignants</DialogTitle>
                  <DialogDescription>
                        say something here
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
        </div>
    )
}


// form that adds enseignant
function AjouterEnseignant()
{
    const { data, setData, post, reset, processing, errors } = useForm({
    name: '',
    prenom: '',
    email: '',
    password: '',
    departement: '',
    number: '',
    address: '',
    date_naissance: '',
    cin: '',
    speciality: '',
    });

    function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        post('/admins/enseignants/create', {
            onSuccess : () => {
                reset();
                toast.success("Enseignant ajouté!")
            },
        });
    }

    return(
        <section className="h-full w-full flex justify-center items-center">
            <form onSubmit={ handleSubmit } className="space-y-4 w-full">
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Nom</h2>
                            {errors.name && <p className="text-red-500 text-[10px]">{errors.name}</p>}
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Entrez le nom"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Prenom</h2>
                            {errors.prenom && <p className="text-red-500 text-[10px]">{errors.prenom}</p>}
                        </div>
                        <input
                            type="text"
                            name="prenom"
                            value={data.prenom}
                            onChange={(e) => setData('prenom', e.target.value)}
                            placeholder="Entrez le prenom "
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Email</h2>
                            {errors.email&& <p className="text-red-500 text-[10px]">{errors.email}</p>}
                        </div>
                        <input
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Entrez l'email"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Numero de téléphone</h2>
                            {errors.number && <p className="text-red-500 text-[10px]">{errors.number}</p>}
                        </div>
                        <input
                            type="text"
                            name="number"
                            value={data.number}
                            onChange={(e) => setData('number', e.target.value)}
                            placeholder="Entrez le numero "
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Departement</h2>
                            {errors.departement&& <p className="text-red-500 text-[10px]">{errors.departement}</p>}
                        </div>
                        <input
                            type="text"
                            name="departement"
                            value={data.departement}
                            onChange={(e) => setData('departement', e.target.value)}
                            placeholder="Entrez le département"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Adresse</h2>
                            {errors.address && <p className="text-red-500 text-[10px]">{errors.address}</p>}
                        </div>
                        <input
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Entrez l'adresse"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>CIN</h2>
                            {errors.cin && <p className="text-red-500 text-[10px]">{errors.cin}</p>}
                        </div>
                        <input
                            type="text"
                            name="cin"
                            value={data.cin}
                            onChange={(e) => setData('cin', e.target.value)}
                            placeholder="Entrez le cin"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Specialité</h2>
                            {errors.speciality && <p className="text-red-500 text-[10px]">{errors.speciality}</p>}
                        </div>
                        <input
                            type="text"
                            name="speciality"
                            value={data.speciality}
                            onChange={(e) => setData('speciality', e.target.value)}
                            placeholder="Entrez la spécialité"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row w-full justify-between">
                        <h2>Date de naissance</h2>
                        {errors.date_naissance && <p className="text-red-500 text-[10px]">{errors.date_naissance}</p>}
                    </div>
                    <input
                        type="date"
                        name="date_naissance"
                        value={data.date_naissance}
                        onChange={(e) => setData('date_naissance', e.target.value)}
                        placeholder="Date de naissance"
                        className="w-full border p-2 rounded text-gray-500"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row w-full justify-between">
                        <h2>Mot de passe</h2>
                        {errors.password&& <p className="text-red-500 text-[10px]">{errors.password}</p>}
                    </div>
                    <input
                        type="text"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Entrez le mot de passe"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="w-full flex justify-center items-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black cursor-pointer w-48 mt-3 text-white px-4 py-2 rounded disabled:opacity-50 dark:bg-white dark:text-black"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </section>
    )
}

