<?php

namespace App\Http\Controllers;

use App\Models\Uniforms;
use Illuminate\Http\Request;

class UniformController extends Controller
{

    public function getUniformsForYearLevelAndCourse(Request $request, $yearLevel, $course)
    {
        try {
            // Query the 'books' table based on year_level and course
            $uniforms = Uniforms::where('course', $course)
                        ->where('year_level', $yearLevel)
                        ->get();

            // Return the retrieved books as a JSON response
            return response()->json($uniforms);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['message' => 'Failed to retrieve books.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getUniformsForCourse(Request $request, $course)
    {
        try {
            // Query the 'books' table based on course
            $uniforms = Uniforms::where('course', $course)->get();
            return response()->json($uniforms);
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
