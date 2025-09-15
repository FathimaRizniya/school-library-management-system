<?php

namespace App\Notifications;

use App\Models\BookRequest;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookRequestApproved extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public BookRequest $bookRequest)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $book = $this->bookRequest->book;

        return (new MailMessage)
            ->subject('Your Book Request is Approved!')
            ->greeting('Hi ' . $notifiable->name . ',')
            ->line('Your request for the book "' . $book->title . '" has been approved.')
            ->line('Please collect it from the library.')
            ->line('Due date for return: ' . Carbon::parse($this->bookRequest->return_date)->format('Y-m-d'))
            ->action('View Your Requests', url('/stu/books/requested'))
            ->line('Thank you for using our library!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
