<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Module;
use App\Models\Inscription;
use App\Models\Etudiant;

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
}
