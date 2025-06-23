<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfessorController;

Route::middleware(['auth', 'verified', 'role:professor'])->group(function () {
    Route::get('/professors/dashboard', function () {
        return Inertia::render('professors/dashboard');
    })->name('professors.dashboard');

    Route::get('/professors/etudiants', [ProfessorController::class, 'etudiants'])->name('professors.etudiants');

    Route::get('/professors/notes', [ProfessorController::class, 'notes'])->name('professors.notes');

    Route::get('/professors/documents', [ProfessorController::class, 'documents'])->name('professors.documents');

    Route::get('/professors/calendrier', [ProfessorController::class, 'calendrier'])->name('professors.calendrier');

    Route::get('/professors/annonces', [ProfessorController::class, 'annonces'])->name('professors.annonces');

    Route::get('/professors/absences', [ProfessorController::class, 'absences'])->name('professors.absences');
});
