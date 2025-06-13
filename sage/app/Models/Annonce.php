<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DepartmentChief;

class Annonce extends Model
{
    protected $fillable = [
        'titre',
        'contenu',
        'piece_jointe',
        'department_chief_id'
    ];

    public function chiefs()
    {
        return $this->belongsTo(DepartmentChief::class, 'department_chief_id');
    }
}
