import { DataTable } from '@/components/table/data-table';

import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './table/columns';
import Search from './table/search';
import AppFlashMessage from '@/components/app-flash-message';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];



export default function Index() {
    AppFlashMessage();
    const { users } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Button className="w-40">
                    <Link href={route('users.create')}>Add User</Link>
                </Button>
                <DataTable columns={columns} data={users as User[]} searchComponent={<Search />} />
            </div>
        </AppLayout>
    );
}
