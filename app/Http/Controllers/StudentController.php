<?php

namespace App\Http\Controllers;
use App\Notifications\StudentRegistered;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\User;
use App\Models\Student;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::latest()->with('user')->get();
        return Inertia::render('students/index', [
            'students' => $students

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {

        DB::beginTransaction();
        try {

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone_number' => $request->input('phone_number'),
                'password' => bcrypt($request->input('password')),
            ])->assignRole('student');


            $student = Student::create([
                'user_id' => $user->id,
                'index_number' => $request->input('index_number'),
                'grade' => $request->input('grade'),
                'gender' => $request->input('gender'),
                'address' => $request->input('address'),
            ]);



            DB::commit();
            // $user->notify(new StudentRegistered($request->input('password')));

            return redirect()->route('students.index')->with('success', 'Student created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            dd('Error:', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $student = Student::with('user')->find($student->id);
        // dd($student);
        return Inertia::render('students/edit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        DB::beginTransaction();
        $user = User::find($student->user_id);
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phone_number'),
            'password' => bcrypt($request->input('password')),
        ]);
        $student->update([
            'index_number' => $request->input('index_number'),
            'address' => $request->input('address'),
            'gender'=> $request->input('gender'),
            'grade' => $request->input('grade'),
        ]);

     DB::commit();

        return redirect()->route('students.index')->with('success', 'Student updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Student deleted successfully.');

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
            'Index Number',
            'Name',
            'Email',
            'Phone No',
            'Grade',
            'Gender',
            'Address',
        ];

        $columns = [
            'index_number',
            'user.name',
            'user.email',
            'user.phone_number',
            'grade',
            'gender',
            'address',
        ];




        $pdfName = now()->format('Y-m-d_H-i-s') . '_books-report.pdf';

        return Pdf::loadView('exports.pdf-layout', [
            'title' => 'Students Report', // Change this to your desired title
            'rows' => $rows,
            'filters' => $filters,
            'headers' => $headers,
            'columns' => $columns,
        ])
            ->setPaper('a4', 'landscape')
            ->stream($pdfName);
    }

}
