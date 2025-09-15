import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/lib/dashboard',
    },
];

export default function LibrarianDashboard() {
    const { user, totalUsers, totalStudents, totalLibrarians, totalBooks, totalTransactions, totalRequestedBooks, totalFines, totalPaidFines } =
        usePage().props;

    const statCards = [
        { label: 'Total Users', description: 'Number of all users in the system', value: totalUsers, buttonLabel: 'View Users', link: '/lib/users' },
        {
            label: 'Total Students',
            description: 'Number of students registered',
            value: totalStudents,
            buttonLabel: 'View Students',
            link: '/lib/students',
        },
        {
            label: 'Total Librarians',
            description: 'Number of librarians available',
            value: totalLibrarians,
            buttonLabel: 'View Librarians',
            link: '/lib/users',
        },
        { label: 'Total Books', description: 'Total books in the library', value: totalBooks, buttonLabel: 'View Books', link: '/lib/books' },
        {
            label: 'Total Transactions',
            description: 'Total borrowing and returning transactions',
            value: totalTransactions,
            buttonLabel: 'View Transactions',
            link: '/lib/transactions',
        },
        {
            label: 'Requested Books',
            description: 'Books currently requested by students',
            value: totalRequestedBooks,
            buttonLabel: 'View Requests',
            link: '/lib/requested-books',
        },
        {
            label: 'Fines Issued',
            description: 'Total fines issued to students',
            value: `LKR ${totalFines}`,
            buttonLabel: 'View Fines',
            link: '/lib/fines',
        },
        {
            label: 'Fines Paid',
            description: 'Total fines paid by students',
            value: `LKR ${totalPaidFines}`,
            buttonLabel: 'View Payments',
            link: '/lib/fines',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Librarian Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
                <p className="text-muted-foreground">
                    Here’s a quick overview of your library management dashboard. You can manage users, books, transactions, and more.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {statCards.map((stat, idx) => (
                        <Card key={idx} className="flex flex-col justify-between gap-2 p-5">
                            <span className="text-muted-foreground text-lg font-medium">{stat.label}</span>
                            <span className="text-primary text-4xl font-bold">{stat.value}</span>
                            <span className="text-muted-foreground text-sm">{stat.description}</span>
                            <Button asChild>
                                <Link href={stat.link}>{stat.buttonLabel}</Link>
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
