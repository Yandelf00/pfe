<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Admin::create([
            'diplome' => 'diplome science math info',
        ]);

        User::create([
            'name' => 'Nassim',
            'prenom' => 'Othman',
            'email' => 'othman@example.com',
            'password' => Hash::make('password'),
            'departement' => 'Informatique',
            'photo' => null,
            'number' => '0637348438',
            'address' => '29 St Pierre',
            'date_naissance' => '1995-07-01',
            'cin' => 'EE' . rand(100000, 999999),
            'profile_type' => Admin::class,
            'profile_id' => $admin->id,
        ]);
    }
}
