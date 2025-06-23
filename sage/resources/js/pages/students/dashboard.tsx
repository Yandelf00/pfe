import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/etudiant-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, FileText, AlertCircle, Download, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SidebarTrigger } from "@/components/ui/sidebar"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/students/dashboard',
    },
];

export default function StudentDashboard()
{

      const modules = [
        { name: "Programmation Web", progress: 85, color: "bg-green-500" },
        { name: "Base de données", progress: 72, color: "bg-blue-500" },
        { name: "Algorithmique", progress: 90, color: "bg-purple-500" },
        { name: "Réseaux", progress: 68, color: "bg-orange-500" },
        { name: "Mathématiques", progress: 78, color: "bg-indigo-500" },
      ]

      const recentDocuments = [
        { name: "Cours - Introduction React.pdf", type: "Cours", date: "Il y a 2h", icon: FileText },
        { name: "TD - Exercices SQL.pdf", type: "TD", date: "Hier", icon: FileText },
        { name: "TP - Projet Web.zip", type: "TP", date: "Il y a 3 jours", icon: Download },
        { name: "Correction - Examen BDD.pdf", type: "Correction", date: "Il y a 1 semaine", icon: CheckCircle },
      ]

      const announcements = [
        {
          title: "Contrôle de Programmation Web",
          content: "Le contrôle aura lieu vendredi 15 décembre à 14h en salle A201",
          date: "Il y a 1h",
          priority: "high",
        },
        {
          title: "Nouveau cours disponible",
          content: "Le cours sur les API REST est maintenant disponible dans vos contenus",
          date: "Il y a 3h",
          priority: "medium",
        },
        {
          title: "Rappel - Projet à rendre",
          content: "N'oubliez pas de rendre votre projet de base de données avant dimanche",
          date: "Hier",
          priority: "high",
        },
      ]
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="w-full flex flex-row gap-5">
                    <Card className="w-1/2 border-blue-200 shadow-lg">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-blue-900">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                Moyenne générale
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-4xl font-bold text-blue-600">14.2</div>
                                    <div className="text-sm text-gray-600">/ 20</div>
                                </div>
                                <div className="flex items-center gap-2 text-green-600">
                                    <TrendingUp className="h-5 w-5" />
                                    <span className="text-lg font-semibold">+0.8</span>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Progression ce semestre</span>
                                    <span className="text-green-600 font-medium">+5.6%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-1/2 border-purple-200 shadow-lg">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-purple-900">
                                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                Absences
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-4xl font-bold text-purple-600">3</div>
                                    <div className="text-sm text-gray-600">non justifiées</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-700">12</div>
                                    <div className="text-sm text-gray-500">total</div>
                                </div>
                            </div>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                <FileText className="h-4 w-4 mr-2" />
                                Justifier une absence
                            </Button>
                        </CardContent>
                    </Card>
                </div>
          {/* Deuxième ligne - Documents et Annonces */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Derniers documents */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Derniers documents reçus
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentDocuments.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <doc.icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {doc.type}
                                </Badge>
                                <span className="text-xs text-gray-500">{doc.date}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Annonces */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        Annonces importantes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {announcements.map((announcement, index) => (
                          <div key={index} className="border-l-4 border-l-blue-500 pl-4 py-2">
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                              <Badge
                                variant={announcement.priority === "high" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {announcement.priority === "high" ? "Urgent" : "Info"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {announcement.date}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
            </div>
        </AppLayout>
    )
}
