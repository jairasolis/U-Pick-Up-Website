<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $table = 'books';
    protected $primaryKey = 'id';
    protected $fillable = [
        'subject_name',
        'year_level',
        'course',
        'available',
        'quantity',
    ];
    use HasFactory;
}
