<?php

namespace App\Http\Controllers\contato;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use App\Models\agenda\Agenda;
use App\Models\contato\Contato;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContatoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    try {
        $userId = Auth::id();
        $agendas = Agenda::getAgendasWithContacts($userId);

        // Aplica a formatação de telefone
        $agendas->map(function($agenda) {
            $agenda->contacts->map(function($contact) {
                $contact->phone = Utils::formatPhone($contact->phone);
                return $contact;
            });
            return $agenda;
        });

        return response()->json([
            'success' => true,
            'message' => 'Agendas e contatos recuperados com sucesso!',
            'data' => $agendas
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erro ao buscar agendas!',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validação dos dados da requisição
            $request->validate([
                'agenda_id' => 'required|exists:agendas,id',
                'name' => 'required|string|max:255',
                'email' => 'nullable|email',
                'phone' => 'nullable|string|max:20',
                'description' => 'nullable|string',
            ]);

            // Cria um novo contato
            $contato = Contato::create([
                'agenda_id' => $request->agenda_id,
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'description' => $request->description,
            ]);


            return response()->json([
                'success' => true,
                'message' => 'Contato criado com sucesso!',
                'data' => $contato
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar o contato!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            // Validação dos dados da requisição
            $request->validate([
                'agenda_id' => 'required|exists:agendas,id',
                'name' => 'required|string|max:255',
                'email' => 'nullable|email',
                'phone' => 'nullable|string|max:20',
                'description' => 'nullable|string',
            ]);


            $contato = Contato::findOrFail($id);
            $agenda = Agenda::where('id', $contato->agenda_id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$agenda) {
                return response()->json([
                    'success' => false,
                    'message' => 'Acesso negado! Você não tem permissão para editar este contato.',
                ], 403);
            }
            $contato->update([
                'agenda_id' => $request->agenda_id,
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'description' => $request->description,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Contato atualizado com sucesso!',
                'data' => $contato
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar o contato!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $contato = Contato::findOrFail($id);
            $agenda = Agenda::where('id', $contato->agenda_id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$agenda) {
                return response()->json([
                    'success' => false,
                    'message' => 'Acesso negado! Você não tem permissão para excluir este contato.',
                ], 403);
            }
            $contato->delete();
            return response()->json([
                'success' => true,
                'message' => 'Contato excluído com sucesso!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao excluir o contato!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
