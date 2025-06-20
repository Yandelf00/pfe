<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admins/dashboard', function () {
        return Inertia::render('admins/dashboard');
    })->name('admins.dashboard');

    Route::get('/admins/type-utilisateur', function () {
        return Inertia::render('admins/type-user');
    })->name('admins.type-user');

    Route::get('/admins/chef-departement', [AdminController::class, 'chefDepartement'])->name('admins.chef-departements');

    //route to add department chief
    Route::post('/admins/chef-departement/create', [AdminController::class, 'addChefDepartement'])->name('admins.addChefDepartment');

    //route to update the department chief
    Route::patch('/admins/chef-departement/{chef}', [AdminController::class, 'updateChefDepartement'])->name('admins.updateChefDepartement');

    //route to delete department chief
    Route::delete('/admins/chef-departement/{chef}', [AdminController::class, 'deleteChefDepartement'])->name('admins.deleteChefDepartment');

    //route to import using an excel file
    Route::post('/admins/chef-departement/importer', [AdminController::class, 'importChefsDepartement'])->name('admins.import-chefs');

    //route to get the professors
    Route::get('/admins/enseignants', [AdminController::class, 'enseignants'])->name('admins.enseignants');

    //route to add the professors
    Route::post('/admins/enseignants/create', [AdminController::class, 'addEnseignant'])->name('admins.addEnseignant');

    //route to update the professors
    Route::patch('/admins/enseignants/{chef}', [AdminController::class, 'updateEnseignant'])->name('admins.updateEnseignant');

    //route to delete the professors
    Route::delete('/admins/enseignants/{prof}', [AdminController::class, 'deleteEnseignant'])->name('admins.deleteEnseignant');

    //route to get the students
    Route::get('/admins/etudiants', [AdminController::class, 'etudiants'])->name('admins.etudiants');

    //route to add the students
    Route::post('/admins/etudiants', [AdminController::class, 'addEtudiant'])->name('admins.addEtudiant');

    //route to update
    Route::put('/admins/etudiants/{user}', [AdminController::class, 'updateEtudiant'])->name('admins.updateEtudiant');

    //route to delete student
    Route::delete('/admins/etudiants/{etudiant}', [AdminController::class, 'deleteEtudiant'])->name('admins.deleteEtudiant');
});
