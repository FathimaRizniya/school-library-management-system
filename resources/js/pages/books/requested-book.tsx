import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';

import AppFlashMessage from '@/components/app-flash-message';
import AppLayout from '@/layouts/app-layout';
import { User, type Book, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './requested-book-table/columns';
import Search from './requested-book-table/search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Requested Books',
        href: '/books/requested-book',
    },
];

export default function RequestedBook() {
    AppFlashMessage();

    const { requestedBooks } = usePage<{ props: { books: Book[] } }>().props;
    const { auth } = usePage<{ props: { auth: { user: User } } }>().props;
    const rolesCheck = auth.user.roles.map((role: { name: string }) => role.name);

    console.log('Requested Books:', requestedBooks);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Requested Books" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {rolesCheck.includes('student') && (
                    <div>
                        <Button className="w-40">
                            <Link href={route('stu.books.index')}>Request Book</Link>
                        </Button>
                    </div>
                )}
                <DataTable columns={columns} data={requestedBooks} searchComponent={<Search />} />
            </div>
        </AppLayout>
    );
}
