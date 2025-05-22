<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Document;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Document::create([
            'titre' => 'Test Cours',
            'type' => 'cours', // or 'td', 'tp', etc.
            'fichier' => 'documents/test.txt',
            'professor_id' => 1,
            'module_id' => 3,
        ]);

        Document::create([
            'titre' => 'Test TD',
            'type' => 'td', // or 'td', 'tp', etc.
            'fichier' => 'documents/testtwo.txt',
            'professor_id' => 1,
            'module_id' => 3,
        ]);

        Document::create([
            'titre' => 'Test TP',
            'type' => 'tp', // or 'td', 'tp', etc.
            'fichier' => 'documents/testthree.txt',
            'professor_id' => 1,
            'module_id' => 3,
        ]);
    }
}
