<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\TypeSeeder;
use Database\Seeders\SocialMediaPlatformSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\SocialMediaUserNameSeeder;
use Database\Seeders\FeedBackSeeder;
use Database\Seeders\SubscriptionHistorySeeder;
use Database\Seeders\ProfileWifiInfoSeeder;
use Database\Seeders\ReviewSeeder;
use Database\Seeders\ReviewRatingSeeder;
use Database\Seeders\RatingItemSeeder;

use Database\Seeders\TypeRatingItemsSeeder;
use Database\Seeders\UserRtingItemsSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
        // RoleSeeder::class,
        // TypeSeeder::class,
        // UserSeeder::class,
        // SocialMediaPlatformSeeder::class,
        // SocialMediaUserNameSeeder::class,
        // FeedBackSeeder::class,
        // SubscriptionHistorySeeder::class,
        // ProfileWifiInfoSeeder::class,
        // RatingItemSeeder::class,
        ReviewSeeder::class,
        ReviewRatingSeeder::class,
        // TypeRatingItemsSeeder::class,
        // UserRtingItemsSeeder::class,



       ]);
    }
}
