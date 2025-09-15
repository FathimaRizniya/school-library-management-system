import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const BookRequestForm = () => { // requst a book from students
    const { categories = [] } = usePage<{ props: { categories: { id: string; name: string }[] } }>().props;

    const { book } = usePage<{ // book details
        props: {
            book: {
                id: string;
                title: string;
                author: string;
                isbn_no: string;
                category_id: string;
                cabinet_no: string;
                rack_no: string;
                available_copies: string;
                publication_year: string;
                publisher: string;
                book_price: string;
            };
        };
    }>().props;

    const { data, setData, post, processing, errors, reset } = useForm({ // setData-update,
        return_date: '',
        book_id: book.id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('stu.books.storeRequest'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return ( // telwin.css used
        <div> 
            <div className="mt-4 overflow-x-auto">
                <Card className="w-full">
                    <div className="flex flex-col space-y-4">
                        <div className="m-5 grid grid-cols-4 justify-between gap-4">
                            <div className="flex flex-col space-y-2">
                                <span className="text-sm text-gray-600">Book ID:</span>
                                <span className="text-lg font-bold">{book.id}</span>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <span className="text-sm text-gray-600">Book Title:</span>
                                <span className="text-lg font-bold">{book.title}</span>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <span className="text-sm text-gray-600">Book Author:</span>
                                <span className="text-lg font-bold">{book.author}</span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <span className="text-sm text-gray-600">Book Publisher:</span>
                                <span className="text-lg font-bold">{book.publisher}</span>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <span className="text-sm text-gray-600">ISBN No:</span>
                                <span className="text-lg font-bold">{book.isbn_no}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <form className="mt-4 flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="return_date">Return Date</Label>
                        <DatePicker selected={data.return_date} onChange={(val) => setData('return_date', val)} disabled={processing} />

                        <InputError message={errors.return_date} className="mt-2" />
                    </div>
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Request Book
                </Button>
            </form>
        </div>
    );
};

export default BookRequestForm;
