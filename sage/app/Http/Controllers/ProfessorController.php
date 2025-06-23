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
use App\Models\User;
use App\Models\Promotion;
use App\Models\Evaluation;

class ProfessorController extends Controller
{
    public function etudiants() {
        $etudiants = User::where('profile_type', Etudiant::class)->with('profile')->get();
        $promotions = Promotion::get();
        return Inertia::render('professors/etudiants', [
            'etudiants' => $etudiants,
            'promotions' => $promotions,
        ]);
    }

    public function notes() {
        $etudiants = User::where('profile_type', Etudiant::class)->with('profile')->get();
        $promotions = Promotion::get();
        return Inertia::render('professors/notes', [
            'etudiants'=>$etudiants,
            'promotions'=>$promotions,
        ]);
    }
    public function documents() {
        return Inertia::render('professors/documents');
    }
    public function calendrier() {
        return Inertia::render('professors/calendrier');
    }
    public function annonces() {
        $annonces = Annonce::orderBy('created_at', 'desc')->take(5)->get();
        return Inertia::render('professors/annonces', [
            'annonces'=>$annonces,
        ]);
    }
    public function absences() {
        return Inertia::render('professors/absences');
    }
}
