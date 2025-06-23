<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Module;
use App\Models\Inscription;
use App\Models\Annonce;
use App\Models\Etudiant;
use App\Models\Document;
use App\Models\Evaluation;

class StudentController extends Controller
{
    public function pedagogie()
    {
        //retrieve the authenticated user
        $user = Auth::user();

        //gets the etudiant table from user profile(user has to be etudiant to get here)
        $etudiant = $user->profile;

        //makes sure that the user is etudiant
        if(!$etudiant || !($etudiant instanceof Etudiant))
        {
            abort(403, 'Seuls les etudiants peuvent acceder à cette page.');
        }

        //retrieve the modules ids from Inscrition, this returns a collect instance
        $moduleIds = Inscription::where('etudiant_id', $etudiant->id)->pluck('module_id');

        //retrieves the modules by their module id
        $modules = Module::whereIn('id', $moduleIds)->get();

        //return inertia instance
        return Inertia::render('students/contenu-pedagogique', [
            'modules' => $modules,
        ]);
    }

    public function showTypes(Module $module)
    {
        return Inertia::render('students/module-types', [
            'module' => $module,
        ]);
    }

    public function showDocument(Module $module, $type)
    {
        $documents = $module->documents()
                ->where('type', $type)
                ->get();
        return Inertia::render('students/module-content', [
            'module' => $module,
            'type' => $type,
            'documents' => $documents,
        ]);
    }

    //
    public function showNote($semestre)
    {
        $user = Auth::user();
        $etudiant = $user->profile;

        if (!$etudiant || !($etudiant instanceof Etudiant)) {
            abort(403, 'Unauthorized');
        }
        //retrieves the modules depending on the semester
        $modules = Module::where('semestre', $semestre)->get();

        //takes just the module id
        $moduleIds = $modules->pluck('id');

        //retrives evaluations
        $evaluations = Evaluation::with('module')
            ->whereIn('module_id', $moduleIds)
            ->where('etudiant_id', $etudiant->id)
            ->get();

        // Format evaluations to include module name
        $results = $evaluations->map(function ($eval) {
            return [
                'module' => $eval->module->nom,
                'note' => $eval->note,
            ];
        });

        return Inertia::render('students/semestre-note', [
            'results'=>$results,
        ]);
    }

    public function annonces() {
        $annonces = Annonce::orderBy('created_at', 'desc')->take(5)->get();
        return Inertia::render('students/annonces', [
            "annonces" => $annonces,
        ]);
    }

    public function calendrier() {
        return Inertia::render('students/calendar');
    }

    public function emploiTemps() {
        return Inertia::render('students/emploi_temps');
    }

    public function absences() {
        return Inertia::render('students/absences');
    }

}
