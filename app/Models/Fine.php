<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'paid_amount',
        'status',
        'reason',
        'paid_at',
    ];

    // Relationship
    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }

    // Accessor for dynamic status (if preferred)
    public function getStatusAttribute(): string
    {
        if ($this->paid_amount < 0) {
            return 'Invalid payment';
        } elseif ($this->paid_amount > $this->amount) {
            return 'Overpaid';
        } elseif ($this->paid_amount > 0 && $this->paid_amount < $this->amount) {
            return 'Partially Paid';
        } elseif ($this->paid_amount == $this->amount) {
            return 'Fully Paid';
        } else {
            return 'Unpaid';
        }
    }

    protected $appends = ['due_amount'];

    public function getDueAmountAttribute()
    {
        return number_format(($this->amount ?? 0) - ($this->paid_amount ?? 0), 2);
    }
}
