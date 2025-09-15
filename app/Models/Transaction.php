<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [

        'status',
        'fine',
        'due_at',
        'notes',
        'renewed_at',
        'borrowed_at',
        'returned_at',
        'lost_at',
        'damaged_at',
        'overdue_at',
        'due_at',
        'user_id',
        'book_id',
        'fine_id',


    ];

    public function user()
    {
        return $this->belongsTo(User::class);

    }
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function student(){
        return $this->hasOneThrough(Student::class, User::class);
    }

    public function fine()
    {
        return $this->belongsTo(Fine::class);

    }

    public function scopeFines($query)
    {
        return $query->whereNotNull('fine_id');
    }






}


