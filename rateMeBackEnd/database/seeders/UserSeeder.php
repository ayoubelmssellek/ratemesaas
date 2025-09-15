<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => '2',
                'status' => 'active',
                'type_id' => null,
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => '1',
                'status' => 'active',
                'type_id' => '1',
            ],
              [
                'name' => 'Admin2',
                'email' => 'admin2@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => '1',
                'status' => 'active',
                'type_id' => '2',
            ]
        ]);
    }
}
