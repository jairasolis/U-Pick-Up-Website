<?php

namespace App\Http\Controllers;
use App\Models\Student;
use App\Models\LoginActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class DashboardController extends Controller
{
    public function registeredStudentsCount()
    {
        $count = Student::count();
        return response()->json(['count' => $count]);
    }

    public function registeredStudentsPerDepartment()
    {
        $departments = ['CAS', 'CAHS', 'CEA', 'CELA', 'CCJE', 'CITE', 'CMA'];
        $counts = array_fill_keys($departments, 0);

        $studentsCounts = Student::select('department', DB::raw('COUNT(*) as count'))
                        ->whereIn('department', $departments)
                        ->groupBy('department')
                        ->get();

        foreach ($studentsCounts as $count) {
            $counts[$count->department] = $count->count;
        }
                        
        return response()->json(['counts' => $counts]);
    }
    

    public function registeredStudentsPerProgram()
    {
        $programs = ['BSN', 'BSMLS', 'BSPSYCH', 'BSPHARMA', 'BSCE', 'BSCPE', 'BSEE', 'BSECE', 'BSME', 'BSARCH', 
        'AB COMM', 'AB POLSCI', 'BSED - English', 'BSED - Math', 'BSED - Science', 'BSED - Social Studies',
        'BSCRIM', 'BSIT', 'BSA', 'BSAIS', 'BSHM', 'BSMA', 'BSTM', 'BSBA - FM', 'BSBA - MM'];

        $counts = array_fill_keys($programs, 0);

        $studentsCounts = Student::select('program', DB::raw('COUNT(*) as count'))
                        ->whereIn('program', $programs)
                        ->groupBy('program')
                        ->get();

        foreach ($studentsCounts as $count) {
            $counts[$count->program] = $count->count;
        }
                        
        return response()->json(['counts' => $counts]);
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

    public function loginPerDay(){
        $loginActivityPerDay = LoginActivity::select(
            DB::raw('DATE(login_date) as login_date'),
            DB::raw('COUNT(*) as login_count')
        )
        ->groupBy('login_date')
        ->orderBy('login_date', 'desc')
        ->get();
    
        return response()->json(['loginCounts' => $loginActivityPerDay]);
    }
}

