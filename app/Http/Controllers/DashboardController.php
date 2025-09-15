<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookRequest;
use App\Models\Fine;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function student()
    {
        $user = auth()->user()->load('student');
        $transactionsCount = $user->transactions()->count();
        $requestedBooksCount = $user->requestedBooks()->count();
        $finesCount = $user->transactions()->fines()->count();
        $totalFines = $user->transactions()->whereNotNull('fine_id')->with('fine')->get()->sum(fn($transaction) => $transaction->fine->amount ?? 0);
        $totalPaidFines = $user->transactions()->whereNotNull('fine_id')->with('fine')->get()->sum(fn($transaction) => $transaction->fine->paid_amount ?? 0);
        $totalDueFines = $totalFines - $totalPaidFines;


        //Convert to currency format

        $totalFines = number_format($totalFines, 2);
        $totalPaidFines = number_format($totalPaidFines, 2);
        $totalDueFines = number_format($totalDueFines, 2);





        return Inertia::render('students/dashboard', [
            'user' => $user,
            'transactionsCount' => $transactionsCount,
            'requestedBooksCount' => $requestedBooksCount,
            'finesCount' => $finesCount,
            'totalFines' => $totalFines,
            'totalPaidFines' => $totalPaidFines,
            'totalDueFines' => $totalDueFines,

        ]);

    }

    public function librarian()


    {


        $user = User::findOrFail(auth()->id());

        return Inertia::render('dashboard', [
            'user' => $user,
            'totalUsers' => User::count(),
            'totalStudents' => User::whereHas('student')->count(),
            'totalLibrarians' => User::whereHas('roles', function ($query) {
                $query->where('name', 'librarian');
            })->count(),
            'totalBooks' => Book::count(),
            'totalTransactions' => Transaction::count(),
            'totalRequestedBooks' => BookRequest::count(),
            'totalFines' => number_format(Fine::sum('amount'), 2),
            'totalPaidFines' => number_format(Fine::sum('paid_amount'), 2),
        ]);
    }
}
