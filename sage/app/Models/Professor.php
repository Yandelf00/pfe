<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Module;
use App\Models\Document;

class Professor extends Model
{

    protected $fillable = [
        'speciality',
    ];

    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
