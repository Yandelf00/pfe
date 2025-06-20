
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/chef-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import SearchInput from '@/components/search-input';
import NoData from '@/components/no-data';
import { toast } from "sonner";
import { Search, Trash, Pencil} from 'lucide-react';
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
        title: 'Gestion des etudiants',
        href: '/department-chief/dashboard',
    },
];

export default function GestionEtudiants()
{
    const [isList, setIsList] = useState(true)
    const [search, setSearch] = useState("")
    const { props } = usePage();
    const etudiants = props.etudiants;
    console.log(etudiants)
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl py-7 ">
                <div className="w-full flex flex-row justify-between p-4 ">
                    <SearchInput />
                    <div className="flex flex-row gap-4">
                        <ImportEtudiants/>
                        {isList ? (
                            <button onClick={()=>setIsList(false)} className="h-8 cursor-pointer text-white
                            w-24 px-4 rounded bg-linear-to-bl
                            text-white py-1 from-[#6169c6] to-[#6d4798]">
                                Ajouter
                            </button>
                        ):(
                            <button onClick={()=>setIsList(true)} className="h-8 cursor-pointer text-white
                            w-24 px-4 rounded bg-linear-to-bl
                            text-white py-1 from-[#6169c6] to-[#6d4798]">
                                Liste
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-full h-full">
                {isList === true ? (
                    etudiants.length <= 0 ? (
                        <NoData text="aucun enseignant à afficher"/>
                    ) : (
                        <div className="w-full h-full">
                            <AfficherEtudiants search={search}/>
                        </div>
                    )
                ):(
                    <div className="w-full h-full px-4">
                        <AjouterEtudiant/>
                    </div>
                )}
                </div>
            </div>
        </AppLayout>
    )
}

function ModifierEtudiant( { etudiant } : { etudiant : User } )
{
    const { data, setData, reset, processing, errors } = useForm({
        name: etudiant.name,
        prenom: etudiant.prenom,
        email: etudiant.email ,
        departement: etudiant.departement,
        number: etudiant.number,
        address: etudiant.address,
        date_naissance: etudiant.date_naissance,
        cin: etudiant.cin,
        numt: etudiant.profile.numt,
        cne : etudiant.profile.cne,
        groupe_td : etudiant.profile.groupe_td,
    });

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      // router.put(route('admins.updateEtudiant', etudiant.id), data, {
      //   onSuccess: () => {
      //     toast.success("Étudiant modifié avec succès !");
      //   },
      //   onError: (errors) => {
      //     console.error('Validation errors:', errors);
      //     toast.error("Une erreur est survenue lors de la modification.");
      //   },
      // });
    }
    return(
        <section className="w-full h-full">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
                    {/*here */}
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Code apogée</h2>
                            {errors.numt && <p className="text-red-500 text-[10px]">{errors.numt}</p>}
                        </div>
                        <input
                            type="text"
                            name="numt"
                            value={data.numt}
                            onChange={(e) => setData('numt', e.target.value)}
                            placeholder="Entrez le code apogée"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>CNE</h2>
                            {errors.cne && <p className="text-red-500 text-[10px]">{errors.cne}</p>}
                        </div>
                        <input
                            type="text"
                            name="cne"
                            value={data.cne}
                            onChange={(e) => setData('cne', e.target.value)}
                            placeholder="Entrez le cne"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Groupe de Td</h2>
                            {errors.groupe_td && <p className="text-red-500 text-[10px]">{errors.group_td}</p>}
                        </div>
                        <input
                            type="text"
                            name="group_td"
                            value={data.groupe_td}
                            onChange={(e) => setData('groupe_td', e.target.value)}
                            placeholder="Entrez le groupe de td"
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
                        className="bg-black cursor-pointer w-48 mt-3 px-4 py-2 rounded
                        bg-linear-to-bl text-white py-1 from-[#6169c6] to-[#6d4798]
                        disabled:opacity-50"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </section>
    )

}

function AjouterEtudiant()
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
        numt:'',
        cne : '',
        groupe_td : '',
        prom_id : '',

    });
    const { props } = usePage();
    const promotions = props.promotions;

    function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        // post('/admins/etudiants', {
        //     onSuccess : () => {
        //         reset();
        //         toast.success("Etudiant ajouté!")
        //     },
        // });
    }
    return(
        <section className="h-full w-full">
            <form onSubmit= { handleSubmit } className="w-full flex flex-col gap-4">
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
                            <h2>Promotions</h2>
                            {errors.prom_id && <p className="text-red-500 text-[10px]">{errors.prom_id}</p>}
                        </div>
                          <select
                            className="w-full border p-2 rounded"
                            onChange={(e) => setData('prom_id', e.target.value)}
                            value={data.prom_id}
                          >
                              <option value="" >
                                Choisissez une promotion
                              </option>
                            {promotions.map(promotion => (
                              <option key={promotion.id} value={promotion.id}>
                                {promotion.intitule}
                              </option>
                            ))}
                          </select>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Code Apogée</h2>
                            {errors.numt && <p className="text-red-500 text-[10px]">{errors.numt}</p>}
                        </div>
                        <input
                            type="text"
                            name="numt"
                            value={data.numt}
                            onChange={(e) => setData('numt', e.target.value)}
                            placeholder="Entrez le code apogée"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>CNE</h2>
                            {errors.cne && <p className="text-red-500 text-[10px]">{errors.cne}</p>}
                        </div>
                        <input
                            type="text"
                            name="cne"
                            value={data.cne}
                            onChange={(e) => setData('cne', e.target.value)}
                            placeholder="Entrez le cne"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex flex-row w-full justify-between">
                            <h2>Groupe de Td</h2>
                            {errors.groupe_td && <p className="text-red-500 text-[10px]">{errors.group_td}</p>}
                        </div>
                        <input
                            type="text"
                            name="group_td"
                            value={data.groupe_td}
                            onChange={(e) => setData('groupe_td', e.target.value)}
                            placeholder="Entrez le groupe de td"
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
                        className="bg-black cursor-pointer w-48 mt-3 px-4 py-2 rounded
                        bg-linear-to-bl text-white py-1 from-[#6169c6] to-[#6d4798]
                        disabled:opacity-50"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>

        </section>
    )
}

