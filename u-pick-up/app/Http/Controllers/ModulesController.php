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
          
       return response()->json([
            'results' => $modules
       ],200);
    }

    public function store(ModuleStoreRequest $request)
    {
        try {
            Modules::create([
                'subject_code' => $request->subject_code,
                'subject_name' => $request->subject_name,
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
            $modules = Modules::findOrFail($id);

            return response()->json(['modules' => $modules], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Modules not found.'], 404);
        }
    }


    public function update(ModuleStoreRequest $request, $id)
    {
        try {
            $modules = Modules::find($id);
            if(!$modules){
              return $modules()->json([
                'message'=>'Modules Not Found.'
              ],404);
            }
       
            $modules->subject_code = $request->subject_code;
            $modules->subject_name = $request->subject_name;
            $modules->year_level = $request->year_level;
            $modules->course = $request->course;
            $modules->available = $request->available;
            $modules->quantity = $request->quantity;
       
            $modules->save();
       
            return response()->json([
                'message' => "Modules successfully updated."
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function destroy($id)
    {
        $modules = Modules::find($id);
        if(!$modules){
          return response()->json([
             'message'=>'Modules Not Found.'
          ],404);
        }
         
        $modules->delete();
       
        return response()->json([
            'message' => "Modules successfully deleted."
        ],200);
    }

    public function getModulesForYearLevelAndCourse(Request $request, $course, $year_level)
    {
        try {
            $modules = Modules::where('course', $course)
                        ->where('year_level', $year_level)
                        ->get();

            return response()->json($modules);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve modules.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getModulessForCourse(Request $request, $course)
    {
        try {
            $modules = Modules::where('course', $course)->get();
            return response()->json($modules);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve modules.', 'error' => $e->getMessage()], 500);
        }
    }
}
