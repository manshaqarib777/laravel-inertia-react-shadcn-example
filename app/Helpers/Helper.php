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

}
