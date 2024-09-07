<?php

namespace App\Models\agenda;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgendaUserPermission extends Model
{
    use HasFactory;

    protected $fillable = ['agenda_id', 'user_id', 'shared_by', 'permission'];

    // Relacionamento com a agenda
    public function agenda()
    {
        return $this->belongsTo(Agenda::class);
    }

    // Relacionamento com o usuário que recebeu o compartilhamento
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacionamento com o usuário que compartilhou a agenda
    public function sharedByUser()
    {
        return $this->belongsTo(User::class, 'shared_by');
    }
}
