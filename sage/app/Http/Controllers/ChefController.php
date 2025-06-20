<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Annonce;
use App\Models\Professor;
use App\Models\User;
use App\Models\Etudiant;
use App\Models\Promotion;

class ChefController extends Controller
{
    //--------------annonces--------------//
    //fonction pour aller a la page principal des annonces
    public function annonces(){
        $annonces = Annonce::orderBy('created_at', 'desc')->take(5)->get();
        return Inertia::render('department-chiefs/annonces', [
            "annonces" => $annonces,
        ]);
    }

    //fonction pour ajouter une annonce
    public function ajouterAnnonce(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'attachment' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:2048',
        ]);

        if($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('annonces', 'public');
            $validated['piece_path'] = $path;
        }

        $user = $request->user();
        $profile = $user->profile;

        $chefId = $profile ? $profile->id : null;


        Annonce::create([
            'titre' => $validated['title'],
            'contenu' => $validated['description'],
            'piece_jointe' => $validated['piece_path'] ?? null,
            'department_chief_id' => $chefId ?? null,
        ]);

        return redirect()->back()->with('success', 'Annonce ajoutée avec succès!');

    }

    //fonction pour supprimer une annonce
    public function deleteAnnonce(Annonce $annonce){

        //supprime aussi le fichier s'il exist
        if ($annonce->piece_jointe && Storage::disk('public')->exists($annonce->piece_jointe)) {
            Storage::disk('public')->delete($annonce->piece_jointe);
        }
        $annonce->delete();
        return redirect()->back()->with('success', 'Annonce supprimée avec succès!');
    }


    //--------------Calendrier--------------//
    //fonction pour afficher la page principal calendrier
    public function calendrier() {
        return Inertia::render('department-chiefs/calendar');
    }

    //--------------Gestion Enseignant--------------//
    public function gestionEnseignants() {
        $enseignants = User::where('profile_type', Professor::class)->with('profile')->get();
        return Inertia::render('department-chiefs/g-enseignants', [
            'enseignants' => $enseignants,
        ]);
    }

    //--------------Gestion Etudiant--------------//
    public function gestionEtudiants() {
        $etudiants = User::where('profile_type', Etudiant::class)->with('profile')->get();
        $promotions = Promotion::get();

        return Inertia::render('department-chiefs/g-etudiants', [
            'etudiants' => $etudiants,
            'promotions' => $promotions,
        ]);
    }

    //--------------Emploi de temps--------------//
    public function emploiTemps() {
        return Inertia::render('department-chiefs/emploi_temps');
    }

    //--------------notifications--------------//
    public function notifications() {
        return Inertia::render('department-chiefs/notifications');
    }

    //--------------modules--------------//
    public function modules() {
        return Inertia::render('department-chiefs/modules');
    }

}
