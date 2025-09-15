import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthRoles } from '@/hooks/useAuthRoles';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export interface Books {
    id: number;
    book_id: number;
    title: string;
    book: {
        id: number;
        title: string;
        author?: string;
        isbn_no?: string;
    };
    user: {
        id: number;
        name: string;
    };
    request_date?: string;
    approval_date?: string | null;
    rejection_date?: string | null;
    status?: 'approved' | 'rejected' | 'pending';
}

export const columns: ColumnDef<Books>[] = [
    {
        accessorKey: 'id',
        header: 'Req ID',
    },
    {
        accessorKey: 'book_id',
        header: 'Book ID',
        cell: ({ row }) => (
            <span>
                <Link href={route('stu.books.show', row.original.book.id)}>{row.original.book.id}</Link>
            </span>
        ),
    },
    {
        accessorKey: 'title',
        header: 'Book Title',
        accessorFn: (row) => row.book.title,
        cell: ({ row }) => row.original.book.title,
    },
    {
        accessorKey: 'author',
        header: 'Author',
        accessorFn: (row) => row.book.author,
        cell: ({ row }) => row.original.book.author ?? 'N/A',
    },
    {
        accessorKey: 'isbn_no',
        header: 'ISBN No',
        accessorFn: (row) => row.book.isbn_no,
        cell: ({ row }) => row.original.book.isbn_no ?? 'N/A',
    },
    {
        accessorKey: 'request_date',
        header: 'Requested Date',
    },
    {
        id: 'name',
        header: () => {
            const { hasRole } = useAuthRoles();
            return hasRole('librarian') ? 'Requested By' : null;
        },
        cell: ({ row }) => {
            const { hasRole } = useAuthRoles();
            return hasRole('librarian') ? row.original.user.name : null;
        },
    },
    {
        accessorKey: 'approval_date',
        header: 'Approved Date',
        cell: ({ row }) =>
            row.original.approval_date === null || !row.original.approval_date ? (
                <span className="text-red-500">N/A</span>
            ) : (
                <span>{row.original.approval_date}</span>
            ),
    },
    {
        accessorKey: 'rejection_date',
        header: 'Rejected Date',
        cell: ({ row }) =>
            row.original.rejection_date === null || !row.original.rejection_date ? (
                <span className="text-red-500">N/A</span>
            ) : (
                <span>{row.original.rejection_date}</span>
            ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={'secondary'} className="mr-2">
                    {status === 'approved' ? (
                        <span className="text-green-600">Approved</span>
                    ) : status === 'rejected' ? (
                        <span className="text-red-600">Rejected</span>
                    ) : status === 'pending' ? (
                        <span className="text-yellow-600">Pending</span>
                    ) : (
                        'N/A'
                    )}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { hasRole } = useAuthRoles();
            const { delete: deleteAction, post: postAction } = useForm();
            const { post: post } = useForm();

            const handleCancelBookRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                if (confirm('Are you sure you want to cancel this book request?')) {
                    postAction(route('stu.books.cancelBookRequest', { id: row.original.id }));
                }
            };

            return (
                <>
                    {hasRole('librarian') && (
                        <div>
                            <Link href={route('lib.books.approveBookRequest', row.original.id)}>
                                <Button
                                    variant="link"
                                    className="cursor-pointer text-green-500"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!confirm('Are you sure you want to approve this book request?')) {
                                            return;
                                        }
                                        post(route('lib.books.approveBookRequest', { id: row.original.id }));
                                    }}
                                >
                                    Approve
                                </Button>
                            </Link>
                            <Link href={route('lib.books.rejectBookRequest', row.original.id)}>
                                <Button
                                    variant="link"
                                    className="cursor-pointer text-red-500"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!confirm('Are you sure you want to reject this book request?')) {
                                            return;
                                        }
                                        post(route('lib.books.rejectBookRequest', { id: row.original.id }));
                                    }}
                                >
                                    Reject
                                </Button>
                            </Link>
                        </div>
                    )}
                    {hasRole('student') && (
                        <Button variant="link" className="cursor-pointer text-red-500" onClick={handleCancelBookRequest}>
                            Cancel Book Request
                        </Button>
                    )}
                </>
            );
        },
    },
];
