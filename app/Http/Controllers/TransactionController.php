<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Fine;
use App\Models\Student;
use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::latest()->with(['user', 'book'])->get();


        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $books = Book::all();
        $students = User::with('student')->get();

        return Inertia::render('transactions/create', [
            'books' => $books,
            'students' => $students,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        try {

            $student = Student::where('user_id', $request->user_id)->first();
            if (!$student) {
                return redirect()->back()->withInput()->with('error', 'Student not found');
            }

            $transaction = Transaction::create([
                'user_id' => $student->user->id,
                'book_id' => $request->book_id,
                'due_at' => $request->due_at,
                'borrowed_at' => now(),
                'status' => 'borrowed',
                'notes' => $request->notes,
            ]);

            $book = Book::findOrFail($request->book_id);

            if ($book->available_copies <= 0) {
                return redirect()->back()->withInput()->with('error', 'Book is not available');
            }
            $book->update([
                'available_copies' => $book->available_copies - 1,
            ]);

            return redirect()->route('transactions.index')->with('success', 'Transaction created successfully');
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->route('transactions.index')->with('error', 'Transaction could not be created');
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        // Eager load everything at once (including user.student)
        $transaction->load([
            'user.student', // nested eager loading
            'book',
            'fine',
        ]);


        // dd($transaction);
        return Inertia::render('transactions/show', [
            'transaction' => $transaction,
            'student' => $transaction->user->student,
            'book' => $transaction->book,
            'user' => $transaction->user,
            'fine' => $transaction->fine,
        ]);


    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        // Eager load everything at once (including user.student)
        $transaction->load([
            'user.student', // nested eager loading
            'book',
            'fine',
        ]);

        return Inertia::render('transactions/edit', [
            'transaction' => $transaction,
            'student' => $transaction->user->student,
            'book' => $transaction->book,
            'user' => $transaction->user,
            'fines' => $transaction->fine,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        try {

            $transaction->update([
                'status' => $request->status,
                'due_at' => $request->due_at,
                'notes' => $request->notes,
            ]);

            if ($request->status == 'returned') {
                $transaction->update([
                    'returned_at' => now(),
                ]);
                $book = Book::findOrFail($request->book_id);


                $book->update([
                    'available_copies' => $book->available_copies + 1,
                ]);


            }
            if ($request->status == 'renewed') {
                $transaction->update([
                    'renewed_at' => now(),
                ]);
            }
            if ($request->status == 'lost') {

                $book = Book::find($transaction->book_id);
                $fine = $book->book_price + ($book->book_price * 0.10);

                DB::beginTransaction();
                $fineTransactionId = Fine::create([
                    'amount' => $fine,
                    'reason' => 'Lost Book',
                ]);

                $transaction->update([
                    'lost_at' => now(),
                    'fine_id' => $fineTransactionId->id,
                ]);

                DB::commit();


            }
            if ($request->status == 'damaged') {
                $book = Book::find($transaction->book_id);
                $fine = $book->book_price / 10;

                DB::beginTransaction();
                $fineTransactionId = Fine::create([
                    'amount' => $fine,
                    'reason' => 'Damaged Book',

                ]);

                $transaction->update([
                    'damaged_at' => now(),
                    'fine_id' => $fineTransactionId->id,
                ]);

                DB::commit();


            }
            if ($request->status == 'overdue') {
                $book = Book::find($transaction->book_id);
                $fine = $book->book_price + ($book->book_price * 0.1);
                DB::beginTransaction();
                $fineTransactionId = Fine::create([
                    'amount' => $fine,
                    'reason' => 'Damaged Book',

                ]);

                $transaction->update([
                    'overdue_at' => now(),
                    'fine_id' => $fineTransactionId->id,
                ]);

                DB::commit();

            }

            if ($request->status == 'borrowed') {
                $transaction->update([
                    'borrowed_at' => now(),
                ]);

                $book = Book::findOrFail($request->book_id);

                if ($book->available_copies <= 0) {
                    return redirect()->back()->withInput()->with('error', 'Book is not available');
                }
                $book->update([
                    'quantity' => $book->quantity - 1,
                ]);

            }
            return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully');

        } catch (\Exception $e) {
            return redirect()->route('transactions.index')->with('error', 'Transaction can not be updated');
        }

    }

    public function studentTransactions()
    {
        $transactions = Transaction::where('user_id', auth()->user()->id)->with(['book'])->get();

        return Inertia::render('transactions/student-transactions', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {

        return redirect()->route('transactions.index')->with('success', 'Transaction can not be deleted');
    }

    /**
     * Export books data as PDF.
     */

    public function exportPDF(Request $request)
    {

        try {
            $rows = json_decode($request->input('rows'), true, 512, JSON_THROW_ON_ERROR);
            $filters = json_decode($request->input('filters') ?? '[]', true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            return response()->json(['error' => 'Invalid JSON input.'], 400);
        }


        $headers = [
            'Id',
            'Student Name',
            'Book Title',
            'Status',
            'Borrowed',
            'Due',
            'Returned',
            'Renewed',
            'Lost',
            'Damaged',
            'Notes',
        ];

        $columns = [
            'id',
            'user.name',
            'book.title',
            'status',
            'borrowed_at',
            'due_at',
            'returned_at',
            'renewed_at',
            'lost_at',
            'damaged_at',
            'notes',
        ];

        $columnWidths = [
            'notes' => '100px',
        ];




        $pdfName = now()->format('Y-m-d_H-i-s') . '_books-report.pdf';

        return Pdf::loadView('exports.pdf-layout', [
            'title' => 'Transactions Report', // Change this to your desired title
            'rows' => $rows,
            'filters' => $filters,
            'headers' => $headers,
            'columns' => $columns,
            'columnWidths' => $columnWidths,
        ])
            ->setPaper('a4', 'landscape')
            ->stream($pdfName);
    }
}
