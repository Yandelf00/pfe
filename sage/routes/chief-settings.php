<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','role:department_chief'])->group(function () {
    Route::get('department-chiefs/settings/profile', [ProfileController::class, 'editDepChief'])->name('department-chiefs.profile.edit');
    Route::patch('department-chiefs/settings/profile', [ProfileController::class, 'update'])->name('department-chiefs.profile.update');
    Route::delete('department-chiefs/settings/profile', [ProfileController::class, 'destroy'])->name('department-chiefs.profile.destroy');

    Route::get('department-chiefs/settings/password', [PasswordController::class, 'editDepChief'])->name('department-chiefs.password.edit');
    Route::put('department-chiefs/settings/password', [PasswordController::class, 'update'])->name('department-chiefs.password.update');

    Route::get('department-chiefs/settings/appearance', function () {
        return Inertia::render('department-chiefs/settings/appearance');
    })->name('department-chiefs.settings.appearance');
});
