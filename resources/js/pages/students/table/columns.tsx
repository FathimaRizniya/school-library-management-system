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
        accessorKey: 'index_number',
        header: 'Index',

        cell: ({ row }) => {
            return row.original.index_number;
        },
    },
    {
        accessorFn: (row) => row.user.name,
        id: 'name',
        header: 'Name',
        cell: ({ row }) => row.original.user.name,
    },
    {
        accessorFn: (row) => row.user.email,
        id: 'email',
        header: 'Email',

        cell: ({ row }) => {
            return row.original.user.email;
        },
    },
    {
        accessorFn: (row) => row.user.phone_number,
        id: 'phone_number',
        header: 'Phone Number',

        cell: ({ row }) => {
            return row.original.user.phone_number;
        },
    },
    {
        accessorKey: 'address',
        header: 'Address',
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
                            <Link href={route('students.edit', row.original.id)}>
                                <Button variant="link" className="cursor-pointer text-blue-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant="link"
                                className="cursor-pointer text-red-500"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm('Are you sure you want to delete this book?')) {
                                        deleteAction(route('students.destroy', { id: row.original.id }));
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    )}

                </>
            );
        },
    },
];
