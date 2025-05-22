<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DepartmentChief;

class AdminController extends Controller
{
    public function chefDepartement()
    {
        // get all the department chiefs
        $departmentChiefs = DepartmentChief::get();

        return Inertia::render('admins/chef-department', [
            'chefs' => $departmentChiefs,
        ]);
    }
}
