<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ModulesController;
use App\Http\Controllers\UniformController;
use App\Http\Controllers\BookController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/student', StudentController::class);

Route::apiResource('/admin', AdminController::class);
Route::apiResource('/post', PostController::class);

// student registration and login route
Route::post('/student-registration', [AuthController::class, 'studentRegistration']);
Route::post('/student-login', [AuthController::class, 'studentLogin']);

// admin registration and login route
Route::post('/admin-registration', [AuthController::class, 'adminRegistration']);
Route::post('/admin-login', [AuthController::class, 'adminLogin']);

// student logout
Route::post('/student-logout', [AuthController::class, 'studentLogout'])->middleware('auth:sanctum');

// admin logout
Route::post('/admin-logout', [AuthController::class, 'adminLogout'])->middleware('auth:sanctum');

Route::apiResource('/modules', ModulesController::class);
Route::apiResource('/uniforms', UniformController::class);
Route::apiResource('/books', BookController::class);