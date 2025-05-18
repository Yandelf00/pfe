<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Etudiant;
use Illuminate\Support\Facades\Hash;

class EtudiantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $students = [
            [
                'name' => 'Alice',
                'prenom' => 'Martin',
                'email' => 'alice.martin@example.com',
                'numt' => 'ETU1001',
                'cne' => 'CNE001',
                'groupe_td' => 'G1',
            ],
            [
                'name' => 'Bilal',
                'prenom' => 'Khan',
                'email' => 'bilal.khan@example.com',
                'numt' => 'ETU1002',
                'cne' => 'CNE002',
                'groupe_td' => 'G2',
            ],
            [
                'name' => 'Chloe',
                'prenom' => 'Nguyen',
                'email' => 'chloe.nguyen@example.com',
                'numt' => 'ETU1003',
                'cne' => 'CNE003',
                'groupe_td' => 'G3',
            ],
        ];

        foreach ($students as $data) {
            $etudiant = Etudiant::create([
                'numt' => $data['numt'],
                'cne' => $data['cne'],
                'groupe_td' => $data['groupe_td'],
                'prom_id' => 2,
            ]);

            User::create([
                'name' => $data['name'],
                'prenom' => $data['prenom'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'departement' => 'Informatique',
                'photo' => null,
                'number' => '0612345678',
                'address' => '123 Campus St',
                'date_naissance' => '2002-05-01',
                'cin' => 'EE' . rand(100000, 999999),
                'profile_type' => Etudiant::class,
                'profile_id' => $etudiant->id,
            ]);
        }
    }
}
