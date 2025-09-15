import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Password from '@/pages/settings/password';
import { useForm, usePage } from '@inertiajs/react';
import { log } from 'console';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const EditForm = () => {
    const { transaction } = usePage().props;
    console.log(transaction);


    const { data, setData, put, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: transaction?.user?.name || '',
        index_number: transaction?.student?.index_number || '',
        grade: transaction?.student?.grade || '',
        gender: transaction?.student?.gender || '',
        address: transaction?.student?.address || '',
        email: transaction?.user?.email || '',
        phone_number: transaction?.user?.phone_number || '',
        status: transaction?.status || 'borrowed',
        quantity: transaction?.quantity || '1',
        borrowed_at: transaction?.borrowed_at || '',
        due_at: transaction?.due_at || '',
        returned_at: transaction?.returned_at || '',
        renewed_at: transaction?.renewed_at || '',
        lost_at: transaction?.lost_at || '',
        damaged_at: transaction?.damaged_at || '',
        notes: transaction?.notes || '',
        fine: transaction?.fine || '',
    });
    console.log(data);

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

                                    <div className="col-span-2 flex flex-col space-y-2">
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
                                        <span className="text-lg font-bold">{transaction.returned_at}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Due Date:</span>
                                        <span className="text-lg font-bold">{transaction.due_date}</span>
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
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(value) => setData('status', value)} value={data.status} disabled={processing}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="borrowed">Borrowed</SelectItem>
                                <SelectItem value="returned">Returned</SelectItem>
                                <SelectItem value="renewed">Renewed</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                                <SelectItem value="damaged">Damaged</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            required
                            tabIndex={1}
                            autoComplete="quantity"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            disabled={processing}
                            placeholder="Quantity"
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="borrowed_at">Borrowed At</Label>
                        <Input
                            id="borrowed_at"
                            type="date"
                            tabIndex={2}
                            value={data.borrowed_at}
                            onChange={(e) => setData('borrowed_at', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.borrowed_at} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="due_at">Due At</Label>
                        <Input
                            id="due_at"
                            type="date"
                            tabIndex={3}
                            value={data.due_at}
                            onChange={(e) => setData('due_at', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.due_at} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="returned_at">Returned At</Label>
                        <Input
                            id="returned_at"
                            type="date"
                            tabIndex={4}
                            value={data.returned_at}
                            onChange={(e) => setData('returned_at', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.returned_at} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="renewed_at">Renewed At</Label>
                        <Input
                            id="renewed_at"
                            type="date"
                            tabIndex={5}
                            value={data.renewed_at}
                            onChange={(e) => setData('renewed_at', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.renewed_at} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="lost_at">Lost At</Label>
                        <Input
                            id="lost_at"
                            type="date"
                            tabIndex={6}
                            value={data.lost_at}
                            onChange={(e) => setData('lost_at', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.lost_at} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="damaged_at">Damaged At</Label>
                        <Input
                            id="damaged_at"
                            type="date"
                            tabIndex={7}
                            value={data.damaged_at}
                            onChange={(e) => setData('damaged_at', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.damaged_at} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Input
                            id="notes"
                            type="text"
                            tabIndex={8}
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            disabled={processing}
                            placeholder="Notes"
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fine">Fine</Label>
                        <Input
                            id="fine"
                            type="text"
                            tabIndex={9}
                            value={data.fine}
                            onChange={(e) => setData('fine', e.target.value)}
                            disabled={processing}
                            placeholder="Fine"
                        />
                        <InputError message={errors.fine} className="mt-2" />
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
