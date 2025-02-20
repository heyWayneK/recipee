import { useState, useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, SortingState, useSortBy, usePagination, useRowSelection } from "@tanstack/react-table";

interface DataItem {
  [key: string]: any; // Allows for dynamic properties
}

interface DataTableProps {
  data: DataItem[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Dynamically generate columns from the first data item
  const columns: ColumnDef<DataItem>[] = useMemo(() => {
    if (data.length === 0) return []; // Handle empty data case

    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => ({
      accessorKey: key,
      header: key, // Use the key as the header text
    }));
  }, [data]);

  const table = useReactTable({
    data,
    columns, // Use the dynamically generated columns
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    useSortBy: useSortBy(),
    usePagination: usePagination(),
  });

  const selectedRows = useMemo(() => {
    const selectedRowIds = Object.keys(rowSelection);
    return selectedRowIds.map((id) => data.find((item) => item === data[parseInt(id)])); // Corrected selection logic
  }, [rowSelection, data]);

  if (data.length === 0) {
    return <div>No data to display.</div>; // Or a loading indicator
  }

  return (
    <div className="p-4">
      {/* Global Filter */}
      <input type="text" placeholder="Search..." value={globalFilter} onChange={(e) => setGlobalFilter(String(e.target.value))} className="border rounded p-2 mb-4" />
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={header.column.getToggleSortingByColumnProps()}>
                    {header.isSorted ? (header.isSortedDesc ? "▼" : "▲") : ""}
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={row.getIsSelected() ? "bg-gray-100" : ""}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 mr-2">
            Previous
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100">
            Next
          </button>
        </div>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>

      {/* Selected Rows Display (Example) */}
      <div className="mt-4">
        <h3 className="font-bold">Selected Rows:</h3>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre> {/* Display selected data */}
      </div>
    </div>
  );
};

export default DataTable;
