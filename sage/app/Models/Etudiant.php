<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Inscription;
use App\Models\Evaluation;
use App\Models\Absence;

class Etudiant extends Model
{
    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }
}
