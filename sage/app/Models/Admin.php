<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Admin extends Model
{
    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }
}
