<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::insert([
            [
                'name' => 'Ellington Machado',
                'email' => 'ellington1209@gmail.com',
                'name_user' => 'ellington1209',
                'password' => Hash::make('123456'),
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Usuario1',
                'email' => 'Usuario1@gmail.com',
                'name_user' => 'Usuario1',
                'password' => Hash::make('123456'),
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Usuario2',
                'email' => 'Usuario2@gmail.com',
                'name_user' => 'Usuario2',
                'password' => Hash::make('123456'),
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}
