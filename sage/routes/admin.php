<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admins/dashboard', function () {
        return Inertia::render('admins/dashboard');
    })->name('admins.dashboard');
});
