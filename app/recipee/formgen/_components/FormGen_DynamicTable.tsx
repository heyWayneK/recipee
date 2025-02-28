"use client";

import type React from "react";
import { useState, useMemo, Suspense } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as Checkbox from "@radix-ui/react-checkbox";
import Loading from "@/components/Loading";
import { splitTextOnCapitals } from "@/libs/utils";
import { DynamicTableProps } from "@/app/recipee/formgen/_types/formGen_types";
import { SortDirection } from "@tanstack/react-table";

/**
 * DynamicTable: Dynamically create a sortable table, filterable table for the VIEW and EDIT page.
 * Allow for multiselect if there is an ID column.
 * @param param0
 * @returns
 */
// export const DynamicTable: React.FC<DynamicTableProps> = ({ data, onRowSelect, onAction, showForm, handleToggleForm }) => {
export const DynamicTable: React.FC<DynamicTableProps> = ({ data, onAction, handleToggleForm }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null);
  const [filterText, setFilterText] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const headers = useMemo(() => {
    if (data.length === 0) return [];
    const keys = Object.keys(data[0]);
    return keys;
  }, [data]);

  // CHECK IF ID COLUMN EXISTS (for sorting and filtering)
  const hasIdColumn = headers.includes("id");

  // console.log("DynamicTable++++++++++", hasIdColumn);
  const sortedAndFilteredData = useMemo(() => {
    let result = [...data];

    // Apply filtering
    if (filterText) {
      result = result.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(filterText.toLowerCase())));
    }

    // Apply sorting
    if (sortColumn && sortDirection) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, filterText, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
      if (sortDirection === "desc") {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedRows.length === sortedAndFilteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedAndFilteredData.map((row) => row.id));
    }
  };

  const handleAction = () => {
    if (onAction) {
      // alert(selectedRows);
      onAction(selectedRows);
    }
  };

  // console.log("DynamicTable++++++++++", sortedAndFilteredData);

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-4 pr-16">
        {hasIdColumn && (
          <div className="flex justify-between border p-2 bg-gradientGreyDarkerBott2 ">
            <div className="flex gap-4">
              {/* MULTISELECT ACTION BUTTON */}
              <button className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-secondary-500 disabled:opacity-50" onClick={handleAction} disabled={selectedRows.length === 0}>
                Action ({selectedRows.length})
              </button>
              {/* CREATE NEW BUTTON */}
              <button className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-secondary-500 disabled:opacity-50" onClick={handleToggleForm}>
                Create New
              </button>
            </div>

            <input type="text" placeholder="Filter..." className="px-3 py-2 border rounded" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="border-collapse border ">
            <thead>
              <tr className="border">
                {hasIdColumn && (
                  <th className="p-2">
                    <Checkbox.Root checked={selectedRows.length === sortedAndFilteredData.length} onCheckedChange={handleSelectAll} className="p-2 w-4 h-4  border rounded">
                      <Checkbox.Indicator>
                        <ChevronDownIcon />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </th>
                )}
                {headers.map((header) => (
                  <th key={header} className="p-2 font-bold text-left cursor-pointer border" onClick={() => handleSort(header)}>
                    {/* HEADER */}
                    <span className="capitalize text-sm line-clamp-1">{splitTextOnCapitals(header)}</span>
                    {sortColumn === header && <span className="ml-1">{sortDirection === "asc" ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredData.map((row, index) => (
                // CHECKBOX COLUMN
                <tr key={index} className="hover:bg-gray-100">
                  {hasIdColumn && (
                    // CHECKBOX CELL
                    <td className="border p-2">
                      <Checkbox.Root checked={selectedRows.includes(row.id)} onCheckedChange={() => handleRowSelect(row.id)} className="border rounded w-4 h-4">
                        <Checkbox.Indicator>
                          <ChevronDownIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                    </td>
                  )}
                  {headers.map((header) => (
                    // DATA CELLS
                    <td key={header} className="p-2 border">
                      <span className=" line-clamp-1">{row[header]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Suspense>
  );
};
