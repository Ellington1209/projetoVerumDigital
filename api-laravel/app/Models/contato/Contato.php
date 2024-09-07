<?php

namespace App\Models\Contato;

use App\Models\agenda\Agenda;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contato extends Model
{
    use HasFactory;


    protected $fillable = [
        'agenda_id',
        'name',
        'email',
        'phone',
        'description'
    ];

    // Definir relacionamento com a agenda
    public function agenda()
    {
        return $this->belongsTo(Agenda::class);
    }
}
