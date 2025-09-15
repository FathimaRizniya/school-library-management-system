import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import EditForm from './partials/edit-form';
import BookRequestForm from './partials/book-request-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Book Request',
        href: '/book-request',
    },
];

export default function BookRequest() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Request" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Button className="w-20">
                    <Link href="/stu/books">Back</Link>
                </Button>

                <BookRequestForm />
            </div>
        </AppLayout>
    );
}
