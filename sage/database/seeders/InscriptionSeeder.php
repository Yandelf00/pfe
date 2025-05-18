<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Inscription;

class InscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Inscription::create([
            'anne_uni' => '3',
            'etudiant_id'=> 2,
            'module_id'=> 4,
        ]);
        Inscription::create([
            'anne_uni' => '3',
            'etudiant_id'=> 2,
            'module_id'=> 3,
        ]);
    }
}
