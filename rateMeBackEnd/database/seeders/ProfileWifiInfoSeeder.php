<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfileWifiInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('profile_wifi_infos')->insert([
            ['user_id' => 1, 'name' => 'Cafe_Wifi', 'password' => 'cafe1234'],
            ['user_id' => 2, 'name' => 'Library_Wifi', 'password' => 'lib2023'],
        ]);
    }
}
