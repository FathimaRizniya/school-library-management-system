<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
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
            'name' => 'required|string',
            'index_number' => 'required|unique:students,index_number',
            'grade' => 'required|string',
            'gender' => 'required|string|in:male,female',
            'email' => 'required|email',
            'phone_number' => 'required|numeric|digits:10',
            'address' => 'required|string',
            'password' => 'required|string',
            
        ];
    }
}
