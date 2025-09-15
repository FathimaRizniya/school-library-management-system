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
        header: 'Id',

        cell: ({ row }) => {
            return row.original.id;
        },
    },


    {
        accessorKey: 'name',
        header: 'Category',
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
                            <Link href={route('categories.edit', row.original.id)}>
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
                                        deleteAction(route('categories.destroy', { id: row.original.id }));
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
