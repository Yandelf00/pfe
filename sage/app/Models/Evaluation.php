<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Etudiant;
use App\Models\Module;

class Evaluation extends Model
{
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }
}
