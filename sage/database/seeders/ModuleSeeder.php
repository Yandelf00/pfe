<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Module;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Module::create([
            'nom' => 'sid',
            'semestre' => 'S6',
            'professor_id' => 1,
        ]);
        Module::create([
            'nom' => 'architecture ordinateur',
            'semestre' => 'S4',
            'professor_id' => 1,
        ]);
        Module::create([
            'nom' => 'PHP',
            'semestre' => 'S6',
            'professor_id' => 1,
        ]);
        Module::create([
            'nom' => 'Java',
            'semestre' => 'S6',
            'professor_id' => 1,
        ]);
        Module::create([
            'nom' => 'Analyse de données',
            'semestre' => 'S6',
            'professor_id' => 1,
        ]);
    }
}
