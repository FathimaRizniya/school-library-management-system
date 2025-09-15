import { DataTable } from '@/components/table/data-table';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './table/columns';
import { Button } from '@/components/ui/button';
import CreateForm from './partials/create-form';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

export default function Create() {
      
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
              <Button className='w-20'>
                <Link href={route('books.index')}>Back</Link>
                </Button>  

                <CreateForm/>
           
             </div>
        </AppLayout>
    );
}
