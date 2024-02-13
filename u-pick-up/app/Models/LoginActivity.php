<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginActivity extends Model
{   
    protected $table = 'login_students';
    protected $primaryKey = 'id';
    protected $fillable = [
        'student_id',
    ];
    use HasFactory;
}
