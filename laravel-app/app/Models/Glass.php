<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Glass extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';

    protected $collection = 'glasses';

    protected $fillable = [
        'name',
    ];
}
