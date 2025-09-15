<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class ProfileWifiInfo extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileWifiInfoFactory> */
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'password'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
