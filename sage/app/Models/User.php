<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Notification;
use App\Models\Evenement;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'prenom',
        'email',
        'password',
        'departement',
        'photo',
        'number',
        'address',
        'date_naissance',
        'cin',
        'profile_id',
        'profile_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the profile associated with the user.
     *
     * This defines a polymorphic relationship, allowing the User to be linked
     * to one of several possible profile types — such as Etudiant (student),
     * Professeur, or DepartmentChief — using the `profile_type` and `profile_id`
     * columns in the `users` table.
     *
     * Example:
     * - If profile_type = 'App\Models\Etudiant' and profile_id = 5,
     *   this returns the Etudiant model with ID 5.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function profile()
    {
        return $this->morphTo();
    }

    /**
     * Get the notifications associated with the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function notifications()
    {
        // Define many-to-many relationship with Notification through the pivot table
        return $this->belongsToMany(Notification::class, 'notification_user');
    }

    public function evenements()
    {
        return $this->hasMany(Evenement::class);
    }


}
