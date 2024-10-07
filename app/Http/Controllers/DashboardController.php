<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use Carbon\Carbon;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function home(Request $request)
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION
        ]);
    }

    public function index(Request $request)
    {
        return Inertia::render('Dashboard');
    }

    public function organizations(){

        $organizations = null;
        try {
            $organizations = Helper::sendHttpRequest('/organizations', 'GET');

        } catch (\Exception $e) {
            Log::error('Donation fetching failed: ' . $e->getMessage());
        }
        return $organizations;
    }

    public function donations(){
        $donationStats = [
            'currentWeek' => [],
            'previousWeek' => [],
            'currentMonth' => [],
            'previousMonth' => [],
            'totals' => [],
            'quantityDifference' => [],
            'priceDifference' => [],
            'data' => []
        ];
        try {
            $donations = Helper::sendHttpRequest('/donations?populateUser=true&populateOrganization=true', 'GET');
            $donationStats = Helper::calculateWeeklyAndMonthlyTotals(collect($donations['data']));

        } catch (\Exception $e) {
            Log::error('Donation fetching failed: ' . $e->getMessage());
        }
        return $donationStats;
    }

        /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function statusUpdate(Request $request)
    {

        $request->validate([
            'id' => 'required|string',
            'status' => 'required|boolean',
        ]);

        try {
            $data = [
                'organizationId' => $request->id,
                'status' => $request->status,
            ];
            $response = Helper::sendHttpRequest('/organizations/activate', 'POST', $data);

            // Redirect the user to the dashboard (or intended page)
            return response()->json([
                'message' => 'Organization status updated successfully',
                'data' => $response,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Login failed: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while updating the organization status.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
