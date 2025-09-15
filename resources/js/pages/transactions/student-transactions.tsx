import { DataTable } from '@/components/table/data-table';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './/student-transactions-table/columns';
import { Button } from '@/components/ui/button';
import AppFlashMessage from '@/components/app-flash-message';
import Search from './student-transactions-table/search';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Transactions',
        href: '/student-transactions',
    },
];

export default function StudentTransactions() {
        AppFlashMessage();
    const { transactions } = usePage<{ props: { student: Student[] } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Transactions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
              {/* <Button className='w-40'>
                <Link href={route('transactions.index')}>Back</Link>
                </Button> */}
                <DataTable columns={columns} data={transactions} searchComponent={ <Search/>} />
             </div>
        </AppLayout>
    );
}
