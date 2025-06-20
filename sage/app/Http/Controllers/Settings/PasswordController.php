<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/password');
    }

    /**
     * Show the student's password settings page.
     */
    public function editStudent(): Response
    {
        return Inertia::render('students/settings/password');
    }

    /**
     * Show the admin's password settings page.
     */
    public function editAdmin(): Response
    {
        return Inertia::render('admins/settings/password');
    }

    /**
     * Show the admin's password settings page.
     */
    public function editDepChief(): Response
    {
        return Inertia::render('department-chiefs/settings/password');
    }

    /**
     * Show the admin's password settings page.
     */
    public function editEnseignant(): Response
    {
        return Inertia::render('professors/settings/password');
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
