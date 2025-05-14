<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Professor;
use Illuminate\Support\Facades\Hash;

class ProfessorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $professor = Professor::create([
            'speciality' => 'Computer Science',
        ]);

        User::create([
            'name' => 'John',
            'prenom' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password'),
            'departement' => 'Informatique',
            'photo' => null,
            'number' => '0600000000',
            'address' => '123 University Ave',
            'date_naissance' => '1980-01-01',
            'cin' => 'AA123456',
            'profile_type' => Professor::class,
            'profile_id' => $professor->id,
        ]);
    }
}
