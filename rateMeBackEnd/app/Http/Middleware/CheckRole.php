<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role  // <-- parameter
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = auth()->user();
        if (!$user || $user->role->name !== $role) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        if ($user->role->name === $role) {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }
}
