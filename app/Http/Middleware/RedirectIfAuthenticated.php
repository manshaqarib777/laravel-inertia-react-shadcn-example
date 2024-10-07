<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Retrieve the token from the session
        $token = $request->session()->get('auth_token'); // Fetch token from session

        if ($token) {
            try {
                // Validate and decode the JWT using the secret key
                $decoded = JWT::decode($token, new Key(env('AUTH_SECRET', '01234567fasdasasdasd2256789abcdecdedef01'), 'HS256'));

                // Optionally, you can validate claims such as expiration time, issuer, etc.
                if ($decoded->exp > time()) {
                    // If the token is valid, redirect the user to the dashboard
                    return redirect()->intended(RouteServiceProvider::HOME);
                }
            } catch (\Exception $e) {
                // If token is invalid, allow the user to access the guest page
                // No need to handle the exception here as we'll allow them to continue
            }
        }

        // If no valid token is found, proceed to the next middleware (let them access the page)
        return $next($request);
    }
}
