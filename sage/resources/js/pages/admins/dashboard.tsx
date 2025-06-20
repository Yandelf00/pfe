import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
  ResponsiveContainer
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/students/dashboard',
    },
];

export default function AdminDashboard()
{
    const pieData = [
      { name: 'Étudiants', value: 2156, color: '#34d399' },
      { name: 'Enseignants', value: 142, color: '#a78bfa' },
      { name: 'Chefs de département', value: 24, color: '#facc15' },
      { name: 'Admin', value: 10, color: '#fbbf24' }
    ];

    const lineData = [
      { name: 'S1', value: 110 },
      { name: 'S2', value: 150 },
      { name: 'S3', value: 180 },
      { name: 'S4', value: 220 },
      { name: 'S5', value: 190 },
      { name: 'S6', value: 250 }
    ];

    const barData = [
      { name: 'Informatique', taux: 94 },
      { name: 'Mathématiques', taux: 91 },
      { name: 'Physique', taux: 89 },
      { name: 'Chimie', taux: 88 },
      { name: 'Biologie', taux: 87 },
      { name: 'Économie', taux: 90 }
    ];
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Dashboard" />
            <div className="flex h-full flex-1 rounded-xl p-3">
                {/* <div class="grid h-48 grid-cols-6 w-full gap-3"> */}
                {/*     <div className="h-48 rounded w-48 bg-white shadow border-1 border-gray-100"></div> */}
                {/*     <div className="h-48 rounded w-48 bg-white shadow border-1 border-gray-100"></div> */}
                {/*     <div className="h-48 rounded w-48 bg-white shadow border-1 border-gray-100"></div> */}
                {/*     <div className="h-48 rounded w-48 bg-white shadow border-1 border-gray-100"></div> */}
                {/*     <div className="h-48 rounded w-48 bg-white shadow border-1 border-gray-100"></div> */}
                {/*     <div className="h-48 rounded w-48 bg-white shadow border-1 border-gray-100"></div> */}
                {/* </div> */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <StatCard title="Utilisateurs Total" value="2,847" change="+12%" subtitle="ce mois" color="green" />
                    <StatCard title="Étudiants Actifs" value="2,156" change="+8%" subtitle="ce semestre" color="green" />
                    <StatCard title="Enseignants" value="142" change="+3%" subtitle="ce semestre" color="green" />
                    <StatCard title="Modules Gérés" value="89" change="+5%" subtitle="ce semestre" color="green" />
                    <StatCard title="Taux Participation" value="87.3%" change="+2.1%" subtitle="ce semestre" color="green" />
                    <StatCard title="Filières" value="24" change="Stable" subtitle="cette année" color="gray" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ChartCard title="Répartition des Utilisateurs">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80}>
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Custom Legend */}
                      <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {pieData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            ></span>
                            {entry.name}
                          </div>
                        ))}
                      </div>
                    </ChartCard>

                    <ChartCard title="Inscriptions par semestre (on choisit la promo)">
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={lineData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Taux de Réussite par Filière">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="taux" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>
                    {/* <ChartCard title="Taux de Réussite par Filière"> */}
                    {/*   <ResponsiveContainer width="100%" height={200}> */}
                    {/*     <BarChart data={barData}> */}
                    {/*       <CartesianGrid strokeDasharray="3 3" /> */}
                    {/*       <XAxis dataKey="name" /> */}
                    {/*       <YAxis domain={[0, 100]} /> */}
                    {/*       <Tooltip /> */}
                    {/*       <Bar dataKey="taux" fill="#6366f1" radius={[4, 4, 0, 0]} /> */}
                    {/*     </BarChart> */}
                    {/*   </ResponsiveContainer> */}
                    {/* </ChartCard> */}
                  </div>
                </div>
            </div>
        </AppLayout>
    )
}
function StatCard({ title, value, change, subtitle, color }) {
  const colorClass = color === 'green' ? 'text-green-500' : 'text-gray-500';
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-semibold text-black dark:text-white">{value}</div>
      <div className={`text-sm ${colorClass}`}>{change} <span className="text-gray-400">{subtitle}</span></div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      <h3 className="text-md font-medium text-gray-700 dark:text-white mb-2">{title}</h3>
      {children}
    </div>
  );
}
