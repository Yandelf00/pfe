import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/enseignant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord ',
        href: '/enseignant/dashboard',
    },
];

export default function EnseignantDashboard()
{
    const coursesData = [
      { course: 'Programmation', avgGrade: 15.5, students: 40 },
      { course: 'Systèmes', avgGrade: 13.8, students: 35 },
      { course: 'Réseaux', avgGrade: 14.2, students: 38 },
      { course: 'Bases de données', avgGrade: 16.1, students: 42 },
    ];

    const attendanceData = [
      { course: 'Programmation', attendanceRate: 90 },
      { course: 'Systèmes', attendanceRate: 85 },
      { course: 'Réseaux', attendanceRate: 88 },
      { course: 'Bases de données', attendanceRate: 92 },
    ];

    const upcomingDeadlines = [
      { title: 'Projet final Programmation', dueDate: '2025-07-10' },
      { title: 'Examen Systèmes', dueDate: '2025-07-15' },
      { title: 'TP Réseaux', dueDate: '2025-07-20' },
    ];
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Dashboard" />

            <div className="flex justify-center items-center">
                <div className="flex flex-row gap-5 pt-5">
                    <StatCard title="Modules enseignés" value="4" change="+1" subtitle="par rapport au semestre précédent" color="green" />
                    <StatCard title="Étudiants suivis" value="156" change="" subtitle="Répartis sur 4 modules" color="green" />
                    <StatCard title="Moyenne générale" value="14.2" change="+0.8" subtitle="points ce mois" color="green" />
                    <StatCard title="Absences à justifier" value="23" change="" subtitle="nécessitent votre attention" color="green" />
                </div>
            </div>
          <div className="p-6 space-y-8">
            {/* Courses Overview */}
            <section>
              <h2 className="text-xl font-bold mb-4">Performance par cours</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={coursesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis yAxisId="left" domain={[0, 20]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="avgGrade" fill="#6366f1" name="Note Moyenne" radius={[5, 5, 0, 0]} />
                  <Bar yAxisId="right" dataKey="students" fill="#10b981" name="Nombre d'étudiants" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Attendance */}
            <section>
              <h2 className="text-xl font-bold mb-4">Taux de présence par cours</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="attendanceRate" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Upcoming deadlines */}
            <section>
              <h2 className="text-xl font-bold mb-4">Échéances à venir</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {upcomingDeadlines.map((deadline, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{deadline.title}</span> — prévu le{' '}
                    <time dateTime={deadline.dueDate}>
                      {new Date(deadline.dueDate).toLocaleDateString('fr-FR')}
                    </time>
                  </li>
                ))}
              </ul>
            </section>
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
