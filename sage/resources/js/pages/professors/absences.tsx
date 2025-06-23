import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/enseignant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { CalendarDays, Save, Search, UserCheck, Users, Filter } from "lucide-react"
import { toast } from "sonner"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'absences',
        href: '/enseignant/absences',
    },
];
// Données simulées des étudiants
const studentsData = [
  {
    id: 1,
    numeroEtudiant: "2024001",
    nom: "Dupont",
    prenom: "Marie",
    email: "marie.dupont@univ.fr",
    module: "Mathématiques",
    groupe: "Groupe A",
    absent: false,
  },
  {
    id: 2,
    numeroEtudiant: "2024002",
    nom: "Martin",
    prenom: "Pierre",
    email: "pierre.martin@univ.fr",
    module: "Mathématiques",
    groupe: "Groupe A",
    absent: false,
  },
  {
    id: 3,
    numeroEtudiant: "2024003",
    nom: "Bernard",
    prenom: "Sophie",
    email: "sophie.bernard@univ.fr",
    module: "Mathématiques",
    groupe: "Groupe B",
    absent: true,
  },
  {
    id: 4,
    numeroEtudiant: "2024004",
    nom: "Petit",
    prenom: "Lucas",
    email: "lucas.petit@univ.fr",
    module: "Physique",
    groupe: "Groupe A",
    absent: false,
  },
  {
    id: 5,
    numeroEtudiant: "2024005",
    nom: "Moreau",
    prenom: "Emma",
    email: "emma.moreau@univ.fr",
    module: "Physique",
    groupe: "Groupe A",
    absent: false,
  },
  {
    id: 6,
    numeroEtudiant: "2024006",
    nom: "Simon",
    prenom: "Thomas",
    email: "thomas.simon@univ.fr",
    module: "Informatique",
    groupe: "Groupe C",
    absent: true,
  },
  {
    id: 7,
    numeroEtudiant: "2024007",
    nom: "Michel",
    prenom: "Julie",
    email: "julie.michel@univ.fr",
    module: "Informatique",
    groupe: "Groupe C",
    absent: false,
  },
  {
    id: 8,
    numeroEtudiant: "2024008",
    nom: "Garcia",
    prenom: "Antoine",
    email: "antoine.garcia@univ.fr",
    module: "Chimie",
    groupe: "Groupe D",
    absent: false,
  },
]

const modules = ["Tous les modules", "Mathématiques", "Physique", "Informatique", "Chimie"]
const groupes = ["Tous les groupes", "Groupe A", "Groupe B", "Groupe C", "Groupe D"]

export default function AbsencesPage() {
  const [students, setStudents] = useState(studentsData)
  const [selectedModule, setSelectedModule] = useState("Tous les modules")
  const [selectedGroupe, setSelectedGroupe] = useState("Tous les groupes")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Filtrer les étudiants
  const filteredStudents = students.filter((student) => {
    const matchesModule = selectedModule === "Tous les modules" || student.module === selectedModule
    const matchesGroupe = selectedGroupe === "Tous les groupes" || student.groupe === selectedGroupe
    const matchesSearch =
      student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.numeroEtudiant.includes(searchTerm)

    return matchesModule && matchesGroupe && matchesSearch
  })

  // Gérer le changement d'état d'absence
  const handleAbsenceChange = (studentId: number, isAbsent: boolean) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, absent: isAbsent } : student)),
    )
  }

  // Enregistrer les absences
  const handleSaveAbsences = async () => {
    setIsLoading(true)

    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const absentStudents = filteredStudents.filter((student) => student.absent)

    toast.success(`Absences enregistrées avec succès! ${absentStudents.length} absence(s) signalée(s).`)
    setIsLoading(false)
  }

  // Marquer tous comme présents/absents
  const handleSelectAll = (isAbsent: boolean) => {
    setStudents((prev) =>
      prev.map((student) =>
        filteredStudents.some((fs) => fs.id === student.id) ? { ...student, absent: isAbsent } : student,
      ),
    )
  }

  const absentCount = filteredStudents.filter((student) => student.absent).length
  const presentCount = filteredStudents.length - absentCount

  return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Dashboard" />
         <main className="flex-1 space-y-6 p-6">
          {/* Filtres et recherche */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                Filtres et recherche
              </CardTitle>
              <CardDescription>Filtrez les étudiants par module, groupe ou recherchez par nom</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Module</label>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module) => (
                        <SelectItem key={module} value={module}>
                          {module}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Groupe</label>
                  <Select value={selectedGroupe} onValueChange={setSelectedGroupe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {groupes.map((groupe) => (
                        <SelectItem key={groupe} value={groupe}>
                          {groupe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Recherche</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Nom, prénom ou n° étudiant"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Actions rapides</label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectAll(false)}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      Tous présents
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectAll(true)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Tous absents
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des étudiants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                Liste des étudiants - Séance du {new Date().toLocaleDateString("fr-FR")}
              </CardTitle>
              <CardDescription>
                Cochez les cases pour marquer les absences ({filteredStudents.length} étudiants affichés)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">N° Étudiant</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Groupe</TableHead>
                      <TableHead className="text-center w-[120px]">Absent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          Aucun étudiant trouvé avec les filtres actuels
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id} className={student.absent ? "bg-red-50" : ""}>
                          <TableCell className="font-medium">{student.numeroEtudiant}</TableCell>
                          <TableCell className="font-medium">{student.nom}</TableCell>
                          <TableCell>{student.prenom}</TableCell>
                          <TableCell className="text-gray-600">{student.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{student.module}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.groupe}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={student.absent}
                              onCheckedChange={(checked) => handleAbsenceChange(student.id, checked as boolean)}
                              className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Bouton d'enregistrement */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {absentCount > 0 && (
                    <span className="text-red-600 font-medium">{absentCount} absence(s) à enregistrer</span>
                  )}
                  {absentCount === 0 && (
                    <span className="text-green-600 font-medium">Tous les étudiants sont marqués présents</span>
                  )}
                </div>
                <Button onClick={handleSaveAbsences} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Enregistrement..." : "Enregistrer les absences"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        </AppLayout>
  )
}
