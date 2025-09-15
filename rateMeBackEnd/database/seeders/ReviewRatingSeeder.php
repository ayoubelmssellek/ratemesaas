<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewRatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('review_ratings')->insert([
            ['review_id' => 1, 'rating_item_id' => 1, 'rating' => 5, 'created_at' => now()->subDays(10)],
            ['review_id' => 1, 'rating_item_id' => 2, 'rating' => 4, 'created_at' => now()->subDays(10)],
            ['review_id' => 2, 'rating_item_id' => 1, 'rating' => 4, 'created_at' => now()->subDays(9)],
            ['review_id' => 2, 'rating_item_id' => 2, 'rating' => 5, 'created_at' => now()->subDays(9)],
            ['review_id' => 3, 'rating_item_id' => 1, 'rating' => 3, 'created_at' => now()->subDays(8)],
            ['review_id' => 3, 'rating_item_id' => 2, 'rating' => 3, 'created_at' => now()->subDays(8)],
            ['review_id' => 4, 'rating_item_id' => 1, 'rating' => 5, 'created_at' => now()->subDays(7)],
            ['review_id' => 4, 'rating_item_id' => 2, 'rating' => 4, 'created_at' => now()->subDays(7)],
            ['review_id' => 5, 'rating_item_id' => 1, 'rating' => 4, 'created_at' => now()->subDays(6)],
            ['review_id' => 5, 'rating_item_id' => 2, 'rating' => 4, 'created_at' => now()->subDays(6)],
            ['review_id' => 6, 'rating_item_id' => 1, 'rating' => 2, 'created_at' => now()->subDays(5)],
            ['review_id' => 6, 'rating_item_id' => 2, 'rating' => 3, 'created_at' => now()->subDays(5)],
            ['review_id' => 7, 'rating_item_id' => 1, 'rating' => 5, 'created_at' => now()->subDays(4)],
            ['review_id' => 7, 'rating_item_id' => 2, 'rating' => 5, 'created_at' => now()->subDays(4)],
            ['review_id' => 8, 'rating_item_id' => 1, 'rating' => 4, 'created_at' => now()->subDays(3)],
            ['review_id' => 8, 'rating_item_id' => 2, 'rating' => 4, 'created_at' => now()->subDays(3)],
            ['review_id' => 9, 'rating_item_id' => 1, 'rating' => 2, 'created_at' => now()->subDays(2)],
            ['review_id' => 9, 'rating_item_id' => 2, 'rating' => 2, 'created_at' => now()->subDays(2)],
            ['review_id' => 10, 'rating_item_id' => 1, 'rating' => 5, 'created_at' => now()->subDays(1)],
            ['review_id' => 10, 'rating_item_id' => 2, 'rating' => 4, 'created_at' => now()->subDays(1)],
            ['review_id' => 11, 'rating_item_id' => 1, 'rating' => 4, 'created_at' => now()],
            ['review_id' => 11, 'rating_item_id' => 2, 'rating' => 5, 'created_at' => now()],
            ['review_id' => 12, 'rating_item_id' => 1, 'rating' => 3, 'created_at' => now()],
            ['review_id' => 12, 'rating_item_id' => 2, 'rating' => 2, 'created_at' => now()],
            ['review_id' => 9, 'rating_item_id' => 1, 'rating' => 2, 'created_at' => now()->subDays(2)],
            ['review_id' => 9, 'rating_item_id' => 2, 'rating' => 2, 'created_at' => now()->subDays(2)],
        ]);
    }
}
