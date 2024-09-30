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
import CreateEmployeeDialog from "../pages/CreateEmployee";
import { deleteEmployee } from "../api/query/deleteEmployee";
import toast from "react-hot-toast";
import EditEmployeeDialog from "../pages/EditEmployee";

type Employee = {
  _id: string;
  image: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  courses: string[];
  createdAt: string;
};

type EmployeeProps = {
  refetch: () => void;
  employeeList: Employee[];
};

export function EmployeeListTable({ employeeList, refetch }: EmployeeProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = async (id: string) => {
    console.log(id);

    try {
      await deleteEmployee(id.trim());
      toast.success("Employee deleted successfully!");
      refetch();
    } catch (error) {
      const message = "Error deleting employee.";
      toast.error(message);
      console.error("Delete error:", error);
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "_id",
      header: "unique Id",
      cell: ({ row }: { row: { index: number } }) => (
        <div className="">{row.index + 1} </div>
      ),
    },
    // {
    //   accessorKey: "img",
    //   header: "Image",
    //   cell: ({ row }: { row: { original: Employee } }) => {

    //     return (
    //       <img src={imgpath} alt="img" className="h-12 w-12 object-cover" />
    //     );
    //   },
    // },
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
      accessorKey: "courses",
      header: "Courses",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div>
          {row.original.courses && row.original.courses.length > 0 ? (
            row.original.courses.map((course: string, index: number) => (
              <span key={index} className="">
                {course} {index < row.original.courses.length - 1 && ", "}
              </span>
            ))
          ) : (
            <span>No courses available</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Create Date",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="">{row.original.createdAt.split("T")[0]}</div>
      ),
    },
    {
      accessorKey: "",
      header: "Action",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div className="flex gap-2">
          <button>
            <EditEmployeeDialog refetch={refetch} id={row.original._id} />{" "}
          </button>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="px-2 py-1 bg-gray-500 text-white rounded"
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
      <div className="flex justify-between">
        <h3 className="text-xl font-medium px-4">Employee List</h3>
        <div>
          <CreateEmployeeDialog refetch={refetch} />
        </div>
      </div>{" "}
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
