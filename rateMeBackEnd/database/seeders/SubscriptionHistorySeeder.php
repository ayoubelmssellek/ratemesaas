<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubscriptionHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subscription_histories')->insert([
            ['user_id' => 3, 'started_at' => '2023-01-01', 'ends_at' => '2023-12-31', 'price' => 24000 , 'is_active' => false],
            ['user_id' => 2,  'started_at' => '2023-06-01', 'ends_at' => '2024-05-31', 'price' => 23600, 'is_active' => true],
        ]);
    }
}
