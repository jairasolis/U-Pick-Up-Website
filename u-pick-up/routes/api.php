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

// logout student or admin
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// Route::apiResource('/modules', ModulesController::class);
// Route::apiResource('/uniforms', UniformController::class);
// Route::apiResource('/books', BookController::class);

// Route::middleware('auth:sanctum')->get('/books/{yearLevel}/{course}', [BookController::class, 'getBooksForYearLevelAndCourse']);
Route::get('/uniforms/{course}/{yearLevel}', [UniformController::class, 'getUniformsForYearLevelAndCourse']);
Route::get('/modules/{course}/{yearLevel}', [ModulesController::class, 'getModulesForYearLevelAndCourse']);
Route::get('/books/{course}/{yearLevel}', [BookController::class, 'getBooksForYearLevelAndCourse']);


Route::get('/uniforms/{course}', [UniformController::class, 'getUniformsForCourse']);
Route::get('/modules/{course}', [ModulesController::class, 'getModulessForCourse']);
Route::get('/books/{course}', [BookController::class, 'getBooksForCourse']);

Route::get('books', [BookController::class, 'index']); //working
Route::get('showbooks/{id}', [BookController::class, 'show']); 
Route::post('addnew-books', [BookController::class, 'store']); //working
Route::put('booksupdate/{id}', [BookController::class, 'update']); //working
Route::delete('booksdelete/{id}', [BookController::class, 'destroy']); //working