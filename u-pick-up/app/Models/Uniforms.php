<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uniforms extends Model
{
    protected $table = 'uniform';
    protected $primaryKey = 'id';
    protected $fillable = [
        'uniform_type',
        'available',
        'quantity',
    ];
    use HasFactory;
}
