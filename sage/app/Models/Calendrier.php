<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Evenement;

class Calendrier extends Model
{
    public function evenements()
    {
        return $this->hasMany(Evenement::class);
    }
}
