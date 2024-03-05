<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use App\Models\Post;


class Student extends Authenticatable implements CanResetPassword
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

    use HasApiTokens, HasFactory, CanResetPasswordTrait;

    public function getEmailAttribute()
    {
        return $this->attributes['email_ad'];
    }

    public function likes()
    {
        return $this->belongsToMany(Post::class, 'likes', 'student_id', 'post_id');
    }
}
