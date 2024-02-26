<?php

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

use Modules\Class\Http\Controllers\ClassController;


Route::prefix('admin/class')->as('admin.class.')->group(function () {
    Route::get('/', [ClassController::class, 'index'])->name('index');
    Route::post('/', [ClassController::class, 'store'])->name('store');
    Route::get('/edit', [ClassController::class, 'edit'])->name('edit');
    Route::put('/', [ClassController::class, 'update'])->name('update');
    Route::delete('/{class}', [ClassController::class, 'destroy'])->name('destroy');
    Route::get('/show', [ClassController::class, 'show'])->name('show');
    Route::get('/{class}/assign-teacher', [ClassController::class, 'assignTeacher'])->name('assign.teacher');
    Route::post('/{class}/assign-teacher', [ClassController::class, 'storeAssignTeacher'])->name('assign.teacher.store');
    Route::get('/{class}/assign-student', [ClassController::class, 'assignStudent'])->name('assign.student');
    Route::post('/{class}/assign-student', [ClassController::class, 'storeAssignStudent'])->name('assign.student.store');
});


