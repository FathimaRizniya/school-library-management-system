<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::latest()->get();
        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->validated());
        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {

        return Inertia::render('categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if($category->books()->exists()){
            return redirect()->route('categories.index')->with('error', 'Category cannot be deleted because it has associated books.');
        }else{
            $category->delete();
            return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
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
            'Id',
            'Name',

        ];

        $columns = [
            'id',
            'name',
            // Assuming each user has only one role
        ];




        $pdfName = now()->format('Y-m-d_H-i-s') . '_books-report.pdf';

        return Pdf::loadView('exports.pdf-layout', [
            'title' => 'Categories Report', // Change this to your desired title
            'rows' => $rows,
            'filters' => $filters,
            'headers' => $headers,
            'columns' => $columns,
        ])
            ->setPaper('a4', 'landscape')
            ->stream($pdfName);
    }
}
