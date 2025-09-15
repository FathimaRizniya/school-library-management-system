import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { exportPdf } from '@/lib/exportPdf';
import { useAuthRoles } from '../../../hooks/useAuthRoles';

const Search = ({ table }) => {
    const { hasRole } = useAuthRoles();
    return (
        <div className="flex gap-2">
            <div className="flex items-center gap-2 py-4">
                <Input
                    placeholder="Search by title"
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <Input
                    placeholder="Search by Author"
                    value={(table.getColumn('author')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('author')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Input
                    placeholder="Search by ISBN No"
                    value={(table.getColumn('isbn_no')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('isbn_no')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Input
                    placeholder="Search by publisher"
                    value={(table.getColumn('publisher')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('publisher')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Button
                    onClick={() => {
                        table.resetColumnFilters();
                    }}
                >
                    Reset Filters
                </Button>
                {hasRole('librarian') && <Button onClick={() => exportPdf({ table, routeName: 'lib.report.books' })}>Export</Button>}
            </div>
        </div>
    );
};

export default Search
