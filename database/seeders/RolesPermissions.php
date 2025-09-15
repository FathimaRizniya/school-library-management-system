<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesPermissions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleLibrarian = Role::create(['name' => 'librarian']);
        $roleStudent = Role::create(['name' => 'student']);

        Permission::create(['name' => 'all']);

        Permission::create(['name' => 'view users']);
        Permission::create(['name' => 'create users']);
        Permission::create(['name' => 'edit users']);
        Permission::create(['name' => 'delete users']);

        Permission::create(['name' => 'view books']);
        Permission::create(['name' => 'create books']);
        Permission::create(['name' => 'edit books']);
        Permission::create(['name' => 'delete books']);

        Permission::create(['name' => 'request books']);

        Permission::create(['name' => 'view students']);
        Permission::create(['name' => 'create students']);
        Permission::create(['name' => 'edit students']);
        Permission::create(['name' => 'delete students']);

        $roleLibrarian->givePermissionTo('all');
        $roleStudent->givePermissionTo('view books');
        $roleStudent->givePermissionTo('request books');


        $roleLibrarian = User::find(1);
        $roleLibrarian->assignRole('librarian');

        $roleStudent = User::find(2);
        $roleStudent->assignRole('student');






    }
}
