import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chefs de departements',
        href: '/admin/chef-departement',
    },
];

export default function ChefDepartement()
{
    const [isList , setIsList] = useState(true);
    const { props } = usePage();
    const chefs = props.chefs;

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="w-full flex flex-row justify-between">
                    <SearchInput/>
                    <div className="flex flex-row gap-4">
                        <div className="h-8 w-10 bg-black"></div>
                        {isList ? (
                            <div onClick={()=>setIsList(false)} className="h-8 w-10 bg-black"></div>
                         ):(
                            <div onClick={()=>setIsList(true)} className="h-8 w-10 bg-red-200"></div>
                        )}
                    </div>
                </div>
                {isList === true ? (
                    chefs.length <= 0 ? (
                        <NoData/>
                    ) : (
                        <div className="w-full h-full bg-red-200">
                            <div className="z-50 fixed inset-0 bg-red-200"></div>
                        </div>
                    )
                ):(
                    <div>here should be the form</div>
                )}
            </div>
        </AppLayout>
    )
}

function AjouterChefDep()
{
    return(
        <section className="h-full w-full flex justify-center items-center">

        </section>
    )
}

function SearchInput()
{
    return(
        <div className="lg:w-[500px] flex flex-row justify-between
            h-8 rounded-sm items-center focus-within:ring-1 gap-2 border border-1 border-black
            px-2">
            <Search className="size-4" />
            <input type="text" name="" id="" className="w-full h-full
            focus:outline-none focus:ring-0">
            </input>
        </div>
    )
}

function NoData()
{
    return(
        <section className="h-full w-full flex justify-center items-center">
            <p className="font-semibold text-gray-700">Aucune information à afficher</p>
        </section>
    )
}
