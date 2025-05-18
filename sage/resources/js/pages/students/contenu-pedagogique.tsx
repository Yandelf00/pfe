import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contenu Pédagogique',
        href: '/students/pedagogie',
    },
];

export default function ContenuPedagogique()
{
    const { props } = usePage();
    const modules = props.modules;

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contenu Pédagogique" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {modules.map((mode)=>(
                    <Link href='/' className="w-full h-10 bg-gray-100 flex cursor-pointer
                        items-center px-4 rounded-md dark:bg-[#171818]
                        hover:text-blue-500 transition ease-in-out duration-200">
                        { mode.nom }
                    </Link>
                ))}
            </div>
        </AppLayout>
    )
}
