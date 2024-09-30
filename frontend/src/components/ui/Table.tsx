import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  colSpan?: number;
  className?: string;
}

interface TableHeadProps {
  children: ReactNode;
  className?: string;
  scope?: string;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full">{children}</table>
  </div>
);

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
  <thead className="border-b-2 text-center">{children}</thead>
);

export const TableHead: React.FC<TableHeadProps> = ({
  className,
  scope,
  children,
  ...props
}) => (
  <th
    className={`px-4 py-3 text-center text-xs font-medium text-bold uppercase tracking-wider ${className}`}
    scope={scope}
    {...props}
  >
    {children}
  </th>
);

export const TableBody: React.FC<TableBodyProps> = ({
  className,
  children,
}) => (
  <tbody className={`bg-white divide-y divide-gray-300 ${className}`}>
    {children}
  </tbody>
);

export const TableRow: React.FC<TableRowProps> = ({
  className,
  children,
  ...props
}) => (
  <tr className={className} {...props}>
    {children}
  </tr>
);

export const TableCell: React.FC<TableCellProps> = ({
  className,
  children,
  ...props
}) => (
  <td
    className={`px-4 py-3 text-center whitespace-nowrap text-sm text-gray-500 ${className}`}
    {...props}
  >
    {children}
  </td>
);
