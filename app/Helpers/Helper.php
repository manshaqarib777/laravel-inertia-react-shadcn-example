<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class Helper
{
    public static $client = "";

    // Initialize the $client URL in the static context
    public static function init()
    {
        self::$client = env('API_URL', 'https://8l79w9tda9.execute-api.eu-central-1.amazonaws.com/dev');
    }


    // tested
    /**
     * curl get request template
     */
    public static function sendHttpRequest($url, $method = 'GET', $data = [], $queryParams = [])
    {
        // Ensure that the client URL is initialized
        if (empty(self::$client)) {
            self::init();  // Initialize $client if not already set
        }

        $url = self::$client.$url;

        $response = Http::withHeaders([
            'Cache-Control'     =>  'no-cache',
            'Content-Type'      =>  'application/json',
            'Accept'            =>  'application/json',
            'Authorization'     =>  session('auth_token') ? 'Bearer '.session('auth_token') : ''
        ]);

        // Add query parameters if provided
        if (!empty($queryParams)) {
            $response = $response->withOptions(['query' => $queryParams]);
        }

        // Determine the request method
        switch (strtoupper($method)) {
            case 'GET':
                $response = $response->get($url);
                break;

            case 'POST':
                $response = $response->post($url, $data);
                break;

            case 'PUT':
                $response = $response->put($url, $data);
                break;

            case 'DELETE':
                $response = $response->delete($url, $data);
                break;

            case 'PATCH':
                $response = $response->patch($url, $data);
                break;

            default:
                throw new \InvalidArgumentException("Invalid HTTP method: $method");
        }

        $body = $response->json();
        if ($response->successful()) {
            return $body;
        }
        // Handle error responses, considering both formats:
        $errorMessage = "Error in processing this request"; // Default error message

        // Case 1: Check if 'error' key exists in response and has 'message'
        if (isset($body['error']['message'])) {
            $errorMessage = $body['error']['message'];
        }

        // Case 2: Check if 'errors' array exists and has multiple error messages
        elseif (isset($body['errors']) && is_array($body['errors'])) {
            // Collect all error messages from the 'errors' array
            $errorMessages = array_column($body['errors'], 'message');
            $errorMessage = implode(", ", $errorMessages); // Join multiple error messages into one
        }

        // Abort with a 400 status code and the error message
        abort(400, $errorMessage);
    }



    public static function calculateWeeklyAndMonthlyTotals($data)
    {
        // Get date ranges for current week, previous week, and current month
        $startOfCurrentWeek = Carbon::now()->startOfWeek();
        $endOfCurrentWeek = Carbon::now()->endOfWeek();
        $startOfPreviousWeek = Carbon::now()->subWeek()->startOfWeek();
        $endOfPreviousWeek = Carbon::now()->subWeek()->endOfWeek();
        $startOfCurrentMonth = Carbon::now()->startOfMonth();
        $endOfCurrentMonth = Carbon::now()->endOfMonth();
        $startOfPreviousMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfPreviousMonth = Carbon::now()->subMonth()->endOfMonth();

        // Initialize totals for each period
        $currentWeekTotals = ['quantity' => 0, 'price' => 0];
        $previousWeekTotals = ['quantity' => 0, 'price' => 0];
        $currentMonthTotals = ['quantity' => 0, 'price' => 0];
        $previousMonthTotals = ['quantity' => 0, 'price' => 0];
        $totals = ['quantity' => 0, 'price' => 0];
        $records = [];

        // Loop through data and categorize it based on the time period
        foreach ($data as $item) {
            // Parse pickupStartTime into a Carbon instance
            $pickupStartTime = Carbon::parse($item['pickupStartTime']);
            $records[] = [
                "organization" => $item['organization'],
                "type" => $item['type'],
                "status" => $item['status'],
                "date" => $pickupStartTime->format('Y-m-d'),
                "price" => "€ " . number_format($item['payment']['totalPrice'], 2),
            ];

            // Round quantity and price to 2 decimal places
            $quantity = round($item['quantity'], 2);
            $price = round($item['payment']['totalPrice'], 2);

            // Check for current week
            if ($pickupStartTime->between($startOfCurrentWeek, $endOfCurrentWeek)) {
                $currentWeekTotals['quantity'] += $quantity;
                $currentWeekTotals['price'] += $price;
            }

            // Check for previous week
            if ($pickupStartTime->between($startOfPreviousWeek, $endOfPreviousWeek)) {
                $previousWeekTotals['quantity'] += $quantity;
                $previousWeekTotals['price'] += $price;
            }

            // Check for current month
            if ($pickupStartTime->between($startOfCurrentMonth, $endOfCurrentMonth)) {
                $currentMonthTotals['quantity'] += $quantity;
                $currentMonthTotals['price'] += $price;
            }

            // Check for previous month
            if ($pickupStartTime->between($startOfPreviousMonth, $endOfPreviousMonth)) {
                $previousMonthTotals['quantity'] += $quantity;
                $previousMonthTotals['price'] += $price;
            }

            // Check for total
            $totals['quantity'] += $quantity;
            $totals['price'] += $price;
        }

        // Round all totals to two decimal places to ensure consistent precision
        $currentWeekTotals['quantity'] = round($currentWeekTotals['quantity'], 2);
        $currentWeekTotals['price'] = round($currentWeekTotals['price'], 2);

        $previousWeekTotals['quantity'] = round($previousWeekTotals['quantity'], 2);
        $previousWeekTotals['price'] = round($previousWeekTotals['price'], 2);

        $currentMonthTotals['quantity'] = round($currentMonthTotals['quantity'], 2);
        $currentMonthTotals['price'] = round($currentMonthTotals['price'], 2);

        $previousMonthTotals['quantity'] = round($previousMonthTotals['quantity'], 2);
        $previousMonthTotals['price'] = round($previousMonthTotals['price'], 2);

        $totals['quantity'] = round($totals['quantity'], 2);
        $totals['price'] = round($totals['price'], 2);

        // Calculate percentage difference for quantity and price between current and previous periods
        $quantityDifference = [
            "week" => round(self::getDifferencePercentage($currentWeekTotals['quantity'], $previousWeekTotals['quantity']), 2),
            "month" => round(self::getDifferencePercentage($currentMonthTotals['quantity'], $previousMonthTotals['quantity']), 2)
        ];
        $priceDifference = [
            "week" => round(self::getDifferencePercentage($currentWeekTotals['price'], $previousWeekTotals['price']), 2),
            "month" => round(self::getDifferencePercentage($currentMonthTotals['price'], $previousMonthTotals['price']), 2)
        ];

        return [
            'currentWeek' => $currentWeekTotals,
            'previousWeek' => $previousWeekTotals,
            'currentMonth' => $currentMonthTotals,
            'previousMonth' => $previousMonthTotals,
            'totals' => $totals,
            'quantityDifference' => $quantityDifference,
            'priceDifference' => $priceDifference,
            'data' => $records
        ];
    }


    /**
     * Calculate the percentage difference between two values.
     */
    public static function getDifferencePercentage($currentValue, $previousValue)
    {
        if ($previousValue == 0) {
            return $currentValue > 0 ? 100 : 0; // Avoid division by zero
        }
        // Calculate percentage difference and round to 2 decimal places
        return round((($currentValue - $previousValue) / $previousValue) * 100, 2);
    }

}
