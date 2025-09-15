<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class FeedBack extends Model
{
    /** @use HasFactory<\Database\Factories\FeedBackFactory> */
    use HasFactory;

    protected $fillable = ['user_id','description','rating','is_showen'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
