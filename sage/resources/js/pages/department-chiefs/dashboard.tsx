import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/chef-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/department-chief/dashboard',
    },
];

export default function ChefDashboard()
{

    const moyenneDistribution = [
      { range: '0-5', count: 12 },
      { range: '5-10', count: 48 },
      { range: '10-12', count: 80 },
      { range: '12-14', count: 90 },
      { range: '14-16', count: 56 },
      { range: '16-18', count: 24 },
      { range: '18-20', count: 5 },
    ];

    const data = [
      { module: 'Programmation I', note: 16 },
      { module: 'Programmation II', note: 14 },
      { module: 'Systèmes d’exploitation', note: 13 },
      { module: 'Réseaux informatiques', note: 15 },
      { module: 'Mathématiques Discrètes', note: 17 },
      { module: 'Algèbre Linéaire', note: 12 },
      { module: 'Analyse Mathématique', note: 16 },
      { module: 'Bases de Données', note: 18 },
      { module: 'Structures de Données', note: 13 },
      { module: 'Théorie des Langages', note: 15 },
      { module: 'Compilation', note: 11 },
      { module: 'Électronique Numérique', note: 14 },
      { module: 'Architecture des Ordinateurs', note: 16 },
      { module: 'Sécurité Informatique', note: 19 },
    ];
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
                <div className="flex flex-col gap-10 justify-center items-center w-full ">
                    <div className="flex flex-row gap-5 pt-5">
                        <StatCard title="Taux de réussite" value="78%" change="+5%" subtitle="par rapport au semestre précédent" color="green" />
                        <StatCard title="Étudiants Actifs" value="2,156" change="+8%" subtitle="ce semestre" color="green" />
                        <StatCard title="Présence moyenne" value="86%" change="+3%" subtitle="ce semestre" color="green" />
                        <StatCard title="Modules critique" value="3" change="+1" subtitle="depuis le dernier rapport" color="green" />
                    </div>
                <div className="w-full h-[20rem] flex flex-col px-5 gap-3 ">
                    <div className="w-full flex flex-row justify-between px-10">
                        <h1 className="font-bold text-gray-700">Moyenne des notes par module</h1>
                        <select
                              id="filiere"
                              name="filiere"
                              className="rounded-md w-42 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                            <option value="Mathématique">Informatique</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="module" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 20]} />
                            <Tooltip />
                            <Bar dataKey="note" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full h-[20rem] flex flex-col px-5 gap-3">
                  <div className="w-full flex flex-row justify-between px-10">
                    <h1 className="font-bold text-gray-700">Répartition des étudiants par moyenne</h1>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moyenneDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
        </AppLayout>
    )
}

function StatCard({ title, value, change, subtitle, color }) {
  const colorClass = color === 'green' ? 'text-green-500' : 'text-gray-500';
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg w-64 shadow p-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-semibold text-black dark:text-white">{value}</div>
      <div className={`text-sm ${colorClass}`}>{change} <span className="text-gray-400">{subtitle}</span></div>
    </div>
  );
}
