import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notes',
        href: '/students/notes/semestre',
    },
];

export default function SemestreNote()
{
    // const { results } = usePage().props;

    const results = [
      { module: "Programmation II", note: 14 },
      { module: "Structures de données", note: 16 },
      { module: "Système d'Exploitation II", note: 12 },
      { module: "Analyse Numérique I", note: 13 },
      { module: "Architecture des Ordinateurs", note: 15 },
      { module: "Électromagnétisme", note: 11 },
    ];
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes" />
            {results.length === 0 ? (
                <div className = "w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">Aucun note à afficher.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md h-full w-full py-10 ">
                  <table className="min-w-full ">
                    <thead className="bg-gray-100 dark:bg-[#1f1f1f]">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Module
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Note
                        </th>
                        <th className="px-6 py-3 text-sm text-center font-semibold text-gray-700 dark:text-gray-300">
                          Resultat
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#101010] divide-y divide-gray-200 dark:divide-gray-800">
                      {results.map((res, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {res.module}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {res.note}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 dark:text-gray-100">
                            {res.note > 10 ? "V" : "Ratt"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            )}
            {/* <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"> */}
            {/* {semestres.map((semestre, index)=>( */}
            {/*     <Link key={index} href={`/students/pedagogie/`} className="w-full h-10 bg-gray-50 */}
            {/*             flex cursor-pointer */}
            {/*             items-center px-4 rounded-md dark:bg-[#171818] shadow-md */}
            {/*             hover:text-green-700 transition ease-in-out duration-200"> */}
            {/*             {semestre} */}
            {/*     </Link> */}
            {/* ))} */}
            {/* </div> */}
        </AppLayout>
    )
}
