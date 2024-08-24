"use client";

import React, { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FilterIcon } from "lucide-react";

import { TotalDetails } from "@/lib/types";
import { calculateTotalPages, genderOptions } from "@/lib/utils";
import MySelect from "./select";

// Data Table Component by using the React-Table and its APIs
// Props expected by the data table component
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalDetails: TotalDetails;
  disabled?: boolean;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  filterKey: string;
  setFilterKey: (key: string) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  totalDetails,
  pageIndex,
  setPageIndex,
  filterKey,
  setFilterKey,
  filterValue,
  setFilterValue,
  disabled,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // state to manage the column filters (react-table API)
  const [sorting, setSorting] = useState<SortingState>([]); // state to manage the sorting (react-table API)
  const [pagination, setPagination] = useState<PaginationState>({
    // state to manage the pagination (react-table API)
    pageIndex: pageIndex, // default page index
    pageSize: 10, // limit to 10
  });

  const table = useReactTable({
    // using the react-table API to manage the data
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  // Get the total pages for the pagination from the data received
  const totalPages = calculateTotalPages(totalDetails.total, 10);

  // Function to handle the filter change
  // If the same value is selected, then clear the filter
  const handleFilterChange = (key: string, value: string) => {
    if (filterValue === value) {
      setFilterKey("");
      setFilterValue("");
    } else {
      setFilterKey(key);
      setFilterValue(value);
    }
  };

  // function to handle going to the first page of paginated data
  const handleFirstPage = () => {
    setPageIndex(0);
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: 0,
    }));
  };

  // function to handle going to the next page of paginated data from the current pageIndex
  const handleNextPage = () => {
    if (pageIndex < totalPages) {
      setPageIndex(pageIndex + 1);
      setPagination((prevState) => ({
        ...prevState,
        pageIndex: pageIndex + 1,
      }));
    }
  };

  // function to handle going to the previous page of paginated data from the current pageIndex
  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      setPagination((prevState) => ({
        ...prevState,
        pageIndex: pageIndex - 1,
      }));
    }
  };

  // function to handle going to the last page of paginated data from the current pageIndex
  const handleLastPage = () => {
    setPageIndex(totalPages - 1);
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: totalPages - 1,
    }));
  };

  return (
    <div>
      <div className="px-2 py-4 flex flex-col items-start gap-3 md:flex-row justify-between md:items-center">
        <h2 className="font-bold text-black tracking-tight text-3xl md:text-4xl">
          Employees
        </h2>
        <div className="flex flex-row md:items-center gap-4">
          <FilterIcon className="text-rose-900" size={32} />
          <div className="flex flex-col md:flex-row gap-3">
            {/* Filter by Location . Only filters data of the page*/}
            {/* As there is no option to send two filters */}
            <Input
              placeholder={`Filter by country`}
              value={
                (table.getColumn("location")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("location")?.setFilterValue(event.target.value)
              }
              className="text-sm md:text-base w-[40vw] md:w-[65%] lg:w-[15vw] 2xl:w-[8vw] focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-600"
            />
            {/* Filters gender through a custom component */}
            {/* Refetches the data based on the parameters so new pagination occurs */}
            <MySelect
              placeholder="Gender"
              value={filterValue || null}
              options={genderOptions}
              disabled={disabled}
              onChange={(value) => handleFilterChange("gender", value || "")}
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border-outline">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    // Render the header of the table
                    <TableHead key={header.id} className="text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Render the rows of records */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Render no results if no data is found
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-2xl"
                >
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex md:items-center justify-end md:space-x-2 py-4 flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-4">
          {/* Shows total number of records with filters if any */}
          <p className="text-muted-foreground text-xs md:text-sm">
            Total Records: {totalDetails.total}
          </p>
          {/* Show current page and the total numbers of pages for the pagination */}
          <p className="text-muted-foreground text-xs md:text-sm">
            Page {pageIndex + 1} of {totalPages}
          </p>
        </div>
        <div className="flex items-center flex-row gap-2">
          {/* Option to go to a particular page and skip the data */}
          <span className="text-muted-foreground text-xs md:text-sm">
            Go To Page:{" "}
          </span>
          <Input
            min="1"
            max={totalPages}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
              setPagination((prevState) => ({
                ...prevState,
                pageIndex: page,
              }));
            }}
            className="w-10 h-10 text-center"
          />
        </div>
        <div className="flex flex-row gap-1 justify-center md:justify-start">
          {/* Buttons to go the different pages of pagination */}
          <Button
            variant="outline"
            size="sm"
            className="h-10"
            onClick={handleFirstPage}
            disabled={pageIndex === 0}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10"
            onClick={handlePreviousPage}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10"
            onClick={handleNextPage}
            disabled={pageIndex + 1 >= totalPages}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10"
            onClick={handleLastPage}
            disabled={pageIndex + 1 === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
