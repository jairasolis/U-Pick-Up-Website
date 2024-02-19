<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'add_event';
    protected $primaryKey = 'id';
    protected $fillable = [
        'event_title',
        'event_date',
    ];
    use HasFactory;
}
