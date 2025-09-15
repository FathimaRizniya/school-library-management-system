<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\Fine;
use App\Models\Student;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Librarian',
            'email' => 'lib@lms.lk',
        ]);

        User::factory()->asStudent()->create([
            'name' => 'Student',
            'email' => 'stu@lms.lk',
        ]);


        $this->call(RolesPermissions::class);
        Category::factory(10)->create();
        User::factory(20)->withRole('student')->create();
        Book::factory(100)->create();
        Transaction::factory(100)->create();



    }


}
