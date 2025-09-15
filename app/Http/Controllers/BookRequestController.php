<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookRequest;
use App\Http\Requests\StoreBookRequestRequest;
use App\Http\Requests\UpdateBookRequestRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('books/book-request');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(BookRequest $bookRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookRequest $bookRequest)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequestRequest $request, BookRequest $bookRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookRequest $bookRequest)
    {
        //
    }
}
