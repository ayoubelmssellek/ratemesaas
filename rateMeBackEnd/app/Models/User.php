<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Role;
use App\Models\Type;
use App\Models\EmailVerification;
use App\Models\ProfileWifiInfo;
use App\Models\SocialMediaUserName;
use App\Models\Review;
use App\Models\FeedBack;
use App\Models\SubscriptionHistory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject    
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'type_id',
        'status',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

      // JWT methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function emailVerification()
    {
        return $this->hasOne(EmailVerification::class);
    }

    public function subscriptionHistory()
    {
        return $this->hasMany(SubscriptionHistory::class);
    }
    public function profileWifiInfo()
    {
        return $this->hasMany(ProfileWifiInfo::class);
    }

    public function socialMediaUserNames()
    {
        return $this->hasMany(SocialMediaUserName::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }
    public function feedBacks(){
        return $this->hasOne(FeedBack::class);
    }

    public function userRatingItems()
    {
        return $this->belongsToMany(RatingItem::class, 'user_rating_items');
    }
}