<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','role:professor'])->group(function () {
    Route::get('professors/settings/profile', [ProfileController::class, 'editEnseignant'])->name('enseignant.profile.edit');
    Route::patch('professors/settings/profile', [ProfileController::class, 'update'])->name('enseignant.profile.update');
    Route::delete('professors/settings/profile', [ProfileController::class, 'destroy'])->name('enseignant.profile.destroy');

    Route::get('professors/settings/password', [PasswordController::class, 'editEnseignant'])->name('enseignant.password.edit');
    Route::put('professors/settings/password', [PasswordController::class, 'update'])->name('enseignant.password.update');

    Route::get('profssors/settings/appearance', function () {
        return Inertia::render('professors/settings/appearance');
    })->name('enseignant.settings.appearance');
});
