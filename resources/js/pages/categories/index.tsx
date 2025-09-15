import { DataTable } from '@/components/table/data-table';
import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './table/columns';
import { Button } from '@/components/ui/button';
import AppFlashMessage from '@/components/app-flash-message';
import Search from '../categories/table/search';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function Index() {
        AppFlashMessage();
      const { categories } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
              <Button className='w-40'>
                <Link href={route('categories.create')}>Add Category</Link>
                </Button>
                <DataTable columns={columns} data={categories} searchComponent={ <Search/>} />
             </div>
        </AppLayout>
    );
}
