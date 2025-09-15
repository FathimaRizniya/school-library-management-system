<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequestRequest;
use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\BookRequest;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\BookRequestApproved;
use App\Notifications\BookRequested;
use App\Notifications\BookRequestReceived;
use App\Notifications\BookRequestRejected;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::latest()->with("category")->get();

        return Inertia::render('books/index', [
            'books' => $books,


        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('books/create', [
            'categories' => $categories,
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {


        try {


            $book = Book::create([
                'title' => $request->input('title'),
                'author' => $request->input('author'),
                'isbn_no' => $request->input('isbn_no'),
                'category_id' => $request->input('category_id'),
                'cabinet_no' => $request->input('cabinet_no'),
                'rack_no' => $request->input('rack_no'),
                'available_copies' => $request->input('available_copies'),
                'publication_year' => $request->input('publication_year'),
                'publisher' => $request->input('publisher'),
                'book_price' => $request->input('book_price'),
            ]);





            return redirect()->route('books.index')->with('success', 'Book created successfully.');
        } catch (\Exception $e) {

            dd('Error:', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $book = Book::findOrFail($id);
            $book->load('category');

            return Inertia::render('books/show', [
                'book' => $book,
            ]);
        } catch (\Exception $e) {
            return redirect()->route('books.index')->with('error', 'Book not found: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        $categories = Category::all();

        return Inertia::render('books/edit', [
            'book' => $book,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {

        try {
            $book->update($request->validated());

            return redirect()->route('books.index')->with('success', 'Book updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('books.index')->with('error', 'Error updating book: ' . $e->getMessage());
        }
    }

    public function requestBook($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return redirect()->route('stu.books.index')->with('error', 'Book not found.');
        }

        return Inertia::render('books/book-request', [
            'book' => $book,
        ]);

    }

    public function requestBookStore(StoreBookRequestRequest $request, Book $book)
    {


        try {
            // Check if the user has already requested this book
            $bookRequest = BookRequest::where('user_id', auth()->user()->id)
                ->where('book_id', $request->book_id)
                ->first();
            if ($bookRequest) {
                return redirect()->route('stu.books.index')->with('error', 'You have already requested this book.');
            }

            $book = Book::findOrFail($request->book_id);
            if ($book->available_copies <= 0) {
                return redirect()->route('stu.books.index')->with('error', 'No available copies of this book.');
            }

            $book->available_copies -= 1;
            $book->save();
            // Create a new book request

            BookRequest::create([
                'user_id' => auth()->user()->id,
                'book_id' => $request->book_id,
                'status' => 'pending',
                'reason' => $request->input('reason'),
                'request_date' => now(),
                'return_date' => $request->input('return_date'),
                'notes' => $request->input('notes'),
            ]);


            // 🔔 Send notification to user
            // auth()->user()->notify(new BookRequested($book));
            // $student = User::find(auth()->user()->id);

            // $librarians = User::role('librarian')->get();
            // foreach ($librarians as $librarian) {
            //     $librarian->notify(new BookRequestReceived($book, $student));
            // }


            return redirect()->route('stu.books.index')->with('success', 'Book requested successfully.');
        } catch (\Exception $e) {
            return redirect()->route('stu.books.index')->with('error', 'Error requesting book: ' . $e->getMessage());
        }
    }

    public function requestedBooks()
    {

        $requestedBooks = BookRequest::where('user_id', auth()->user()->id)->with('book')->get();

        return Inertia::render('books/requested-book', [
            'requestedBooks' => $requestedBooks,
        ]);
    }

    public function adminRequestedBooksView()
    {
        $requestedBooks = BookRequest::with(['book', 'user'])->get();

        return Inertia::render('books/lib-requested-book', [
            'requestedBooks' => $requestedBooks,
        ]);
    }
    public function requestedBooksLibView()
    {
        $requestedBooks = BookRequest::with(['book', 'user'])->get();

        return Inertia::render('books/requested-book', [
            'requestedBooks' => $requestedBooks,
        ]);
    }


    public function approveBookRequest($id)
    {
        try {
            $bookRequest = BookRequest::findOrFail($id);
            $bookRequest->status = 'approved';
            $bookRequest->approval_date = now();
            $bookRequest->save();



            Transaction::create([
                'user_id' => $bookRequest->user_id,
                'book_id' => $bookRequest->book_id,
                'due_at' => $bookRequest->return_date,
                'borrowed_at' => now(),
                'status' => 'borrowed',
            ]);


            // ✅ Notify the student
            // $user = $bookRequest->user;
            // $user->notify(new BookRequestApproved($bookRequest));

            return redirect()->route('lib.books.requested.view')->with('success', 'Book request approved successfully.');
        } catch (\Exception $e) {
            return redirect()->route('lib.books.requested.view')->with('error', 'Error approving book request: ' . $e->getMessage());
        }
    }
    public function rejectBookRequest($id)
    {
        try {
            $bookRequest = BookRequest::findOrFail($id);
            $bookRequest->status = 'rejected';
            $bookRequest->rejection_date = now();
            $bookRequest->save();

            // Restore the book's available copies
            $book = Book::findOrFail($bookRequest->book_id);
            $book->available_copies += 1;
            $book->save();

            // Notify the user
            // $user = $bookRequest->user;
            // $user->notify(new BookRequestRejected($bookRequest));

            return redirect()->route('lib.books.requested.view')->with('success', 'Book request rejected successfully.');
        } catch (\Exception $e) {
            return redirect()->route('lib.books.requested.view')->with('error', 'Error rejecting book request: ' . $e->getMessage());
        }
    }

    public function cancelBookRequest($id)
    {

        try {
            $bookRequest = BookRequest::findOrFail($id);
            $bookRequest->delete();
            $book = Book::findOrFail($bookRequest->book_id);
            $book->available_copies += 1;
            $book->save();

            return redirect()->route('stu.books.requested')->with('success', 'Book request canceled successfully.');
        } catch (\Exception $e) {
            return redirect()->route('stu.books.requested')->with('error', 'Error canceling book request: ' . $e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        try {
            $book->delete();
            return redirect()->route('books.index')->with('success', 'Book deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('books.index')->with('error', 'Error deleting book: ' . $e->getMessage());
        }
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
            'ID',
            'Title',
            'Author',
            'ISBN',
            'Category',
            'Cabinet No',
            'Rack No',
            'Available Copies',
            'Publication Year',
            'Publisher',
            'Book Price'
        ];

        $columns = [
            'id',
            'title',
            'author',
            'isbn_no',
            'category.name',
            'cabinet_no',
            'rack_no',
            'available_copies',
            'publication_year',
            'publisher',
            'book_price'
        ];




        $pdfName = now()->format('Y-m-d_H-i-s') . '_books-report.pdf';

        return Pdf::loadView('exports.pdf-layout', [
            'title' => 'Books Report', // Change this to your desired title
            'rows' => $rows,
            'filters' => $filters,
            'headers' => $headers,
            'columns' => $columns,
        ])
            ->setPaper('a4', 'landscape')
            ->stream($pdfName);
    }



}
