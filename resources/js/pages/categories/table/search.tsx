import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthRoles } from '@/hooks/useAuthRoles';
import { exportPdf } from '@/lib/exportPdf';

const Search = ({ table }) => {
    const { hasRole } = useAuthRoles();
    return (
        <div className="flex gap-2">
            <div className="flex items-center gap-2 py-4">
                <Input
                    placeholder="Search by Category Name"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Button
                    onClick={() => {
                        table.resetColumnFilters();
                    }}
                >
                    Reset Filters
                </Button>

                {hasRole('librarian') && <Button onClick={() => exportPdf({ table, routeName: 'lib.report.categories' })}>Export</Button>}
            </div>
        </div>
    );
};

export default Search
