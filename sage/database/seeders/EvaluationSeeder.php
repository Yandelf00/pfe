<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Evaluation;

class EvaluationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Evaluation::create([
            'note'=>10,
            'date_evaluation'=>'2025-06-06',
            'etudiant_id'=>2,
            'module_id'=>3,
        ]);
        Evaluation::create([
            'note'=>14,
            'date_evaluation'=>'2025-06-07',
            'etudiant_id'=>2,
            'module_id'=>4,
        ]);
    }
}
