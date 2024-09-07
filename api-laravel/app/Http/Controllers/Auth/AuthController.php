<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only(['name_user', 'password']);

        try {
            if (!$token = auth('api')->attempt($credentials)) {
                throw new \Exception('Usuário ou senha incorreto');
            }

            $user = auth('api')->user();

            return response()->json([
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                    'name_user' => $user->name_user,
                    'group_id' => $user->group_id,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    public function register(Request $request)
    {
        try {
            // Validação dos dados recebidos
            $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|string|email|max:100|unique:users',
                'name_user' => 'required|string|max:100|unique:users',
                'password' => 'required|string|min:5',
            ]);

            // Criação do novo usuário
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'name_user' => $request->name_user,
                'password' => Hash::make($request->password),
                'group_id' => 1, // Definindo o group_id como 1
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Registrado com sucesso!',
                'data' => $user
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao registrar usuário!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Logout realizado com sucesso!']);
    }


    public function refresh()
    {
        $token = JWTAuth::refresh();
        return response()->json(['token' => $token]);
    }

    public function me()
    {
        $user = auth('api')->user();

        return response()->json([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
