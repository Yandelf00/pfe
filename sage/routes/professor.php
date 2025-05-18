<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:professor'])->group(function () {
    Route::get('/professors/dashboard', function () {
        return Inertia::render('professors/dashboard');
    })->name('professors.dashboard');
});
