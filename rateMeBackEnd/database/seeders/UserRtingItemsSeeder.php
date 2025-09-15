<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRtingItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_rating_items')->insert([
            ['user_id' => 2, 'rating_item_id' => 6],
            ['user_id' => 2, 'rating_item_id' => 7],
            ['user_id' => 2, 'rating_item_id' => 8],
        ]);
    }
}
