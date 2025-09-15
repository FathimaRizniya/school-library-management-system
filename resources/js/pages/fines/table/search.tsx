import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthRoles } from '@/hooks/useAuthRoles';
import { exportPdf } from '@/lib/exportPdf';
import { format } from 'date-fns';

const Search = ({ table }) => {
    const { hasRole } = useAuthRoles();
    const statuses = ['Paid', 'Unpaid'];
    return (
        <div className="flex gap-2">
            <div className="flex items-center gap-2 py-4">
                <Input
                    placeholder="Search by id"
                    value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <Input
                    placeholder="Search by Transaction ID"
                    value={(table.getColumn('transaction.id')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('transaction.id')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Input
                    placeholder="Search by Student name"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Select
                    value={(table.getColumn('status')?.getFilterValue() as string) ?? ''}
                    onValueChange={(value) => table.getColumn('status')?.setFilterValue(value)}
                >
                    <SelectTrigger className="max-w-sm">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    onClick={() => {
                        table.resetColumnFilters();
                    }}
                >
                    Reset Filters
                </Button>

                {hasRole('librarian') && <Button onClick={() => exportPdf({ table, routeName: 'lib.report.fines' })}>Export</Button>}
            </div>
        </div>
    );
};

export default Search;
