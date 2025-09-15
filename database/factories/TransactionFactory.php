<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Fine;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::whereHas('student')->inRandomOrder()->value('id') ?? User::factory(),
            'book_id' => Book::inRandomOrder()->value('id') ?? Book::factory()->create()->id,
            // 'fine_id' => Fine::inRandomOrder()->value('id') ?? Fine::factory()->create()->id,
            'status' => $this->faker->randomElement(['borrowed', 'returned', 'renewed', 'overdue', 'lost', 'damaged']),
            'quantity' => $this->faker->numberBetween(1, 3),
            'borrowed_at' => $this->faker->date(),
            'due_at' => $this->faker->optional()->date(),
            'returned_at' => $this->faker->optional()->date(),
            'renewed_at' => $this->faker->optional()->date(),
            'lost_at' => $this->faker->optional()->date(),
            'damaged_at' => $this->faker->optional()->date(),
            'notes' => $this->faker->optional()->sentence(),
            // 'fine' => $this->faker->optional()->randomFloat(2, 0, 100),
        ];

    }
}
