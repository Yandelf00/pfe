<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','role:admin'])->group(function () {
    Route::get('admins/settings/profile', [ProfileController::class, 'editAdmin'])->name('admins.profile.edit');
    Route::patch('admins/settings/profile', [ProfileController::class, 'update'])->name('admins.profile.update');
    Route::delete('admins/settings/profile', [ProfileController::class, 'destroy'])->name('admins.profile.destroy');

    Route::get('admins/settings/password', [PasswordController::class, 'editAdmin'])->name('admins.password.edit');
    Route::put('admins/settings/password', [PasswordController::class, 'update'])->name('admins.password.update');

    Route::get('admins/settings/appearance', function () {
        return Inertia::render('admins/settings/appearance');
    })->name('admins.settings.appearance');
});
