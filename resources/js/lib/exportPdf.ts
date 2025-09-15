interface ExportPdfOptions {
    table: any; // TanStack Table instance
    routeName: string; // Laravel named route
}

export const exportPdf = ({ table, routeName }: ExportPdfOptions) => {
    const filteredRows = table.getFilteredRowModel().rows.map((r: any) => r.original);
    const activeFilters = table.getState().columnFilters;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = route(routeName);

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'rows';
    input.value = JSON.stringify(filteredRows);
    form.appendChild(input);

    const filters = document.createElement('input');
    filters.type = 'hidden';
    filters.name = 'filters';
    filters.value = JSON.stringify(activeFilters);
    form.appendChild(filters);

    const csrf = document.createElement('input');
    csrf.type = 'hidden';
    csrf.name = '_token';
    csrf.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
    form.appendChild(csrf);

    document.body.appendChild(form);
    form.submit();
};
