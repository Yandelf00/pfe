<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Annonce;
use App\Models\Emploi;

class DepartmentChief extends Model
{
    //attributes that are mass fillable
    protected $fillable = [
        'mandat',
    ];

    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }

    public function annonces()
    {
        return $this->hasMany(Annonce::class);
    }

    public function emplois()
    {
        return $this->hasMany(Emploi::class);
    }
}
