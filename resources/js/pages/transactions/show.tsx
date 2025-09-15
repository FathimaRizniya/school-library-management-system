import AppFlashMessage from '@/components/app-flash-message';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

export default function Index() {
    AppFlashMessage();
    const { transaction } = usePage<{ props: { student: Student[] } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Button className="w-40">
                    <Link href={route('transactions.index')}>Back</Link>
                </Button>

                <div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Transaction Details</h3>
                            <Button className="w-40">
                                <Link href={route('transactions.edit', transaction.id)}>Edit this transaction</Link>
                            </Button>
                        </div>

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
                                            <span className="text-sm text-gray-600">Fine:</span>
                                            {transaction.fine === null ? (
                                                <span className="text-lg font-bold">No Fine</span>
                                            ) : (
                                                <span className="text-lg font-bold">{transaction.fine.amount}</span>
                                            )}
                                        </div>
                                        <div className="col-span-3 flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Note:</span>
                                            {transaction.notes === null ? (
                                                <span className="text-lg font-bold">No notes</span>
                                            ) : (
                                                <span className="text-lg font-bold">{transaction.notes}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Student Details</h3>
                        </div>
                        <div className="mt-4 overflow-x-auto">
                            <Card className="w-full">
                                <div className="flex flex-col space-y-4">
                                    <div className="m-5 grid grid-cols-4 justify-between gap-4">
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
            </div>
        </AppLayout>
    );
}
