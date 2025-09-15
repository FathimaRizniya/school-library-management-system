<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn_no' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'cabinet_no' => 'required|string|max:255',
            'rack_no' => 'required|string|max:255',
            'available_copies' => 'required|integer|min:0',
            'publication_year' => 'required|integer|min:1900|max:' . date('Y'),
            'publisher' => 'required|string|max:255',
            'book_price' => 'required|numeric|min:0',
        ];
    }
}
