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
                    placeholder="Search by name"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Input
                    placeholder="Search by email"
                    value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <Input
                    placeholder="Search by phone number"
                    value={(table.getColumn('phone_number')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('phone_number')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Button
                    onClick={() => {
                        table.resetColumnFilters();
                    }}
                >
                    Reset Filters
                </Button>

                {hasRole('librarian') && <Button onClick={() => exportPdf({ table, routeName: 'lib.report.users' })}>Export</Button>}
            </div>
        </div>
    );
};

export default Search
