<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','role:etudiant'])->group(function () {
    Route::get('students/settings/profile', [ProfileController::class, 'editStudent'])->name('students.profile.edit');
    Route::patch('students/settings/profile', [ProfileController::class, 'update'])->name('students.profile.update');
    Route::delete('students/settings/profile', [ProfileController::class, 'destroy'])->name('students.profile.destroy');

    Route::get('students/settings/password', [PasswordController::class, 'editStudent'])->name('students.password.edit');
    Route::put('students/settings/password', [PasswordController::class, 'update'])->name('students.password.update');

    Route::get('students/settings/appearance', function () {
        return Inertia::render('students/settings/appearance');
    })->name('students.settings.appearance');
});
