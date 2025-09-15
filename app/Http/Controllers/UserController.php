<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->latest()->get();
        return Inertia::render('users/index',[
            'users' => $users
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        return Inertia::render('users/create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phone_number'),
            'password' => bcrypt($request->input('password')),
        ]);
        $user->assignRole($request->input('role'));
        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::with('roles')->findOrFail($id);
        $roles = Role::all();
        return Inertia::render('users/edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {

        $user = User::findOrFail($id);

        $userData = $request->validated();
        if(!empty($userData['password'])){
            $userData['password'] = bcrypt($userData['password']);
        }else{
            unset($userData['password']);
        }

        $user->update($userData);
        $user->syncRoles($request->input('role'));

        return redirect()->route('users.index')->with('success', 'User updated successfully');


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        if ($user->id === 1) {
            return redirect()->route('users.index')->with('error', 'You cannot delete a librarian');
        }
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully');
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
            'Email',
            'Phone Number',
            'Role',
        ];

        $columns = [
            'id',
            'name',
            'email',
            'phone_number',
            'roles.0.name', // Assuming each user has only one role
        ];




        $pdfName = now()->format('Y-m-d_H-i-s') . '_books-report.pdf';

        return Pdf::loadView('exports.pdf-layout', [
            'title' => 'Users Report', // Change this to your desired title
            'rows' => $rows,
            'filters' => $filters,
            'headers' => $headers,
            'columns' => $columns,
        ])
            ->setPaper('a4', 'landscape')
            ->stream($pdfName);
    }

}
