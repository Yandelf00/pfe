import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/enseignant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Notes',
    href: '/professors/notes',
  },
];

export default function EnseignantNotes({ etudiants }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl ">
        <div className="flex w-full h-10 justify-start items-center px-3 pt-4">
          <select className="border rounded-md px-3 py-2 text-sm">
            <option value="programmation">Programmation II</option>
            <option value="structures">Structures de données</option>
            <option value="systeme">Système d'Exploitation II</option>
            <option value="analyse">Analyse Numérique I</option>
            <option value="architecture">Architecture des Ordinateurs</option>
            <option value="electromagnetisme">Électromagnétisme</option>
          </select>
        </div>
        <AfficherEtudiants />
      </div>
    </AppLayout>
  );
}

function AfficherEtudiants() {
  const { props } = usePage();
  const initialEtudiants = props.etudiants;

  const [etudiants, setEtudiants] = useState(
    initialEtudiants.map((etudiant) => ({
      ...etudiant,
      note: null,
      editing: false,
    }))
  );

  const handleDoubleClick = (index: number) => {
    const newList = [...etudiants];
    newList[index].editing = true;
    setEtudiants(newList);
  };

  const handleNoteChange = (index: number, value: string) => {
    const note = parseInt(value);
    const newList = [...etudiants];
    if (!isNaN(note) && note >= 1 && note <= 20) {
      newList[index].note = note;
    }
    setEtudiants(newList);
  };

  const handleBlurOrEnter = (index: number) => {
    const newList = [...etudiants];
    newList[index].editing = false;
    setEtudiants(newList);
    // Optional: send note to server here
  };

  return (
    <section className="w-full py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-[#171818] dark:text-gray-100 text-gray-700 rounded text-left">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Prénom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Département</th>
              <th className="p-3">CIN</th>
              <th className="p-3">Numéro Étudiant</th>
              <th className="p-3">CNE</th>
              <th className="p-3 text-center">Note</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((etudiant, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition ease-in-out duration-200 dark:hover:bg-[#171818]"
              >
                <td className="p-3">{etudiant.name}</td>
                <td className="p-3">{etudiant.prenom}</td>
                <td className="p-3">{etudiant.email}</td>
                <td className="p-3">{etudiant.departement}</td>
                <td className="p-3">{etudiant.cin}</td>
                <td className="p-3">{etudiant.profile.numt}</td>
                <td className="p-3">{etudiant.profile.cne}</td>
                <td className="p-3 text-center">
                  {etudiant.editing ? (
                    <input
                      type="number"
                      min="1"
                      max="20"
                      defaultValue={etudiant.note ?? ""}
                      className="border px-2 py-1 rounded text-center w-16"
                      autoFocus
                      onChange={(e) =>
                        handleNoteChange(index, e.target.value)
                      }
                      onBlur={() => handleBlurOrEnter(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleBlurOrEnter(index);
                        }
                      }}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => handleDoubleClick(index)}
                      className="cursor-pointer text-sm text-gray-800"
                    >
                      {etudiant.note ?? <span className="text-gray-400 italic">—</span>}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
