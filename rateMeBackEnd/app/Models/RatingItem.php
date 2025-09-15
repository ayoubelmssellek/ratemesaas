<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Type;
use App\Models\ReviewRating;

class RatingItem extends Model
{
    /** @use HasFactory<\Database\Factories\RatingItemFactory> */
    use HasFactory;
    protected $fillable = [ 'name'];

    public function typeRatingItems()
    {
        return $this->belongsToMany(Type::class, 'type_rating_items');
    }

    public function reviews (){
        return $this->hasMany(ReviewRating::class);
    }

    public function userRatingItems()
    {
        return $this->belongsToMany(User::class, 'user_rating_items');
    }

}