function AfficherEtudiants({ search } : {search : string }) {
    const { props } = usePage();
    const [open, setOpen] = useState(false);
    const closeDialog = useRef<HTMLButtonElement>(null);
    const etudiants = props.etudiants;

    const filteredEtudiants = etudiants.filter((etudiant) => {
        const fullText = `${etudiant.name} ${etudiant.prenom} ${etudiant.email} ${etudiant.departement} ${etudiant.cin} ${etudiant.profile.numt} ${etudiant.profile.cne}`.toLowerCase();
        return fullText.includes(search.toLowerCase());
    });

    function deleteEtudiant(etudiantId: number) {
        console.log("delete the student");
        // router.delete(route('admins.deleteEtudiant', etudiantId), {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         toast.success("Étudiant supprimé avec succès !");
        //         closeDialog.current?.click();
        //     },
        // });
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
                            <th className="p-3">Numéro Étudiant</th>
                            <th className="p-3">CNE</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEtudiants.map((etudiant, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 transition ease-in-out duration-200 dark:hover:bg-[#171818]">
                                <td className="p-3">{etudiant.name}</td>
                                <td className="p-3">{etudiant.prenom}</td>
                                <td className="p-3">{etudiant.email}</td>
                                <td className="p-3">{etudiant.departement}</td>
                                <td className="p-3">{etudiant.cin}</td>
                                <td className="p-3">{etudiant.profile.numt}</td>
                                <td className="p-3">{etudiant.profile.cne}</td>
                                <td className="p-3 gap-4 flex flex-row items-center justify-center ">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Trash className="cursor-pointer size-4 hover:text-red-600 transition ease-in-out duration-200" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Confirmation</DialogTitle>
                                                <DialogDescription></DialogDescription>
                                                <div className="w-full h-full flex flex-col gap-4">
                                                    <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
                                                    <div className="w-full flex flex-row justify-end items-center gap-3">
                                                        <DialogClose asChild>
                                                            <button ref={closeDialog} className="bg-gray-200 text-black px-2 py-1 w-24 cursor-pointer rounded-md">
                                                                Annuler
                                                            </button>
                                                        </DialogClose>
                                                        <button onClick={() => deleteEtudiant(etudiant.id)} className="bg-red-400 text-white cursor-pointer w-24 px-2 py-1 rounded-md">
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Pencil className="cursor-pointer size-4 hover:text-green-600 transition ease-in-out duration-200" />
                                        </DialogTrigger>
                                        <DialogContent className="w-[60rem] max-w-[90vw]">
                                            <DialogHeader>
                                                <DialogTitle>Modifier</DialogTitle>
                                                <DialogDescription></DialogDescription>
                                                <div className="h-[35rem] w-full">
                                                    <ModifierEtudiant etudiant={etudiant} />
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
    );

}

function ImportEtudiants()
{
    const { data, setData, post, processing, errors, reset } = useForm({
    file: null,
    });

    // const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    // post(route("excel.import"), {
    //   preserveScroll: true,
    //   onSuccess: () => reset("file"),
    // });
    // };

      const [fileLabel, setFileLabel] = useState("Aucun fichier sélectionné");

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setData("file", file || null);
        setFileLabel(file ? file.name : "Aucun fichier sélectionné");
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("excel.import"), {
          preserveScroll: true,
          onSuccess: () => {
            reset("file");
            setFileLabel("Aucun fichier sélectionné");
          },
        });
      };
    return(
        <div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-black h-8 text-white px-4 rounded w-24 cursor-pointer
    bg-linear-to-bl text-white py-1 from-[#6169c6] to-[#6d4798]">
                    Importer
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importer les etudiants</DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0
                            file:text-sm file:font-semibold
                            file:bg-black file:text-white"
                        />
                        {errors.file && <p className="text-red-500">{errors.file}</p>}
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {processing ? 'Importation...' : 'Importer'}
                        </button>
                    </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
        </div>
    )
}
