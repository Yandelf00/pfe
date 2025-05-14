<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Calendrier;

class Evenement extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function calendrier()
    {
        return $this->belongsTo(Calendrier::class, 'calendrier_id');
    }
}
