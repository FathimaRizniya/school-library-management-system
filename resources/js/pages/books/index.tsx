import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';

import AppFlashMessage from '@/components/app-flash-message';
import AppLayout from '@/layouts/app-layout';
import { User, type Book, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './table/columns';
import Search from './table/search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

export default function Index() {
    AppFlashMessage();
    const { books } = usePage<{ props: { books: Book[] } }>().props;
    const { auth } = usePage<{ props: { auth: { user: User } } }>().props;
    const rolesCheck = auth.user.roles.map((role: { name: string }) => role.name);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {rolesCheck.includes('librarian') && (
                    <div>
                        <Button className="w-40">
                            <Link href={route('books.create')}>Add Book</Link>
                        </Button>
                    </div>
                )}
                <DataTable columns={columns} data={books as Book[]} searchComponent={<Search />} />
            </div>
        </AppLayout>
    );
}
