<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Professor;
use App\Models\Module;

class Document extends Model
{
    // Each document belongs to one professor
    public function professor()
    {
        return $this->belongsTo(Professor::class, 'professor_id');
    }

    // Each document belongs to one module
    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }
}
