import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Type Utilisateur',
        href: '/admin/type-utilisateur',
    },
];

export default function TypeUser()
{
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href='/admins/chef-departement' className="w-full h-10 bg-gray-50 flex cursor-pointer
                        items-center px-4 rounded-md dark:bg-[#171818] shadow-md
                        hover:text-green-700 transition ease-in-out duration-200">
                    Chef de département
                </Link>
                <Link href='/admins/enseignants' className="w-full h-10 bg-gray-50 flex cursor-pointer
                        items-center px-4 rounded-md dark:bg-[#171818] shadow-md
                        hover:text-green-700 transition ease-in-out duration-200">
                    Enseignants
                </Link>
                <Link href='/admins/etudiants' className="w-full h-10 bg-gray-50 flex cursor-pointer
                        items-center px-4 rounded-md dark:bg-[#171818] shadow-md
                        hover:text-green-700 transition ease-in-out duration-200">
                    Etudiants
                </Link>
            </div>
        </AppLayout>
    )
}
