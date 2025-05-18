<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:department_chief'])->group(function () {
    Route::get('/department-chiefs/dashboard', function () {
        return Inertia::render('department-chiefs/dashboard');
    })->name('depchiefs.dashboard');
});
