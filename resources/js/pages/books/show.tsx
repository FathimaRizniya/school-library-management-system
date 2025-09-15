import AppFlashMessage from '@/components/app-flash-message';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

export default function Show() {
    AppFlashMessage();
    const { book } = usePage().props;
    console.log(book);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Button className="w-40">
                    <Link href={route('stu.books.requested')}>Back</Link>
                </Button>

                <div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Book Details</h3>
                        </div>

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
