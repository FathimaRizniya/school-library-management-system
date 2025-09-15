<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('isbn_no');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('cabinet_no');
            $table->string('rack_no');
            $table->integer('available_copies');
            $table->integer('publication_year');
            $table->string('publisher');
            $table->integer('book_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
