<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeedBackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('feed_backs')->insert([
            ['user_id' => 1, 'rating' => 5, 'description' => 'Excellent service!'],
            ['user_id' => 2, 'rating' => 4, 'description' => 'Very good experience.'],
        ]);
    }
}
