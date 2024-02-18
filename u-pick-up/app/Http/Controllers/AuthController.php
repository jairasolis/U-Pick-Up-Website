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
        //debugggg
        // dd($student, $admin);

        $email = trim($request->email);

        if (!$student && !$admin) {
            return response()->json(['message' => 'Email address not found'], 404);
        }
        
        $user = $student !== null ? $student : $admin;
    
        $token = Password::getRepository()->create($user->email);
    
        $resetUrl = 'https://u-pick-up-y7qnw.ondigitalocean.app/api/reset-password?token=' . $token;
        
        Mail::to($request->email)->send(new ResetPasswordMail($resetUrl));
        
        if (count(Mail::failures()) > 0) {
            return response()->json(['message' => 'Unable to send reset link'], 400);
        } else {
            return response()->json(['message' => 'Password reset link sent to email'], 200);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
            'token' => 'required',
        ]);

        $credentials = $request->only('email', 'password', 'password_confirmation', 'token');

        $guard = null;
        $user = null;

        // check if the email belongs to a student
        $student = Student::where('email_ad', $credentials['email'])->first();
        if ($student) {
            $guard = 'students';
            $user = $student;
        }

        // ff not a student, check if the email belongs to an admin
        if (!$user) {
            $admin = Admin::where('email_ad', $credentials['email'])->first();
            if ($admin) {
                $guard = 'admins';
                $user = $admin;
            }
        }

        // if no user found, return error
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // attempt to reset password
        $status = Password::broker($guard)->reset(
            $credentials,
            function ($user, $password) {
                $user->password = bcrypt($password);
                $user->save();
            }
        );

        // check the status of password reset
        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password reset successfully'], 200);
        } else {
            return response()->json(['message' => 'Unable to reset password'], 400);
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
