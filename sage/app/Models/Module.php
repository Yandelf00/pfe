<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Professor;
use App\Models\Document;
use App\Models\Inscription;
use App\Models\Evaluation;
use App\Models\Absence;
use App\Models\Emploi;


class Module extends Model
{
    public function professor()
    {
        return $this->belongsTo(Professor::class, 'professor_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
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

    public function emplois()
    {
        return $this->belongsToMany(Emploi::class, 'module_emploi');
    }
}
