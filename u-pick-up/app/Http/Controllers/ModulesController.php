<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleStoreRequest;
use App\Models\Modules;
use Illuminate\Http\Request;

class ModulesController extends Controller
{

    public function index()
    {
       $modules = Modules::all(); 
          
       // Return Json Response
       return response()->json([
            'results' => $modules
       ],200);
    }

    public function store(ModuleStoreRequest $request)
    {
        try {
            // Create User
            Modules::create([
                'subject_code' => $request->subject_code,
                'subject_name' => $request->subject_name,
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
            $modules = Modules::findOrFail($id);

            // Return the book data as JSON response
            return response()->json(['modules' => $modules], 200);
        } catch (\Exception $e) {
            // Handle the exception and return an error response
            return response()->json(['message' => 'Modules not found.'], 404);
        }
    }


    public function update(ModuleStoreRequest $request, $id)
    {
        try {
            // Find User
            $modules = Modules::find($id);
            if(!$modules){
              return $modules()->json([
                'message'=>'Modules Not Found.'
              ],404);
            }
       
            //echo "request : $request->image";
            $modules->subject_code = $request->subject_code;
            $modules->subject_name = $request->subject_name;
            $modules->year_level = $request->year_level;
            $modules->course = $request->course;
            $modules->available = $request->available;
            $modules->quantity = $request->quantity;
       
            // Update User
            $modules->save();
       
            // Return Json Response
            return response()->json([
                'message' => "Modules successfully updated."
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
        $modules = Modules::find($id);
        if(!$modules){
          return response()->json([
             'message'=>'Modules Not Found.'
          ],404);
        }
         
        // Delete User
        $modules->delete();
       
        // Return Json Response
        return response()->json([
            'message' => "Modules successfully deleted."
        ],200);
    }

    public function getModulesForYearLevelAndCourse(Request $request, $year_level, $course)
    {
        try {
            // Query the 'books' table based on year_level and course
            $modules = Modules::where('course', $course)
                        ->where('year_level', $year_level)
                        ->get();

            // Return the retrieved books as a JSON response
            return response()->json($modules);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['message' => 'Failed to retrieve modules.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getModulessForCourse(Request $request, $course)
    {
        try {
            // Query the 'books' table based on course
            $modules = Modules::where('course', $course)->get();
            return response()->json($modules);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve modules.', 'error' => $e->getMessage()], 500);
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
