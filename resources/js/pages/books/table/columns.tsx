import { Button } from '@/components/ui/button';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

// Define the Students type
type Books = {
    id: number;
    title: string;
    author: string;
    isbn_no: number;
    // category_id: number;
    cabinet_no: number;
    rack_no: number;
    publication_year: number;
    publisher: string;
    book_price: number;
};
export const columns: ColumnDef<Books>[] = [
    {
        accessorKey: 'title',
        header: 'Title',

        cell: ({ row }) => {
            return row.original.title;
        },
    },
    {
        accessorKey: 'author',
        header: 'Author',

        cell: ({ row }) => {
            return row.original.author;
        },
    },
    {
        accessorKey: 'isbn_no',
        header: 'ISBN No',

        cell: ({ row }) => {
            return row.original.isbn_no;
        },
    },
    {
        // accessorKey: "category_id",
        header: 'Category',

        cell: ({ row }) => {
            return row.original.category.name;
        },
    },
    {
        accessorKey: 'cabinet_no',
        header: 'Cabinet No',

        cell: ({ row }) => {
            return row.original.cabinet_no + ' - ' + row.original.rack_no;
        },
    },
    {
        accessorKey: 'available_copies',
        header: 'Qty',
    },

    {
        accessorKey: 'publication_year',
        header: 'Year',
    },
    {
        accessorKey: 'publisher',
        header: 'Publisher',
    },
    {
        accessorKey: 'book_price',
        header: 'Book Price',

        cell: ({ row }) => {
            return row.original.book_price;
        },
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const { auth } = usePage<{ props: { auth: { user: { roles: { name: string }[] } } } }>().props;
            const rolesCheck = auth.user.roles.map((role: { name: string }) => role.name);
            const { delete: deleteAction } = useForm();


            return (
                <>
                    {rolesCheck.includes('librarian') && (
                        <div>
                            <Link href={route('books.edit', row.original.id)}>
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
                                        deleteAction(route('books.destroy', { id: row.original.id }));
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                    {rolesCheck.includes('student') && (
                        <Link href={route('stu.books.request', row.original.id)}>
                            <Button variant="link" className="cursor-pointer text-blue-500">
                                Request Book
                            </Button>
                        </Link>
                    )}
                </>
            );
        },
    },
];
