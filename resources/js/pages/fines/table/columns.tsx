import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Student } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

// Define the Students type
type TransactionUser = {
    id: number;
    name: string;
    email?: string;
};

type Transaction = {
    id: number;
    user: TransactionUser;
};

type Student = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    address: string;
    transaction: Transaction;
};

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: 'id',
        header: '# ID',

        cell: ({ row }) => {
            return row.original.id;
        },
    },
    {
        accessorFn: (row) => row.transaction?.id,
        id: 'transaction.id',
        header: 'Transaction ID',
        cell: ({ row }) => row.original.transaction?.id || 'N/A',
    },
    {
        accessorFn: (row) => row.transaction.user.id,
        id: 'name',
        header: 'Student Name',

        cell: ({ row }) => {
            return row.original.transaction?.user?.name || 'N/A';
        },
    },

    {
        accessorKey: 'amount',
        header: 'Fine Amount',
    },

    {
        accessorKey: 'paid_amount',
        header: 'Paid Amount',
    },
    {
        accessorKey: 'due_amount',
        header: 'Due Amount',
    },

    {
        accessorKey: 'reason',
        header: 'Reason',
    },

    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;

            const getStatusColor = (status: string) => {
                switch (status.toLowerCase()) {
                    case 'fully paid':
                    case 'paid':
                        return 'text-green-600';
                    case 'partially paid':
                        return 'text-yellow-600';
                    case 'overpaid':
                        return 'text-blue-600';
                    case 'invalid payment':
                        return 'text-orange-600';
                    case 'unpaid':
                    default:
                        return 'text-red-600';
                }
            };

            return (
                <Badge variant="secondary" className="mr-2">
                    <span className={getStatusColor(status)}>{status}</span>
                </Badge>
            );
        },
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const { auth } = usePage().props;
            const rolesCheck = auth.user.roles.map((role: { name: string }) => role.name);
            const { delete: deleteAction } = useForm();
            return (
                <>
                    {rolesCheck.includes('librarian') && (
                        <div>
                            <Link href={route('fines.show', row.original.id)}>
                                <Button variant="link" className="cursor-pointer text-blue-500">
                                    View
                                </Button>
                            </Link>
                            <Link href={route('fines.edit', row.original.id)}>
                                <Button variant="link" className="cursor-pointer text-blue-500">
                                    Make Payment
                                </Button>
                            </Link>
                        </div>
                    )}
                </>
            );
        },
    },
];
