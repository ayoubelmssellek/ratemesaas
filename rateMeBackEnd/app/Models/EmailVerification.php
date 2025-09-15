<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class EmailVerification extends Model
{
    /** @use HasFactory<\Database\Factories\EmailVerificationFactory> */
    use HasFactory;
    protected $fillable = ['user_id', 'code', 'expires_at', 'purpose'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
