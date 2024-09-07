<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agenda_user_permissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('agenda_id');
            $table->unsignedBigInteger('user_id'); // Usuário com quem a agenda foi compartilhada
            $table->unsignedBigInteger('shared_by'); // Usuário que compartilhou a agenda (quem fez a ação)
            $table->enum('permission', ['read', 'edit']);
            $table->timestamps();


            $table->foreign('agenda_id')->references('id')->on('agendas')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('shared_by')->references('id')->on('users')->onDelete('cascade'); // Referência ao usuário que compartilhou

            // Prevenir duplicatas (agenda compartilhada uma vez por usuário)
            $table->unique(['agenda_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agenda_user_permissions');
    }
};
