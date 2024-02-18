<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\PasswordReset;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class AuthController extends Controller
{
    // student registration and login
    public function studentRegistration(Request $request){
        $validator = Validator::make($request->all(),[
            'first_name' => 'required',
            'middle_name' => 'required',
            'last_name' => 'required',
            'student_id' => 'required|unique:students',
            'program' => 'required',
            'department' => 'required',
            'age' => 'required',
            'gender' => 'required',
            'email_ad' => 'required|email|unique:students',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|same:password'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Registration failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $student = DB::transaction(function () use ($request) {
            return Student::create([
                'first_name'=> $request->first_name,
                'middle_name'=> $request->middle_name,
                'last_name'=> $request->last_name,
                'student_id'=> $request->student_id,
                'program'=> $request->program,
                'department'=> $request->department,
                'age'=> $request->age,
                'gender'=> $request->gender,
                'email_ad'=> $request->email_ad,
                'password'=> Hash::make($request->password),
            ]);
        });

        return response()->json([
            'message' => 'Registration successful',
            'data' => $student
        ], 200);

    }

    public function studentCheckId($student_id){
        $studentIdExists = Student::where('student_id', $student_id)->exists();
        if ($studentIdExists) {
            return response()->json([
                'message' => 'Student ID not available'
            ], 409);
        } else {
            return response()->json([
                'message' => 'Student ID available'
            ], 200);
        }
    }
    public function studentEmailCheck($email_ad){
        $emailExists = Student::where('email_ad', $email_ad)->exists();
        if ($emailExists) {
            return response()->json([
                'message' => 'Email not available'
            ], 409);
        } else {
            return response()->json([
                'message' => 'Email available'
            ], 200);
        }
    }
    


    public function studentLogin(Request $request){
        $validator = Validator::make($request->all(),[
            'student_id' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Login failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $student = Student::where('student_id', $request->student_id)->first();

        if($student){
            if(Hash::check($request->password, $student->password)){
                $token = $student->createToken("student-auth-token")->plainTextToken;
                return response()->json([
                    'message' => 'Login successful',
                    'token' => $token,
                    'data' => $student
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }
        }else{
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
    }

    //
    public function sendResetLinkEmail(Request $request){
        $request->validate(['email' => 'required|email']);
        
        $student = Student::where('email_ad', $request->email)->first();
        $admin = Admin::where('email_ad', $request->email)->first();
    
        $email = trim($request->email);
    
        if (!$student && !$admin) {
            return response()->json(['message' => 'Email address not found'], 404);
        }
    
        $user = $student !== null ? $student : $admin;
    
        // Generate the token
        $token = Str::random(60); // Generate a random token
    
        // Store the token in the database
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            ['token' => $token, 'created_at' => now()]
        );
    
        $resetUrl = "https://seal-app-zyofc.ondigitalocean.app/reset-password/$token";
    
        try {
            Mail::to($request->email)->send(new ResetPasswordMail($resetUrl));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unable to send reset link', 'error' => $e->getMessage()], 400);
        }
    
        return response()->json(['message' => 'Password reset link sent to email', 'token' => $token], 200);
    }

    
    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'email_ad' => 'required|email',
                'password' => 'required|min:6|confirmed',
                'token' => 'required',
            ]);

            $credentials = $request->only('email_ad', 'password', 'password_confirmation', 'token');

            $student = Student::where('email_ad', $credentials['email_ad'])->first();

            if (!$student) {
                $admin = Admin::where('email_ad', $credentials['email_ad'])->first();
            }

            $user = $student ?? $admin;

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $passwordReset = DB::table('password_reset_tokens')
                ->where('email', $credentials['email_ad'])
                ->where('token', $credentials['token'])
                ->first();

            if (!$passwordReset || Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) {
                return response()->json(['message' => 'Invalid or expired token'], 400);
            }

            $user->password = bcrypt($credentials['password']);
            $user->save();

            // Delete the password reset token
            DB::table('password_reset_tokens')
                ->where('email', $credentials['email_ad'])
                ->delete();

            return response()->json(['message' => 'Password reset successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    // admin registration and login
    public function adminRegistration(Request $request){
        $validator = Validator::make($request->all(),[
            'email_ad' => 'required|email|unique:admin',
            'username' => 'required|unique:admin',
            'department' => 'required',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|same:password'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Registration failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $admin = DB::transaction(function () use ($request) {
            return Admin::create([
                'email_ad'=> $request->email_ad,
                'username'=> $request->username,
                'department'=> $request->department,
                'password'=> Hash::make($request->password),
            ]);
        });

        return response()->json([
            'message' => 'Registration successful',
            'data' => $admin
        ], 200);

    }

    public function adminUsernameCheck($username){
        $adminUsernameExists = Admin::where('username', $username)->exists();
        if ($adminUsernameExists) {
            return response()->json([
                'message' => 'Username not available'
            ], 409);
        } else {
            return response()->json([
                'message' => 'Username ID available'
            ], 200);
        }
    }
    public function adminEmailCheck($email_ad){
        $adminEmailExists = Admin::where('email_ad', $email_ad)->exists();
        if ($adminEmailExists) {
            return response()->json([
                'message' => 'Email not available'
            ], 409);
        } else {
            return response()->json([
                'message' => 'Email available'
            ], 200);
        }
    }

    public function adminLogin(Request $request){
        $validator = Validator::make($request->all(),[
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Login failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::where('username', $request->username)->first();

        if($admin && Hash::check($request->password, $admin->password)){
            $token = $admin->createToken("admin-auth-token")->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'data' => $admin
            ], 200);
        }else{
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
    }

    //logout user
    public function logout(Request $request){
        if($request->user()->currentAccessToken()->delete()){
            return response()->json([
                'message' => 'Logout successful',
            ], 200);
        }else{
            return response()->json([
                'message' => 'Unauthorized logout attempt'
            ], 401);
        }
    }


}
