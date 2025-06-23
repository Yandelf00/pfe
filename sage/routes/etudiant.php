<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;

Route::middleware(['auth', 'verified', 'role:etudiant'])->group(function () {
    Route::get('/students/dashboard', function () {
        return Inertia::render('students/dashboard');
    })->name('students.dashboard');
    Route::get('/students/notes', function () {
        return Inertia::render('students/notes');
    })->name('students.notes');
    Route::get('/students/pedagogie', [StudentController::class, 'pedagogie'])->name('students.pedagogie');
    Route::get('/students/pedagogie/{module}', [StudentController::class, 'showTypes'])->name('pedagogie.module');
    Route::get('/students/pedagogie/{module}/{type}', [StudentController::class, 'showDocument'])->name('pedagogie.document');
    Route::get('/students/notes/{semestre}', [StudentController::class, 'showNote'])->name('note.semestre');
    //annonce
    Route::get('/students/annonces', [StudentController::class, 'annonces'])->name('students.annonces');

    //calendrier
    Route::get('/students/calendrier', [StudentController::class, 'calendrier'])->name('students.calendrier');

    //emploi de temps
    Route::get('/students/emploi_de_temps', [StudentController::class, 'emploiTemps'])->name('students.emploi_de_temps');

    //absences
    Route::get('/students/absences', [StudentController::class, 'absences'])->name('students.absences');
});
