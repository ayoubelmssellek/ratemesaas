<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('reviews')->insert([
            ['user_id' => 1, 'description' => 'Great place!','created_at' => now()->subDays(10)],
            ['user_id' => 2, 'description' => 'Good food.','created_at' => now()->subDays(9)],
            ['user_id' => 3, 'description' => 'Average service.','created_at' => now()->subDays(8)],
            ['user_id' => 1, 'description' => 'Will visit again!','created_at' => now()->subDays(7)],
            ['user_id' => 2, 'description' => 'Not bad.','created_at' => now()->subDays(6)],
            ['user_id' => 3, 'description' => 'Could be better.','created_at' => now()->subDays(5)],
            ['user_id' => 1, 'description' => 'Excellent experience!','created_at' => now()->subDays(4)],
            ['user_id' => 2, 'description' => 'Loved the desserts.','created_at' => now()->subDays(3)],
            ['user_id' => 3, 'description' => 'Too expensive.','created_at' => now()->subDays(2)],
            ['user_id' => 1, 'description' => 'Loved the ambiance.','created_at' => now()->subDays(1)],
            ['user_id' => 2, 'description' => 'Friendly staff.','created_at' => now()],
            ['user_id' => 3, 'description' => 'Too noisy.','created_at' => now()],
        ]);
    }
}
