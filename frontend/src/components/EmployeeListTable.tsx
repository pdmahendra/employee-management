import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Employee = {
  uniqueId: string;
  image: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string;
  createDate: string;
};

export function EmployeeListTable({
  employeeList,
}: {
  employeeList: Employee[];
}) {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteTicket = (id: string) => {
    // setEmployeeList((prev) => prev.filter((emp) => emp.uniqueId !== id));
    console.log(id);
    
  };
  const handleEditTicket = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const imgUrl = (img: any) => {
    return `../../../backend/uploads/${img}`;
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "uniqueId",
      header: "unique Id",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.uniqueId}</div>
      ),
    },
    {
      accessorKey: "img",
      header: "Image",
      cell: ({ row }: { row: { original: Employee } }) => {
        const imgg = row.original.image;
        console.log(imgg);

        const imgpath = imgUrl("1727708100301-pexels-wendywei-1190297.jpg");
        console.log(imgpath);
        
        return (
          <img src={"imgpath"} alt="img" className="h-12 w-12 object-cover" />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="underline ">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "mobile",
      header: "Mobile No",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.mobile}</div>
      ),
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.designation}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.gender}</div>
      ),
    },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.course}</div>
      ),
    },
    {
      accessorKey: "createDate",
      header: "Create Date",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.createDate}</div>
      ),
    },
    {
      accessorKey: "",
      header: "Action",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="pr-10 flex gap-4">
          <button
            onClick={() => handleEditTicket(row.original.uniqueId)}
            className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteTicket(row.original.uniqueId)}
            className="px-4 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: employeeList,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,

      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });
  const pageCount = Math.ceil(employeeList.length / pageSize);

  return (
    <div className="mt-6 min-w-[300px] w-full p-4">
      <h3 className="text-2xl font-medium px-4">Employee List</h3>
      <div className="border border-gray-300 rounded-3xl px-6 mt-4">
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center p-2 px-4 gap-4 sm:gap-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-4 text-gray-400 pointer-events-none" />
            <input
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full sm:w-auto !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm lg:w-80"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
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
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No Employee Found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setPageIndex(i)}
                className={`px-2 m-3 rounded ${
                  pageIndex === i
                    ? "text-white border-2 bg-[#6076a0] rounded-xl"
                    : "text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
