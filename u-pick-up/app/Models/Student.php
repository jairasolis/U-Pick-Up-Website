<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Student extends Authenticatable
{
    protected $table = 'students';
    protected $primaryKey = 'id';
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'student_id',
        'program',
        'department',
        'age',
        'gender',
        'email_ad',
        'password',

    ];

    use HasApiTokens, HasFactory;
}
