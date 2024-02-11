<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookStoreRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subject_name' => 'required|string|max:255',
            'year_level' => 'required|integer|min:1',
            'course' => 'required|string|max:255',
            'available' => 'required|integer|min:0',
            'quantity' => 'required|integer|min:0',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'subject_name.required' => 'The subject name field is required.',
            'year_level.required' => 'The year level field is required.',
            'course.required' => 'The course field is required.',
            'available.required' => 'The available field is required.',
            'quantity.required' => 'The quantity field is required.',
        ];
    }
}