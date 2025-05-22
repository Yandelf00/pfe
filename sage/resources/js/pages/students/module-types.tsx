import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Type document',
        href: '/students/pedagogie/module/',
    },
];

export default function ContenuPedagogique()
{
    const { props } = usePage();
    const module = props.module;

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contenu Pédagogique" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={`/students/pedagogie/${module.id}/cours`} className="w-full h-10 bg-gray-50 flex cursor-pointer
                    items-center px-4 rounded-md dark:bg-[#171818] shadow-md
                    hover:text-green-700 transition ease-in-out duration-200">
                    Cours
                </Link>
                <Link href={`/students/pedagogie/${module.id}/td`} className="w-full h-10 bg-gray-50 flex cursor-pointer
                    items-center px-4 rounded-md dark:bg-[#171818] shadow-md
                    hover:text-green-700 transition ease-in-out duration-200">
                    Td
                </Link>
                <Link href={`/students/pedagogie/${module.id}/tp`} className="w-full h-10 bg-gray-50 flex cursor-pointer
                    items-center px-4 rounded-md dark:bg-[#171818] shadow-md
                    hover:text-green-700 transition ease-in-out duration-200">
                    Tp
                </Link>
            </div>
        </AppLayout>
    )
}
