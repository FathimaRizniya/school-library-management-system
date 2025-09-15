import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { user, transactionsCount, requestedBooksCount, finesCount, totalFines, totalPaidFines, totalDueFines } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card className="size-full p-5">
                        <span className="text-2xl">Hey {user.name} 👋,</span>
                        <span className="text-muted-foreground text-md">
                            Welcome to your Library Management System dashboard! Here you can view your borrowed books, due dates, and manage your
                            library activities.
                        </span>
                    </Card>
                    <Card className="size-full p-5">
                        <span className="text-2xl">Your Details</span>
                        <span className="text-muted-foreground text-md">
                            <table className="w-full">
                                <tbody className="grid gap-2">
                                    <tr className="flex w-full gap-4">
                                        <td className="w-1/6 font-bold">Name:</td>
                                        <td className="flex-1">{user.name}</td>
                                    </tr>
                                    <tr className="flex w-full gap-4">
                                        <td className="w-1/6 font-bold">Email:</td>
                                        <td className="flex-1">{user.email}</td>
                                    </tr>
                                    <tr className="flex w-full gap-4">
                                        <td className="w-1/6 font-bold">Phone:</td>
                                        <td className="flex-1">{user.phone_number}</td>
                                    </tr>
                                    <tr className="flex w-full gap-4">
                                        <td className="w-1/6 font-bold">Address:</td>
                                        <td className="flex-1">{user.student.address}</td>
                                    </tr>
                                    <tr className="flex w-full gap-4">
                                        <td className="w-1/6 font-bold">Index No:</td>
                                        <td className="flex-1">{user.student.index_number}</td>
                                    </tr>
                                    <tr className="flex w-full gap-4">
                                        <td className="w-1/6 font-bold">Grade:</td>
                                        <td className="flex-1">{user.student.grade}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                    </Card>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card className="flex size-full flex-col items-start p-5">
                        <span className="mb-2 text-2xl">Transactions</span>
                        <span className="text-primary text-4xl font-bold">{transactionsCount}</span>
                        <span className="text-muted-foreground mt-1 text-sm">Total number of transactions with the library.</span>

                        <Link href={route('stu.transactions.index')} className="mt-2 w-full cursor-pointer">
                            <Button className="w-full">
                                <span className="cursor-pointer text-sm">View Transactions</span>
                            </Button>
                        </Link>
                    </Card>
                    <Card className="flex size-full flex-col items-start p-5">
                        <span className="mb-2 text-2xl">Requested Books</span>
                        <span className="text-primary text-4xl font-bold">{requestedBooksCount}</span>
                        <span className="text-muted-foreground mt-1 text-sm">Total number of books you have requested from the library.</span>
                        <Link href={route('stu.books.requested')} className="mt-2 w-full cursor-pointer">
                            <Button className="w-full">
                                <span className="cursor-pointer text-sm">View Requested Books</span>
                            </Button>
                        </Link>
                    </Card>

                    <Card className="col-span-2 flex size-full flex-col items-start gap-4 p-5">
                        <span className="mb-2 text-2xl">Fines Overview</span>
                        <span className="text-muted-foreground -mt-4 text-sm">Track your outstanding and paid fines here.</span>

                        <div className="flex w-full items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-bold">
                                    {totalFines} <span className="text-base font-medium">LKR</span>
                                </span>
                                <span className="text-muted-foreground text-md">Total Fines</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-bold">
                                    {totalDueFines} <span className="text-base font-medium">LKR</span>
                                </span>
                                <span className="text-muted-foreground text-md">Due Fines</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-bold">
                                    {totalPaidFines} <span className="text-base font-medium">LKR</span>
                                </span>
                                <span className="text-muted-foreground text-md">Paid Fines</span>
                            </div>
                        </div>

                        <div className="flex w-full items-end justify-between">
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-bold">
                                    {finesCount} <span className="text-base font-medium">fines</span>
                                </span>
                                <span className="text-muted-foreground text-md">Total Fines Issued</span>
                            </div>

                            <div className="">
                                <Link href={route('stu.fines.index')} className="mt-2 w-full cursor-pointer">
                                    <Button className="w-full">
                                        <span className="cursor-pointer text-sm">View Fines</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
