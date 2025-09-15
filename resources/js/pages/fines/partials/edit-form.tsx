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
    const { fine } = usePage<{ props: { fine: { id: number; paid_amount: number; amount: number; status: string } } }>().props;

    const { data, setData, put, processing, errors, reset } = useForm({
        paid_amount: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('fines.update', fine.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div>
            <div>
                <h2 className="text-lg font-bold">Fine Payment</h2>
                <p className="text-muted-foreground text-sm">Pay the fine amount below.</p>

                <div>
                    <div className="mt-4 overflow-x-auto">
                        <Card className="w-full">
                            <div className="flex flex-col space-y-4">
                                <div className="m-5 grid grid-cols-4 justify-between gap-4">
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Paid Amount</span>
                                        <span className="text-lg font-bold">{fine.paid_amount}</span>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Due Amount</span>
                                        <span>{(fine.amount - fine.paid_amount).toFixed(2)}</span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm text-gray-600">Status</span>
                                        <span
                                            className={`text-lg font-bold ${
                                                fine.status === 'Invalid payment'
                                                    ? 'text-red-500'
                                                    : fine.status === 'Overpaid'
                                                    ? 'text-yellow-500'
                                                    : fine.status === 'Partially Paid'
                                                    ? 'text-blue-500'
                                                    : fine.status === 'Fully Paid'
                                                    ? 'text-green-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {fine.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <form className="mt-8 flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-4">
                    <div className="grid gap-2 md:col-span-6">
                        <Label htmlFor="notes">Paid Amount</Label>

                        <Input
                            id="paid_amount"
                            type="number"
                            value={data.paid_amount}
                            onChange={(e) => setData('paid_amount', e.target.value)}
                            disabled={processing}
                            placeholder="Paid Amount"
                            className="mt-2 w-full"
                        />

                        <InputError message={errors.paid_amount} className="mt-2" />
                    </div>
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={10} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Payment
                </Button>
            </form>
        </div>
    );
};

export default EditForm;
