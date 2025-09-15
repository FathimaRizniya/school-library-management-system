<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookRequestController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FineController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('welcome'))->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
// });

Route::get('dashboard', function () {
    if (auth()->user()->hasRole('librarian')) {
        return redirect()->route('lib.dashboard');
    } elseif (auth()->user()->hasRole('student')) {
        return redirect()->route('stu.dashboard');
    }
    abort(403, 'Unauthorized');
})->name('dashboard')->middleware(['auth', 'verified']);


Route::middleware(['auth', 'role:librarian'])->prefix('/lib')->group(function () {
    // Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('lib.dashboard');
    Route::get('dashboard', [DashboardController::class, 'librarian'])->name('lib.dashboard');
    Route::resource('users', UserController::class);
    Route::resource('students', StudentController::class);
    Route::resource('books', BookController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('transactions', TransactionController::class);
    Route::resource('fines', FineController::class);

    Route::get('requested-books', [BookController::class, 'requestedBooksLibView'])->name('lib.books.requested.view');
    Route::post('books/{books}/request/approve', [BookController::class, 'approveBookRequest'])->name('lib.books.approveBookRequest');
    Route::post('books/{books}/request/reject', [BookController::class, 'rejectBookRequest'])->name('lib.books.rejectBookRequest');

    Route::prefix('reports')->as('lib.report.')->group(function () {
        Route::post('/books/export-pdf', [BookController::class, 'exportPDF'])->name('books');
        Route::post('/students/export-pdf', [StudentController::class, 'exportPDF'])->name('students');
        Route::post('/users/export-pdf', [UserController::class, 'exportPDF'])->name('users');
        Route::post('/categories/export-pdf', [CategoryController::class, 'exportPDF'])->name('categories');
        Route::post('/transactions/export-pdf', [TransactionController::class, 'exportPDF'])->name('transactions');
        Route::post('/fines/export-pdf', [FineController::class, 'exportPDF'])->name('fines');
    });

});

Route::middleware(['auth', 'role:student'])->prefix('/stu')->group(function () {
    // Route::get('dashboard', fn() => Inertia::render('students/dashboard'))->name('stu.dashboard');
    route::get('dashboard', [DashboardController::class, 'student'])->name('stu.dashboard');
    Route::get('books', [BookController::class, 'index'])->name('stu.books.index');
    Route::get('books/{books}/show', [BookController::class, 'show'])->name('stu.books.show');
    Route::get('books/{books}/request', [BookController::class, 'requestBook'])->name('stu.books.request');
    Route::post('books/request', [BookController::class, 'requestBookStore'])->name('stu.books.storeRequest');
    Route::get('books/requested', [BookController::class, 'requestedBooks'])->name('stu.books.requested');
    Route::post('books/{books}/request/cancel', [BookController::class, 'cancelBookRequest'])->name('stu.books.cancelBookRequest');


    Route::get('transactions', [TransactionController::class, 'studentTransactions'])->name('stu.transactions.index');
    Route::get('transactions/{transaction}/show', [TransactionController::class, 'show'])->name('stu.transactions.show');
    Route::get('fines', [FineController::class, 'studentFineShow'])->name('stu.fines.index');
    Route::get('fines/{fine}/show', [FineController::class, 'show'])->name('stu.fines.show');
    Route::get('fines/{fine}/pay', [FineController::class, 'pay'])->name('stu.fines.pay');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
