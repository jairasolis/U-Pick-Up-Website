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
          
       return response()->json([
            'results' => $uniform
       ],200);
    }

    public function store(UniformStoreRequest $request)
    {
        try {
            Uniforms::create([
                'uniform_type' => $request->uniform_type,
                'year_level' => $request->year_level,
                'course' => $request->course,
                'available' => $request->available,
                'quantity' => $request->quantity,
                
            ]);
 
            return response()->json([
                'message' => "Item successfully created."
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function show($id)
    {
        try {
            $uniform = Uniforms::findOrFail($id);

            return response()->json(['uniform' => $uniform], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Uniform not found.'], 404);
        }
    }


    public function update(UniformStoreRequest $request, $id)
    {
        try {
            $uniform = Uniforms::find($id);
            if(!$uniform){
              return $uniform()->json([
                'message'=>'Uniform Not Found.'
              ],404);
            }
       
            $uniform->uniform_type = $request->uniform_type;
            $uniform->year_level = $request->year_level;
            $uniform->course = $request->course;
            $uniform->available = $request->available;
            $uniform->quantity = $request->quantity;
       
            $uniform->save();
       
            return response()->json([
                'message' => "Uniform successfully updated."
            ],200);
        } catch (\Exception $e) {
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
         
        $uniform->delete();
       
        return response()->json([
            'message' => "Uniform successfully deleted."
        ],200);
    }

    public function getUniformsForYearLevelAndCourse(Request $request,$course, $year_level)
    {
        try {
            $uniforms = Uniforms::where('course', $course)
                        ->where('year_level', $year_level)
                        ->get();

            return response()->json($uniforms);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve uniforms.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getUniformsForCourse(Request $request, $course)
    {
        try {
            $uniforms = Uniforms::where('course', $course)->get();
            return response()->json($uniforms);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve uniforms.', 'error' => $e->getMessage()], 500);
        }
    }
}
