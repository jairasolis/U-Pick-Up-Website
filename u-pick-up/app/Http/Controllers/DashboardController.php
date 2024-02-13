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
}
