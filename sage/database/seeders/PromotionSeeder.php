<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Promotion;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Promotion::create([
            'intitule'=>'firstprom',
            'filiere'=>'SMI',
        ]);

        Promotion::create([
            'intitule'=>'secondprom',
            'filiere'=>'SMA',
        ]);

        Promotion::create([
            'intitule'=>'thirdprom',
            'filiere'=>'SMC',
        ]);

        Promotion::create([
            'intitule'=>'fourthprom',
            'filiere'=>'SMP',
        ]);
    }
}
