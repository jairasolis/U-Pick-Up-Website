<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use Illuminate\Http\Request;

class ModulesController extends Controller
{

    public function getModulesForYearLevelAndCourse(Request $request, $yearLevel, $course)
    {
        try {
            // Query the 'books' table based on year_level and course
            $modules = Modules::where('year_level', $yearLevel)
                         ->where('course', $course)
                         ->get();

            // Return the retrieved books as a JSON response
            return response()->json($modules);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['message' => 'Failed to retrieve books.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getModulessForCourse(Request $request, $course)
    {
        try {
            // Query the 'books' table based on course
            $modules = Modules::where('course', $course)->get();
            return response()->json($modules);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve books.', 'error' => $e->getMessage()], 500);
        }
    }


    // /**
    //  * Display a listing of the resource.
    //  */
    // public function index()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     //
    // }
}
