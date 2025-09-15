<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SocialMediaUserNameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('social_media_user_names')->insert([
            ['user_id' => 1, 'social_media_platform_id' => 1, 'username' => 'user1_facebook'],
            ['user_id' => 1, 'social_media_platform_id' => 2, 'username' => 'user1_twitter'],
            ['user_id' => 2, 'social_media_platform_id' => 1, 'username' => 'user2_facebook'],
            ['user_id' => 2, 'social_media_platform_id' => 3, 'username' => 'user2_instagram'],
        ]);
    }
}
