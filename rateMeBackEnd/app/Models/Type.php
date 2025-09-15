<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Type extends Model
{
    /** @use HasFactory<\Database\Factories\TypeFactory> */
    use HasFactory;

    protected $fillable = ['name'];
     public function users(){
        return $this->hasMany(User::class);
     }

     public function typeRatingItems()
     {
         return $this->belongsToMany(RatingItem::class, 'type_rating_items');
     }
}
