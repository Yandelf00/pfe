<?php

namespace App\Http\Controllers;

use Exception;
use Maatwebsite\Excel\Validators\ValidationException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\DepartmentChief;
use App\Models\Professor;
use App\Models\Etudiant;
use App\Models\Promotion;
use App\Models\User;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    //function that shows renders the
    //department chief page
    public function chefDepartement()
    {
        // get all the department chiefs
        $departmentChiefs = User::where('profile_type', DepartmentChief::class)->with('profile')->get();
        return Inertia::render('admins/chef-department', [
            'chefs' => $departmentChiefs,
        ]);
    }

    //function that adds the departmentChiefs
    public function addChefDepartement(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'departement' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'address' => 'required|string',
            'password' => 'required|string|min:6',
            'date_naissance'=> 'required|date|before:today',
            'cin' => 'required|string|unique:users,cin',
            'mandat' => 'required|string|max:255',
        ]);

        $departement_chief = DepartmentChief::create([
            'mandat' => $validated['mandat'],
        ]);

        User::create([
            'name' => $validated['name'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'departement' => $validated['departement'],
            'number' => $validated['number'],
            'address' => $validated['address'],
            'password' => Hash::make($validated['password']),
            'date_naissance' => $validated['date_naissance'],
            'cin' => $validated['cin'],
            'profile_type' => DepartmentChief::class,
            'profile_id' => $departement_chief->id,
        ]);
    }

    //the function that takes care of deleting the department chief
    public function deleteChefDepartement(User $chef)
    {
        //checks if the user is actually a departement chief, and checks
        //if it exist
        if($chef->profile_type === DepartmentChief::class && $chef->profile) {
            $chef->profile->delete(); //deletes the related department chief
        }

        //deletes the user
        $chef->delete();

        return redirect()->back()->with('success', 'Chef de département supprimé avec succès.');
    }

    //this function updates the department chief
    public function updateChefDepartement(Request $request, User $chef)
    {
        //validation des données de la requête
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($chef->id),
            ],
            'departement' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'address' => 'required|string',
            'date_naissance'=> 'required|date|before:today',
            'cin' => [
                'required',
                'string',
                Rule::unique('users', 'cin')->ignore($chef->id),
            ],
            'mandat' => 'required|string|max:255',
        ]);

        //modifier la table departement chef lié à user
        if($chef->profile_type === DepartmentChief::class && $chef->profile) {
            $chef->profile->update([
                'mandat' => $validated['mandat'],
            ]);
        }

        //modifier les elements de user
        $chef->update([
            'name' => $validated['name'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'departement' => $validated['departement'],
            'number' => $validated['number'],
            'address' => $validated['address'],
            'date_naissance' => $validated['date_naissance'],
            'cin' => $validated['cin'],
        ]);

        return redirect()->back()->with('success', 'Chef de département modifié avec succès.');
    }

    //function that takes care of the import using excel file
    public function importChefsDepartements(Request $request) {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);

        try {
            Excel::import(new UsersImport, $request->file('file'));
            return redirect()->back()->with('success', 'Chefs importés avec succès!');

        } catch (ValidationException $e) {
            $errors = collect($e->failures())->map(function($failure) {
                return "Ligne {$failure->row()}: " . implode(', ', $failure->errors());
            });

            return redirect()->back()
                ->with('error', "Erreurs dans le fichier:")
                ->with('errors', $errors);

        } catch (Exception $e) {
            return redirect()->back()
                ->with('error', 'Erreur technique: ' . $e->getMessage());
        }
    }

    //function that retrives professors and shows the inertia page
    public function enseignants()
    {
        $enseignants = User::where('profile_type', Professor::class)->with('profile')->get();
        return Inertia::render('admins/enseignants', [
            'enseignants' => $enseignants,
        ]);
    }

    //function that adds Enseignant
    public function addEnseignant(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'departement' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'address' => 'required|string',
            'password' => 'required|string|min:6',
            'date_naissance'=> 'required|date|before:today',
            'cin' => 'required|string|unique:users,cin',
            'speciality' => 'required|string|max:255',
        ]);

        $professor = Professor::create([
            'speciality' => $validated['speciality'],
        ]);

        User::create([
            'name' => $validated['name'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'departement' => $validated['departement'],
            'number' => $validated['number'],
            'address' => $validated['address'],
            'password' => Hash::make($validated['password']),
            'date_naissance' => $validated['date_naissance'],
            'cin' => $validated['cin'],
            'profile_type' => Professor::class,
            'profile_id' => $professor->id,
        ]);
    }


    //the function that takes care of deleting the Professor
    public function deleteEnseignant(User $prof)
    {
        //checks if the user is actually a departement chief, and checks
        //if it exist
        if($prof->profile_type === Professor::class && $prof->profile) {
            $prof->profile->delete(); //deletes the related department chief
        }

        //deletes the user
        $prof->delete();

        return redirect()->back()->with('success', 'Enseignant supprimé avec succès.');
    }

    public function updateEnseignant(Request $request, User $chef)
    {
        //validation des données de la requête
        /* dd('INSIDE CONTROLLER', $chef->id, $chef->email); */
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($chef->id),
            ],
            'departement' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'address' => 'required|string',
            'date_naissance'=> 'required|date|before:today',
            'cin' => [
                'required',
                'string',
                Rule::unique('users', 'cin')->ignore($chef->id),
            ],
            'speciality' => 'required|string|max:255',
        ]);

        //modifier la table departement chef lié à user
        if($chef->profile_type === Professor::class && $chef->profile) {
            $chef->profile->update([
                'speciality' => $validated['speciality'],
            ]);
        }

        //modifier les elements de user
        $chef->update([
            'name' => $validated['name'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'departement' => $validated['departement'],
            'number' => $validated['number'],
            'address' => $validated['address'],
            'date_naissance' => $validated['date_naissance'],
            'cin' => $validated['cin'],
        ]);

        return redirect()->back()->with('success', 'Chef de département modifié avec succès.');
    }

    //fonction pour afficher la page principal des etudiants
    public function etudiants() {
        $etudiants = User::where('profile_type', Etudiant::class)->with('profile')->orderBy('id', 'desc')->paginate(10);
        $promotions = Promotion::get();
        return Inertia::render('admins/etudiants', [
            'etudiants' => $etudiants,
            'promotions' => $promotions,
        ]);
    }


        /* 'numt', */
        /* 'cne', */
        /* 'groupe_td', */
        /* 'prom_id', */
    //fonction pour ajouter un etudiant
    public function addEtudiant(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'departement' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'address' => 'required|string',
            'password' => 'required|string|min:6',
            'date_naissance'=> 'required|date|before:today',
            'cin' => 'required|string|unique:users,cin',
            'numt' => 'required|string|unique:etudiants,numt|max:20',
            'cne' => 'required|string|unique:etudiants,cne|max:20',
            'groupe_td' => 'required|string|max:20',
            'prom_id' => 'nullable|integer|exists:promotions,id',
        ]);

        $etudiant = Etudiant::create([
            'cne' => $validated['cne'],
            'numt' => $validated['numt'],
            'groupe_td' => $validated['groupe_td'],
            'prom_id' => $validated['prom_id'],
        ]);

        User::create([
            'name' => $validated['name'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'departement' => $validated['departement'],
            'number' => $validated['number'],
            'address' => $validated['address'],
            'password' => Hash::make($validated['password']),
            'date_naissance' => $validated['date_naissance'],
            'cin' => $validated['cin'],
            'profile_type' => Etudiant::class,
            'profile_id' => $etudiant->id,
        ]);

        return redirect()->back()->with('success', 'Etudiant créé avec succès.');
    }

    //fonction pour modifier
    public function updateEtudiant(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'departement' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'address' => 'required|string',
            'date_naissance' => 'required|date|before:today',
            'cin' => 'required|string|unique:users,cin,' . $user->id,

            // Etudiant fields
            'numt' => 'required|string|max:20|unique:etudiants,numt,' . $user->profile_id,
            'cne' => 'required|string|max:20|unique:etudiants,cne,' . $user->profile_id,
            'groupe_td' => 'required|string|max:20',
        ]);

        // Update User fields
        $user->update([
            'name' => $validated['name'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'departement' => $validated['departement'],
            'number' => $validated['number'],
            'address' => $validated['address'],
            'date_naissance' => $validated['date_naissance'],
            'cin' => $validated['cin'],
        ]);

        // Make sure the user is linked to an Etudiant
        if ($user->profile_type === Etudiant::class && $user->profile) {
            $user->profile->update([
                'numt' => $validated['numt'],
                'cne' => $validated['cne'],
                'groupe_td' => $validated['groupe_td'],
            ]);
        }

        return redirect()->back()->with('success', 'Étudiant mis à jour avec succès.');
    }

    //fonction supprimer
    public function deleteEtudiant(User $etudiant)
    {
        if($etudiant->profile_type === Etudiant::class && $etudiant->profile) {
            $etudiant->profile->delete();
        }

        //deletes the user
        $etudiant->delete();

        return redirect()->back()->with('success', 'Etudiant supprimé avec succès.');
    }

}
