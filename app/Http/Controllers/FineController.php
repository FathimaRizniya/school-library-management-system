<?php

namespace App\Http\Controllers;

use App\Models\Fine;
use App\Http\Requests\StoreFineRequest;
use App\Http\Requests\UpdateFineRequest;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $fines = Fine::latest()
                ->with(['transaction', 'transaction.user'])
                ->get();




            return Inertia('fines/index', [
                'fines' => $fines,
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Error fetching fines: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFineRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Fine $fine)
    {
        try {
            $fine = Fine::with(['transaction', 'transaction.user'])->findOrFail($fine->id);

            return Inertia('fines/show', [
                'fine' => $fine,
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Error fetching fine: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fine $fine)
    {
        try {
            $fine = Fine::with(['transaction', 'transaction.user'])->findOrFail($fine->id);

            return Inertia('fines/edit', [
                'fine' => $fine,
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Error fetching fine: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFineRequest $request, Fine $fine)
    {

        try {
            $fine->update([

                'paid_amount' => $fine->paid_amount + $request->paid_amount,

                'paid_at' => now(),
            ]);

            return redirect()->route('fines.index')->with('success', 'Fine updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Error updating fine: ' . $e->getMessage());
        }
    }


    public function studentFineShow()
    {
        try {
            $fines = Transaction::where('user_id', auth()->user()->id)
                ->where('fine_id', '!=', null)
                ->with(['fine', 'user'])
                ->get();

            return Inertia('fines/student-fine-show', [
                'fines' => $fines,
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Error fetching fines: ' . $e->getMessage());
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fine $fine)
    {
        //
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

        $title = 'Fines Report';

        $headers = [
            'Id',
            'T/n Id',
            'Student Name',
            'Fine Amount',
            'Paid Amount',
            'Due Amount',
            'Reason',
            'Status',
        ];

        $columns = [

            'id',
            'transaction.id',
            'transaction.user.name',
            'amount',
            'paid_amount',
            'due_amount',
            'reason',
            'status',

        ];





        $pdfName = now()->format('Y-m-d_H-i-s') . '_books-report.pdf';

        return Pdf::loadView('exports.pdf-layout', [
            'title' => $title,
            'rows' => $rows,
            'filters' => $filters,
            'headers' => $headers,
            'columns' => $columns,
        ])
            ->setPaper('a4', 'landscape')
            ->stream($pdfName);
    }
}
