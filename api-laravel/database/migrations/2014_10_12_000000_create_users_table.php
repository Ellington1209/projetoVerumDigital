<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('group_id');
            $table->string('email')->unique();
            $table->string('name_user')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();



            // Define a chave estrangeira que referencia a tabela groups
            $table->foreign('group_id')->references('id')->on('groups');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
