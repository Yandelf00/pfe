<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Notification extends Model
{
    //
    /**
     * Get the users associated with the notification.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        // Define many-to-many relationship with User through the pivot table
        return $this->belongsToMany(User::class, 'notification_user');
    }
}
