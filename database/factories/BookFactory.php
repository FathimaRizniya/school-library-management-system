<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name(),
            'isbn_no' => $this->faker->isbn13(),
            'category_id' => Category::inRandomOrder()->value('id') ?? Category::factory(),
            'cabinet_no' => $this->faker->bothify('C##'),
            'rack_no' => $this->faker->bothify('R##'),
            'available_copies' => $this->faker->numberBetween(1, 10),
            'publication_year' => $this->faker->year(),
            'publisher' => $this->faker->company(),
            'book_price' => $this->faker->numberBetween(100, 1000),
        ];
    }
}
