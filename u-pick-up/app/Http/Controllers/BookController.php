<?php

namespace App\Http\Controllers;
use App\Http\Requests\BookStoreRequest;
use App\Models\Books;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
       $books = Books::all(); 
          
       // Return Json Response
       return response()->json([
            'results' => $books
       ],200);
    }

    public function store(BookStoreRequest $request)
    {
        try {
            // Create User
            Books::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password
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
       // User Detail 
       $books = Books::find($id);
       if(!$books){
         return response()->json([
            'message'=>'Book Not Found.'
         ],404);
       }
       
       // Return Json Response
       return response()->json([
          'books' => $books
       ],200);
    }

    public function update(BookStoreRequest $request, $id)
    {
        try {
            // Find User
            $books = Books::find($id);
            if(!$books){
              return $books()->json([
                'message'=>'Book Not Found.'
              ],404);
            }
       
            //echo "request : $request->image";
            $books->name = $request->name;
            $books->email = $request->email;
       
            // Update User
            $books->save();
       
            // Return Json Response
            return response()->json([
                'message' => "Book successfully updated."
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
        $books = Books::find($id);
        if(!$books){
          return response()->json([
             'message'=>'Book Not Found.'
          ],404);
        }
         
        // Delete User
        $books->delete();
       
        // Return Json Response
        return response()->json([
            'message' => "Book successfully deleted."
        ],200);
    }

    public function getBooksForYearLevelAndCourse(Request $request, $yearLevel, $course)
    {
        try {
            // Query the 'books' table based on year_level and course
            $books = Books::where('course', $course)
                        ->where('year_level', $yearLevel)
                        ->get();
            return response()->json($books);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve books.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getBooksForCourse(Request $request, $course)
    {
        try {
            // Query the 'books' table based on course
            $books = Books::where('course', $course)->get();
            return response()->json($books);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve books.', 'error' => $e->getMessage()], 500);
        }
    }
}
