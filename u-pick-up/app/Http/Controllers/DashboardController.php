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
        $under18Count = Student::where('age', '<', 18)->count();
        $age18to25Count = Student::whereBetween('age', [18, 25])->count();
        $age26to35Count = Student::whereBetween('age', [26, 35])->count();
        $above35Count = Student::where('age', '>', 35)->count();

        return response()->json([
            'under18Count' => $under18Count,
            'age18to25Count' => $age18to25Count,
            'age26to35Count' => $age26to35Count,
            'above35Count' => $above35Count
        ]);
    }
}

