<?php

namespace App\Http\Controllers\agenda;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use App\Models\agenda\Agenda;
use App\Models\agenda\AgendaUserPermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('pageSize', 6);
        $search = $request->input('search');

        $agendas = Agenda::getAgendas($perPage, $search);

        $response = [
            'agendas' => $agendas->items(),
            'totalPage' => $agendas->lastPage(),
        ];

        return response()->json($response);
    }

    public  function buscarAgendaporId(Request $request)
    {

        $perPage = $request->input('pageSize', 6);
        $search = $request->input('search');


        $userId = Auth::id();
        $agendas = Agenda::getAgendasByUser($userId, $perPage, $search);

        $response = [
            'agendas' => $agendas->items(),
            'totalPage' => $agendas->lastPage(),
        ];

        return response()->json($response);
    }

    public function agendaCompartilhada()
    {
        $sharedAgendas = AgendaUserPermission::with(['agenda.contacts', 'sharedByUser'])
            ->where('user_id', Auth::id())
            ->get();

        // Formatando os números de telefone dos contatos
        foreach ($sharedAgendas as $sharedAgenda) {
            foreach ($sharedAgenda->agenda->contacts as $contact) {
                $contact->phone = Utils::formatPhone($contact->phone);
            }
        }

        return response()->json($sharedAgendas);
    }

    public function compartilharAgenda(Request $request)
    {
        try {
            // Validação dos dados recebidos
            $request->validate([
                'agenda_id' => 'required|exists:agendas,id',
                'user_id' => 'required|exists:users,id',
                'permission' => 'required|in:read,edit',
            ]);

            $userId = Auth::id();

            // Verifica se o usuário está tentando compartilhar a agenda com ele mesmo
            if ($request->user_id == $userId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Você não pode compartilhar a agenda consigo mesmo, pois ela já é sua.',
                ], 400); // Retorna um status 400 - Bad Request
            }

            // Verifica se a agenda pertence ao usuário logado
            $agenda = Agenda::where('id', $request->agenda_id)
                ->where('user_id', $userId)
                ->first();

            if (!$agenda) {
                return response()->json([
                    'success' => false,
                    'message' => 'Acesso negado! Você não pode compartilhar esta agenda.',
                ], 403);
            }

            // Verifica se a permissão já foi concedida para esse usuário
            $existingPermission = AgendaUserPermission::where('agenda_id', $request->agenda_id)
                ->where('user_id', $request->user_id)
                ->first();

            if ($existingPermission) {
                return response()->json([
                    'success' => false,
                    'message' => 'A agenda já foi compartilhada com este usuário.',
                ], 409);
            }


            $agendaPermission = AgendaUserPermission::create([
                'agenda_id' => $request->agenda_id,
                'user_id' => $request->user_id, // Usuário com quem está sendo compartilhado
                'shared_by' => $userId, // Usuário que está compartilhando
                'permission' => $request->permission,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Agenda compartilhada com sucesso!',
                'data' => $agendaPermission,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao compartilhar a agenda!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:100',
                'description' => 'nullable|string',
            ]);
            $agenda = Agenda::create([
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Agenda criada com sucesso!',
                'data' => $agenda
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar agenda!',
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
