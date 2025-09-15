import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { SearchDatePicker } from '@/components/ui/search-date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthRoles } from '@/hooks/useAuthRoles';
import { exportPdf } from '@/lib/exportPdf';
import { format } from 'date-fns';

const Search = ({ table }) => {
    const { hasRole } = useAuthRoles();
    const statuses = ['Borrowed', 'Returned', 'Overdue', 'Lost', 'Damaged', 'Renewed'];
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
                    placeholder="Search by book name"
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <Input
                    placeholder="Search by name"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <SearchDatePicker
                    selected={
                        table.getColumn('borrowed_at')?.getFilterValue()
                            ? new Date(table.getColumn('borrowed_at')?.getFilterValue() as string)
                            : undefined
                    }
                    text="Search by borrowed date"
                    onChange={(date) => {
                        const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                        table.getColumn('borrowed_at')?.setFilterValue(formatted);
                    }}
                    className="max-w-lg"
                />

                <SearchDatePicker
                    selected={
                        table.getColumn('returned_at')?.getFilterValue()
                            ? new Date(table.getColumn('returned_at')?.getFilterValue() as string)
                            : undefined
                    }
                    text="Search by returned date"
                    onChange={(date) => {
                        const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                        table.getColumn('returned_at')?.setFilterValue(formatted);
                    }}
                    className="max-w-lg"
                />
                <SearchDatePicker
                    selected={
                        table.getColumn('due_at')?.getFilterValue() ? new Date(table.getColumn('due_at')?.getFilterValue() as string) : undefined
                    }
                    text="Search by due date"
                    onChange={(date) => {
                        const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                        table.getColumn('due_at')?.setFilterValue(formatted);
                    }}
                    className="max-w-lg"
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

                {hasRole('librarian') && <Button onClick={() => exportPdf({ table, routeName: 'lib.report.transactions' })}>Export</Button>}
            </div>
        </div>
    );
};

export default Search;
