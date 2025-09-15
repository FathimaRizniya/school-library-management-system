import { BookSearchInput } from '@/components/book-search-input';
import InputError from '@/components/input-error';
import { StudentSearchInput } from '@/components/student-search-input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const CreateForm = () => {
    const { students, books } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        book_id: '',
        user_id: '',
        due_at: '',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
    console.log('data', data);
        post(route('transactions.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="student_name">Student Name</Label>

                        <StudentSearchInput

                            students={students}
                            onSelect={(student) => {
                                setData('user_id', student.id);
                            }}
                        />

                        <InputError message={errors.student_id} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="book">Book</Label>
                        <BookSearchInput
                            books={books}
                            onSelect={(book) => {
                                setData('book_id', book.id);
                            }}
                        />
                        <InputError message={errors.book_id} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="due_at">Due Date</Label>
                        <DatePicker selected={data.due_at} onChange={(val) => setData('due_at', val)} disabled={processing} />

                        <InputError message={errors.due_at} className="mt-2" />
                    </div>

                    <div className="grid gap-2 md:col-span-6">
                        <Label htmlFor="notes">Notes</Label>

                        <Textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            disabled={processing}
                            placeholder="Notes"
                            className="mt-2 w-full"
                        />

                        <InputError message={errors.notes} className="mt-2" />
                    </div>
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Add Student
                </Button>
            </form>
        </div>
    );
};

export default CreateForm;
