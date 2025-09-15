<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'due_at' => 'required|date:after_or_equal:today',
            'notes' => 'nullable|string|max:255',

        ];
    }
}
