<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PomodoroController; // Import your controller

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route for fetching all Pomodoro sessions
Route::get('/pomodoro/sessions', [PomodoroController::class, 'index']);

// Route for storing a new Pomodoro session
Route::post('/pomodoro/sessions', [PomodoroController::class, 'store']);

// Example user route (can be removed if not needed)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
