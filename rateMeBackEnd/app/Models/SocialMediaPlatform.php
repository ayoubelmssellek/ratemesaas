<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SocialMediaUserName;
class SocialMediaPlatform extends Model
{
    /** @use HasFactory<\Database\Factories\SocialMediaPlatformFactory> */
    use HasFactory;
    protected $fillable = [ 'name'];

    public function socialMediaUserNames()
    {
        return $this->hasMany(SocialMediaUserName::class);
    }

}
