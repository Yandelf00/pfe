<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Emploi;

class Promotion extends Model
{
    public function emplois()
    {
        return $this->hasMany(Emploi::class);
    }
}
