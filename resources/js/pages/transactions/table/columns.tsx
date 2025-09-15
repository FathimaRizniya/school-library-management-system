import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Student } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

// Define the Students type
type Students = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    address: string;
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
        accessorFn: (row) => row.book.title,
        id: 'title',
        header: 'Book Name',
        cell: ({ row }) => row.original.book.title,
    },
    {
        accessorFn: (row) => row.user.name,
        id: 'name',
        header: 'Borrowed By',

        cell: ({ row }) => {
            return row.original.user.name;
        },
    },
    {
        accessorKey: 'borrowed_at',
        header: 'Borrowed At',
    },
    {
        accessorKey: 'returned_at',
        header: 'Returned At',

        cell: ({ row }) => {
            const returnedAt = row.original.returned_at;
            return returnedAt === null ? <span className="text-red-500">Not returned yet</span> : <span>{returnedAt}</span>;
        },
    },

    {
        accessorKey: 'due_at',
        header: 'Due Date',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={'secondary'} className="mr-2">
                    {status === 'returned' ? (
                        <span className="text-green-600">Returned</span>
                    ) : status === 'lost' ? (
                        <span className="text-red-600">Lost</span>
                    ) : status === 'damaged' ? (
                        <span className="text-yellow-600">Damaged</span>
                    ) : status === 'borrowed' ? (
                        <span className="text-blue-600">Borrowed</span>
                    ) : status === 'overdue' ? (
                        <span className="text-orange-600">Overdue</span>
                                    ) : status === 'renewed' ? (
                        <span className="text-purple-600">Renewed</span>
                    ): null}
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
                            <Link href={route('transactions.show', row.original.id)}>
                                <Button variant="link" className="cursor-pointer text-blue-500">
                                    View
                                </Button>
                            </Link>
                            <Link href={route('transactions.edit', row.original.id)}>
                                <Button variant="link" className="cursor-pointer text-blue-500">
                                    Edit
                                </Button>
                            </Link>
                            {/* <Button
                                variant="link"
                                className="cursor-pointer text-red-500"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm('Are you sure you want to delete this book?')) {
                                        deleteAction(route('transactions.destroy', { id: row.original.id }));
                                    }
                                }}
                            >
                                Delete
                            </Button> */}
                        </div>
                    )}
                </>
            );
        },
    },
];
