import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/enseignant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Annonces',
        href: '/professors/annonces',
    },
];

export default function EnseignantAnnonce({ annonces })
{
    console.log(annonces)
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
