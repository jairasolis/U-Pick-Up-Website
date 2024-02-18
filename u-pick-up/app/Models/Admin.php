<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;

class Admin extends Authenticatable implements CanResetPassword
{
    protected $table = 'admin';
    protected $primaryKey = 'id';
    protected $fillable = [
        'email_ad',
        'username',
        'department',
        'password',
    ];
    use HasApiTokens, HasFactory, CanResetPasswordTrait;
    
    public function getEmailAttribute()
    {
        return $this->attributes['email_ad'];
    }
}
