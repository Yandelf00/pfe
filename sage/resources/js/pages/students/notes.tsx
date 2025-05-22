import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Semestres',
        href: '/students/notes',
    },
];

export default function Notes()
{
    const semestres = ["S1", "S2", "S3", "S4", "S5", "S6"];
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Semestres" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            {semestres.map((semestre, index)=>(
                <Link key={index} href={`/students/notes/${semestre}`} className="w-full h-10 bg-gray-50
                        flex cursor-pointer
                        items-center px-4 rounded-md dark:bg-[#171818] shadow-md
                        hover:text-green-700 transition ease-in-out duration-200">
                        {semestre}
                </Link>
            ))}
            </div>
        </AppLayout>
    )
}
