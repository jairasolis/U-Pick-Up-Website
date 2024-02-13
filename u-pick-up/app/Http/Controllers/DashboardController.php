<?php

namespace App\Http\Controllers;
use App\Models\Student;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function registeredStudentsCount()
    {
        $count = Student::count();
        return response()->json(['count' => $count]);
    }
    
    public function gender()
    {
        $maleCount = 0;
        $femaleCount = 0;
        
        $maleCount = Student::where('gender', 'male')->count();
        $femaleCount = Student::where('gender', 'female')->count();
        return response()->json([
            'maleCount' => $maleCount,
            'femaleCount' => $femaleCount
        ]);
    }

    public function age()
    {

    }
}

