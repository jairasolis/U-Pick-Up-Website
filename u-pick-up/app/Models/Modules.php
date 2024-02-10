<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    protected $table = 'modules';
    protected $primaryKey = 'id';
    protected $fillable = [
        'subject_code',
        'subject_name',
        'year_level',
        'course',
        'available',
        'quantity',
    ];
    use HasFactory;
}
