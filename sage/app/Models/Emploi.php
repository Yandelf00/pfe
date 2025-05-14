<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Promotion;
use App\Models\DepartmentChief;
use App\Models\Module;

class Emploi extends Model
{
    public function promotion()
    {
        return $this->belongsTo(Promotion::class, 'promotion_id');
    }

    public function department_chief()
    {
        return $this->belongsTo(DepartmentChief::class, 'department_chief_id');
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class, 'module_emploi');
    }
}
