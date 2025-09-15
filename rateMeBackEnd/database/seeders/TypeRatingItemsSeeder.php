<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeRatingItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_rating_items')->insert([
            ['type_id' => 1, 'rating_item_id' => 6],
            ['type_id' => 1, 'rating_item_id' => 7],
            ['type_id' => 1, 'rating_item_id' => 8],
        ]);
    }
}
