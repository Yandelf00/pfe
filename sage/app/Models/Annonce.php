<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DepartmentChief;

class Annonce extends Model
{
    public function chiefs()
    {
        return $this->belongsTo(DepartmentChief::class, 'department_chief_id');
    }
}
