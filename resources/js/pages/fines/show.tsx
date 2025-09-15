import AppFlashMessage from '@/components/app-flash-message';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fines',
        href: '/Fines',
    },
];

export default function Index() {
    AppFlashMessage();
    const { fine } = usePage<{ props: { student: Student[] } }>().props;
    console.log(fine);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fines" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Button className="w-40">
                    <Link href={route('fines.index')}>Back</Link>
                </Button>

                <div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Fine & Transaction Details</h3>
                            <Button className="w-40">
                                <Link href={route('fines.edit', fine.id)}>Payment</Link>
                            </Button>
                        </div>

                        <div className="mt-4 overflow-x-auto">
                            <Card className="w-full">
                                <div className="flex flex-col space-y-4">
                                    <div className="m-5 grid grid-cols-4 justify-between gap-4">
                                        <div className="flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Fine ID:</span>
                                            <span className="text-lg font-bold">{fine.id}</span>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Transaction ID:</span>
                                            <span className="text-lg font-bold">{fine.transaction.id}</span>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Fine Amount:</span>
                                            <span className="text-lg font-bold">{fine.amount}</span>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Paid Amount:</span>
                                            <span className="text-lg font-bold">{fine.paid_amount}</span>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Due Amount:</span>
                                            <span className="text-lg font-bold">{fine.amount - fine.paid_amount}</span>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Status:</span>
                                            <Badge variant="secondary" className="mr-2">
                                                {fine.status}
                                            </Badge>
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
                                            <span className="text-lg font-bold">{fine.transaction.user.name}</span>
                                        </div>

                                        <div className="col-span-2 flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Email:</span>
                                            <span className="text-lg font-bold">{fine.transaction.user.email}</span>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <span className="text-sm text-gray-600">Phone:</span>
                                            <span className="text-lg font-bold">{fine.transaction.user.phone_number}</span>
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
