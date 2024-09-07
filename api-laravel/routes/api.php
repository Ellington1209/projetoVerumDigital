<?php


use App\Http\Controllers\agenda\AgendaController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\contato\ContatoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('jwt.auth',)->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('me', [AuthController::class, 'me'])->name('me');

    Route::resource('agendas', AgendaController::class);
    Route::resource('contato', ContatoController::class);
    Route::resource('users', UserController::class);
    Route::get('agenda/compartilhada', [AgendaController::class, 'agendaCompartilhada']);
    Route::get('agenda/por/user', [AgendaController::class, 'buscarAgendaporId']);
    Route::post('compartilhar/agenda', [AgendaController::class, 'compartilharAgenda']);
});
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register']);
