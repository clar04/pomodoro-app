<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines which domains are allowed to access your
    | application via HTTP requests from a web browser.
    |
    | For more information: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Apply CORS to all API routes and CSRF cookie route

    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['http://localhost:3000'], 

    'allowed_origins_patterns' => [], 

    'allowed_headers' => ['*'], 

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // Set to true if you're using cookies/sessions for authentication
];
