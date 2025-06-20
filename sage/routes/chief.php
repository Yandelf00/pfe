<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChefController;

Route::middleware(['auth', 'verified', 'role:department_chief'])->group(function () {
    Route::get('/department-chiefs/dashboard', function () {
        return Inertia::render('department-chiefs/dashboard');
    })->name('depchiefs.dashboard');

    //--------------annonces--------------//
    //annonces route
    Route::get('/department-chiefs/annonces', [ChefController::class, 'annonces'])->name('depchiefs.annonces');

    //ajouter annonces
    Route::post('/department-chiefs/annonces', [ChefController::class, 'ajouterAnnonce'])->name('depchiefs.ajouterAnnonce');

    //supprimer annonce
    Route::delete('/department-chiefs/annonces/{annonce}', [ChefController::class, 'deleteAnnonce'])->name('depchiefs.supprimerAnnonce');

    //--------------calendrier--------------//
    Route::get('/department-chiefs/calendrier', [ChefController::class, 'calendrier'])->name('depchiefs.calendrier');

    //--------------g-enseignants--------------//
    Route::get('/department-chiefs/gestion_enseignants', [ChefController::class, 'gestionEnseignants'])->name('depchiefs.gestion_enseignants');

    //--------------g-etudiants--------------//
    Route::get('/department-chiefs/gestion_etudiants', [ChefController::class, 'gestionEtudiants'])->name('depchiefs.gestion_etudiants');

    //--------------emploi du temps--------------//
    Route::get('/department-chiefs/emploi_de_temps', [ChefController::class, 'emploiTemps'])->name('depchiefs.emploi_de_temps');

    //--------------notifications--------------//
    Route::get('/department-chiefs/notifications', [ChefController::class, 'notifications'])->name('depchiefs.notifications');

    //--------------modules--------------//
    Route::get('/department-chiefs/modules', [ChefController::class, 'modules'])->name('depchiefs.modules');

});

