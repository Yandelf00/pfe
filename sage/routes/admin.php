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
});
