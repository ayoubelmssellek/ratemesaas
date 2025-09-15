<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRatingItems extends Model
{
    /** @use HasFactory<\Database\Factories\UserRtingItemsFactory> */
    use HasFactory;

    protected $fillable = ['user_id','rating_item_id','rating'];
}
