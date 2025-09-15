<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\SocialMediaPlatform;

class SocialMediaUserName extends Model
{
    /** @use HasFactory<\Database\Factories\SocialMediaUserNameFactory> */
    use HasFactory;
    protected $fillable = ['user_id', 'social_media_platform_id', 'username'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function platform()
    {
        return $this->belongsTo(SocialMediaPlatform::class);
    }
}
