<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Etudiant;
use App\Models\Professor;
use App\Models\DepartmentChief;
use App\Models\Admin;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();

        if ($user->profile_type === Etudiant::class) {
            return redirect('/students/dashboard');
        } elseif ($user->profile_type === Professor::class) {
            return redirect('/professors/dashboard');
        } elseif ($user->profile_type === DepartmentChief::class) {
            return redirect('/department-chiefs/dashboard');
        } elseif ($user->profile_type === Admin::class) {
            return redirect('/admins/dashboard');
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/professor-settings.php';
require __DIR__.'/chief-settings.php';
require __DIR__.'/admin-settings.php';
require __DIR__.'/etudiant-settings.php';
require __DIR__.'/etudiant.php';
require __DIR__.'/professor.php';
require __DIR__.'/chief.php';
require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
