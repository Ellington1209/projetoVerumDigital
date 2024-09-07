<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContatoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contatos')->insert([
            [
                'agenda_id' => 1,
                'name' => 'João Silva',
                'email' => 'joao.silva@example.com',
                'phone' => '(62) 91234-5678',
                'description' => 'Contato de negócios',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 1,
                'name' => 'Maria Oliveira',
                'email' => 'maria.oliveira@example.com',
                'phone' => '(62) 99876-5432',
                'description' => 'Contato pessoal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 2,
                'name' => 'Carlos Souza',
                'email' => 'carlos.souza@example.com',
                'phone' => '(62) 98765-4321',
                'description' => 'Contato de eventos',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 3,
                'name' => 'Fernanda Lima',
                'email' => 'fernanda.lima@example.com',
                'phone' => '(62) 91234-5678',
                'description' => 'Contato pessoal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 3,
                'name' => 'Roberto Gonçalves',
                'email' => 'roberto.goncalves@example.com',
                'phone' => '(62) 99876-5432',
                'description' => 'Contato de trabalho',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 4,
                'name' => 'Gabriel Costa',
                'email' => 'gabriel.costa@example.com',
                'phone' => '(62) 91234-5678',
                'description' => 'Contato de TI',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 4,
                'name' => 'Sofia Almeida',
                'email' => 'sofia.almeida@example.com',
                'phone' => '(62) 98765-4321',
                'description' => 'Contato de projetos',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 5,
                'name' => 'Pedro Martins',
                'email' => 'pedro.martins@example.com',
                'phone' => '(62) 99876-5432',
                'description' => 'Contato da igreja',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 5,
                'name' => 'Ana Pereira',
                'email' => 'ana.pereira@example.com',
                'phone' => '(62) 91234-5678',
                'description' => 'Contato de estudo bíblico',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agenda_id' => 5,
                'name' => 'José Fernandes',
                'email' => 'jose.fernandes@example.com',
                'phone' => '(62) 98765-4321',
                'description' => 'Contato de missões',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
