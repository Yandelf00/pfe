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
});
