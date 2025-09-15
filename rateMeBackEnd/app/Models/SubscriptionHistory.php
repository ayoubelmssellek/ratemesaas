<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class SubscriptionHistory extends Model
{
    /** @use HasFactory<\Database\Factories\SubscriptionHistoryFactory> */
    use HasFactory;
    protected $fillable = ['user_id',  'started_at', 'ends_date', 'is_active','price'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
