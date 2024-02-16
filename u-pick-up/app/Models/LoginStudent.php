<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginStudent extends Model
{
    use HasFactory;

    protected $table = 'login_students';

    protected $fillable = [
        'student_id',
        'login_date'
    ];

}
