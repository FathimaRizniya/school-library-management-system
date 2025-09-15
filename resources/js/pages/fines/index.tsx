import AppFlashMessage from '@/components/app-flash-message';
import { DataTable } from '@/components/table/data-table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns } from './table/columns';
import Search from './table/search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fines',
        href: '/fines',
    },
];

export default function Index() {
    AppFlashMessage();
    const { fines } = usePage().props;
    console.log(fines);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fines" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <Button className="w-40">
                    <Link href={route('fines.create')}>Add Fine</Link>
                </Button> */}
                <DataTable columns={columns} data={fines} searchComponent={<Search />} />
            </div>
        </AppLayout>
    );
}
