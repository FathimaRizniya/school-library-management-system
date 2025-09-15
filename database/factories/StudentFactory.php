<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'user_id' => User::factory(),
            'index_number' => $this->faker->unique()->numerify('########'),
            'grade' => rand(5, 13) . $this->faker->randomElement(['A', 'B', 'C']),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'address' => $this->faker->address(),



        ];
    }
}
