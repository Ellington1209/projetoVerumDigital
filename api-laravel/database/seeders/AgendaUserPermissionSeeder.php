<?php

namespace Database\Seeders;

use App\Models\agenda\AgendaUserPermission;
use Illuminate\Database\Seeder;

class AgendaUserPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                'agenda_id' => 1,
                'user_id' => 2,  // Usuário 2
                'shared_by' => 1, // Compartilhado pelo usuário 1
                'permission' => 'read',
            ],
            [
                'agenda_id' => 1,
                'user_id' => 3,  // Usuário 3
                'shared_by' => 1, // Compartilhado pelo usuário 1
                'permission' => 'edit',
            ],
            [
                'agenda_id' => 2,
                'user_id' => 1,  // Usuário 1 (inverso do compartilhamento anterior)
                'shared_by' => 2, // Compartilhado pelo usuário 2
                'permission' => 'edit',
            ],
            [
                'agenda_id' => 2,
                'user_id' => 3,  // Usuário 3
                'shared_by' => 2, // Compartilhado pelo usuário 2
                'permission' => 'edit',
            ],
            [
                'agenda_id' => 3,
                'user_id' => 1,  // Usuário 1
                'shared_by' => 3, // Compartilhado pelo usuário 3
                'permission' => 'read',
            ],
            [
                'agenda_id' => 3,
                'user_id' => 2,  // Usuário 2
                'shared_by' => 3, // Compartilhado pelo usuário 3
                'permission' => 'edit',
            ],
        ];

        // Inserindo os registros na tabela
        foreach ($permissions as $permission) {
            AgendaUserPermission::create($permission);
        }
    }
}
