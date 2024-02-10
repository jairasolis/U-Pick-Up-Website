<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function getBooksForYearLevelAndCourse(Request $request, $yearLevel, $course)
    {
        try {
            // Query the 'books' table based on year_level and course
            $books = Books::where('year_level', $yearLevel)
                         ->where('course', $course)
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

    // protected $book;
    // public function __construct(){
    //     $this->book = new Books();
    // }
    // /**
    //  * Display a listing of the resource.
    //  */
    // public function index()
    // {
    //     return $this->book->all();
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     return $this->book->create($request->all());
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     return $student = $this->book->find($id);
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     $student = $this->book->find($id);
    //     $student->update($request->all());
    //     return $student;
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     $student = $this->book->find($id);
    //     return $student->delete();
    // }
}
