<?php

namespace Database\Seeders;

use App\Models\agenda\Agenda;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Agenda::create([
            'name' => 'Trabalho',
            'description' => 'Agenda de contatos do trabalho',
            'user_id' => 1,
        ]);

        Agenda::create([
            'name' => 'Família',
            'description' => 'Contatos da família',
            'user_id' => 1,
        ]);

        Agenda::create([
            'name' => 'Amigos',
            'description' => 'Agenda contatos de amigos',
            'user_id' => 1,
        ]);
        Agenda::create([
            'name' => 'Tecnologia da Informação',
            'description' => 'Agenda contatos tecnologia',
            'user_id' => 2,
        ]);
        Agenda::create([
            'name' => 'Igreja',
            'description' => 'Agenda contatos de amigos da igreja',
            'user_id' => 3,
        ]);
    }
}
