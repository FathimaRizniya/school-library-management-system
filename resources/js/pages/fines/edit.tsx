import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import EditForm from './partials/edit-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fine Payment',
        href: '/fines/payment',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fine Payment" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Button className="w-20">
                    <Link href={route('fines.index')}>Back</Link>
                </Button>

                <EditForm />
            </div>
        </AppLayout>
    );
}
