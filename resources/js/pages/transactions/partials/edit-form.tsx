import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const EditForm = () => {
    const { transaction } = usePage().props;

    const { data, setData, put, processing, errors, reset } = useForm<Required<RegisterForm>>({
        user_id: transaction?.user_id || '',
        book_id: transaction?.book_id || '',
        status: transaction?.status || 'borrowed',
        due_at: transaction?.due_at || '',
        notes: transaction?.notes || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('transactions.update', transaction.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div>
            <div>
                <h2 className="text-lg font-bold">Edit Transaction</h2>
                <p className="text-muted-foreground text-sm">Edit the transaction details below.</p>

                <div>
                    <div className="mt-4 overflow-x-auto">
                        <Card className="w-full">
                            <div className="flex flex-col space-y-4">
                                <div className="m-5 grid grid-cols-4 justify-between gap-4">
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Transaction ID:</span>
                                        <span className="text-lg font-bold">{transaction.id}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Book Title:</span>
                                        <span className="text-lg font-bold">{transaction.book.title}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Book Author:</span>
                                        <span className="text-lg font-bold">{transaction.book.author}</span>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Book Publisher:</span>
                                        <span className="text-lg font-bold">{transaction.book.publisher}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Borrowed At:</span>
                                        <span className="text-lg font-bold">{transaction.borrowed_at}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Returned At:</span>
                                        {transaction.returned_at === null ? (
                                            <span className="text-lg font-bold">Not returned yet</span>
                                        ) : (
                                            <span className="text-lg font-bold">{transaction.returned_at}</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Due Date:</span>
                                        <span className="text-lg font-bold">{transaction.due_at}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Status:</span>
                                        <Badge variant="secondary" className="mr-2">
                                            {transaction.status}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Student Name:</span>
                                        <span className="text-lg font-bold">{transaction.user.name}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Index Number:</span>
                                        <span className="text-lg font-bold">{transaction.user.student.index_number}</span>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Email:</span>
                                        <span className="text-lg font-bold">{transaction.user.email}</span>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Phone:</span>
                                        <span className="text-lg font-bold">{transaction.user.phone_number}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <form className="mt-8 flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-4">
                    <div className="grid gap-2 md:col-span-1">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(value) => setData('status', value)} value={data.status} disabled={processing}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="returned">Returned</SelectItem>
                                <SelectItem value="renewed">Renewed</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                                <SelectItem value="damaged">Damaged</SelectItem>
                                <SelectItem value="overdue" disabled={true}>
                                    Overdue
                                </SelectItem>
                                <SelectItem value="borrowed" disabled={true}>
                                    Borrowed
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    {data.status === 'renewed' && (
                        <div className="grid gap-2">
                            <Label htmlFor="due_at">Due Date</Label>
                            <DatePicker selected={data.due_at} onChange={(val) => setData('due_at', val)} disabled={processing} />

                            <InputError message={errors.due_at} className="mt-2" />
                        </div>
                    )}
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

                <Button type="submit" className="mt-2 w-full" tabIndex={10} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Update Transaction
                </Button>
            </form>
        </div>
    );
};

export default EditForm;
