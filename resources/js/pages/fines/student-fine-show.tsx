import AppFlashMessage from '@/components/app-flash-message';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './student-fine-table/columns';
import Search from './student-fine-table/search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fines',
        href: '/fines',
    },
];

export default function StudentFineShow() {
    AppFlashMessage();
    const { fines } = usePage().props;
    console.log(fines);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fines" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <DataTable columns={columns} data={fines} searchComponent={<Search />} />
            </div>
        </AppLayout>
    );
}
