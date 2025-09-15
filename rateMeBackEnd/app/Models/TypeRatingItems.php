<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeRatingItems extends Model
{
    /** @use HasFactory<\Database\Factories\TypeRatingItemsFactory> */
    use HasFactory;

    protected $fillable = ['rating_item_id', 'type_id'];
    protected $hidden = ['pivot'];



}
