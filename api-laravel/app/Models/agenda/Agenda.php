<?php

namespace App\Models\agenda;

use App\Models\contato\Contato;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    use HasFactory;


    protected $fillable = ['name', 'description', 'user_id'];

    // Relacionamento com o usuário (dono da agenda)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacionamento com os contatos da agenda
    public function contacts()
    {
        return $this->hasMany(Contato::class);
    }

    public static function getAgendas($perPage, $search = null)
    {
        $query = self::query();

        if (!empty($search)) {
            $query->where(function($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }


        return $query->paginate($perPage);
    }

    public static function getAgendasWithContacts($userId)
    {

        return self::where('user_id', $userId)
            ->with('contacts')
            ->get();
    }

    public static function getAgendasByUser($userId, $perPage, $search = null)
    {
        $query = self::where('user_id', $userId);

        if (!empty($search)) {
            $query->where(function($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }


        return $query->paginate($perPage);
    }
}
