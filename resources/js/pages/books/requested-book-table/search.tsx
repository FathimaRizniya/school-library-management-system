import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const Search = ({ table }) => {
    const statuses = ['Pending', 'Approved', 'Rejected'];
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
            </div>
        </div>
    );
};

export default Search
