<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Etudiant;
use App\Models\Professor;
use App\Models\DepartmentChief;
use App\Models\Admin;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * This middleware checks if the authenticated user has the required role to access a route.
     * The role is passed as a parameter to the middleware (e.g., 'etudiant', 'professor' etc..).
     *
     * It compares the user's polymorphic profile_type to the expected model class for the role.
     * If the user's profile_type matches the required role's model class, the request proceeds.
     * Otherwise, the middleware aborts with a 403 Forbidden error.
     *
     * @param  \Illuminate\Http\Request  $request The incoming HTTP request
     * @param  \Closure  $next The next middleware/request handler
     * @param  string  $role The required role for the route (e.g. 'etudiant', 'professor')
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = Auth::user();
        if (
            ($role == 'etudiant' && $user->profile_type === Etudiant::class)||
            ($role == 'professor' && $user->profile_type === Professor::class)||
            ($role == 'department_chief' && $user->profile_type == DepartmentChief::class)||
            ($role == 'admin' && $user->profile_type === Admin::class)
        ) {
            return $next($request);
        }
        abort(403, 'Unauthorized');
    }
}
