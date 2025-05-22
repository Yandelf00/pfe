import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Documents',
        href: '/students/pedagogie/module/',
    },
];

export default function ModuleContent()
{
    const { props } = usePage();
    const module = props.module;
    const moduleType = props.type;
    const documents = props.documents;


    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documents" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {documents.length === 0 && (
                    <div className = "w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">Aucun document disponible.</p>
                    </div>
                )}

                <ul className="space-y-3">
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

                            <a
                                href={`/storage/${doc.fichier}`}
                                download
                                className="px-4 py-2 bg-green-600 text-white
                                rounded-full hover:bg-green-700 transition
                                ease-in-out duration-200"
                            >
                                Télécharger
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    )
}
