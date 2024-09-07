<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(GroupsSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(AgendaSeeder::class);
        $this->call(ContatoSeeder::class);
        $this->call(AgendaUserPermissionSeeder::class);

    }
}
