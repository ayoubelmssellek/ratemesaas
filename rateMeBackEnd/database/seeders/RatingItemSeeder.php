<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RatingItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rating_items')->insert([
            // Snack
            ['name' => 'Taste'],
            ['name' => 'Freshness'],
            ['name' => 'Packaging'],
            ['name' => 'Price'],
            ['name' => 'Availability'],

            // Restaurant
            ['name' => 'Food Quality'],
            ['name' => 'Service'],
            ['name' => 'Cleanliness'],
            ['name' => 'Ambience'],
            ['name' => 'Value for Money'],

            // Coffee
            ['name' => 'Temperature'],
            ['name' => 'Presentation'],
            ['name' => 'Staff Friendliness'],
            ['name' => 'Speed of Service'],

            // Hotels
            ['name' => 'Room Cleanliness'],
            ['name' => 'Comfort'],
            ['name' => 'Facilities'],
            ['name' => 'Location'],
            ['name' => 'Staff Professionalism'],
        ]);
    }
}
