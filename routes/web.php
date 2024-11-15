<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Team\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->prefix('dashboard')->name('dashboard.')->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    //Admin Area
    Route::prefix('user')
        ->name('user.')
        ->group(function () {
            //Employees Management
            Route::prefix('employees')->name('employees.')->group(function () {
                Route::get('/', [TeamController::class, 'employees'])->name('index');
                Route::get('/delete/{id}', [TeamController::class, 'employeesDelete'])->name('delete');
                Route::post('save', [TeamController::class, 'employeesSave'])->name('save');
                Route::get('/show/{user}', [TeamController::class, 'employeesShow'])->name('show');
            });
        });

});

require __DIR__.'/auth.php';
