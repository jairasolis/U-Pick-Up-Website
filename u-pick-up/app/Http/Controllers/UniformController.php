<?php

namespace App\Http\Controllers;

use App\Http\Requests\UniformStoreRequest;
use App\Models\Uniforms;
use Illuminate\Http\Request;

class UniformController extends Controller
{

    public function index()
    {
       $uniform = Uniforms::all(); 
          
       // Return Json Response
       return response()->json([
            'results' => $uniform
       ],200);
    }

    public function store(UniformStoreRequest $request)
    {
        try {
            // Create User
            Uniforms::create([
                'uniform_type' => $request->uniform_type,
                'year_level' => $request->year_level,
                'course' => $request->course,
                'available' => $request->available,
                'quantity' => $request->quantity,
                
            ]);
 
            // Return Json Response
            return response()->json([
                'message' => "Item successfully created."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function show($id)
    {
        try {
            // Find the book by ID
            $uniform = Uniforms::findOrFail($id);

            // Return the book data as JSON response
            return response()->json(['uniform' => $uniform], 200);
        } catch (\Exception $e) {
            // Handle the exception and return an error response
            return response()->json(['message' => 'Uniform not found.'], 404);
        }
    }


    public function update(UniformStoreRequest $request, $id)
    {
        try {
            // Find User
            $uniform = Uniforms::find($id);
            if(!$uniform){
              return $uniform()->json([
                'message'=>'Uniform Not Found.'
              ],404);
            }
       
            //echo "request : $request->image";
            $uniform->uniform_type = $request->uniform_type;
            $uniform->year_level = $request->year_level;
            $uniform->course = $request->course;
            $uniform->available = $request->available;
            $uniform->quantity = $request->quantity;
       
            // Update User
            $uniform->save();
       
            // Return Json Response
            return response()->json([
                'message' => "Uniform successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function destroy($id)
    {
        // Detail 
        $uniform = Uniforms::find($id);
        if(!$uniform){
          return response()->json([
             'message'=>'Uniform Not Found.'
          ],404);
        }
         
        // Delete User
        $uniform->delete();
       
        // Return Json Response
        return response()->json([
            'message' => "Uniform successfully deleted."
        ],200);
    }

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
            return response()->json(['message' => 'Failed to retrieve uniforms.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getUniformsForCourse(Request $request, $course)
    {
        try {
            // Query the 'books' table based on course
            $uniforms = Uniforms::where('course', $course)->get();
            return response()->json($uniforms);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve uniforms.', 'error' => $e->getMessage()], 500);
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
