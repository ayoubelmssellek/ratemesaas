<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Review;
use App\Models\RatingItem;
class ReviewRating extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewRatingFactory> */
    use HasFactory;
    protected $fillable = ['rating_item_id','review_id','rating'];

    public function review (){
        return $this->belongsTo(Review::class);
    }

    public function RatingItem (){
        return $this->belongsTo(RatingItem::class);
    }
}
