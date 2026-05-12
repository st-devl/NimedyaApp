import type { ReactNode } from "react";

type DataTableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: "left" | "right";
};

type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  rowKey: (row: T) => string;
};

export function DataTable<T>({ columns, rows, rowKey }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-[color:var(--surface-container-low)]">
          <tr>
            {columns.map((column) => (
              <th
                className={`px-6 py-4 text-xs uppercase tracking-wider text-[color:var(--app-muted)] ${column.align === "right" ? "text-right" : "text-left"}`}
                key={column.key}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--app-border)]/40">
          {rows.map((row) => (
            <tr className="group hover:bg-[color:var(--surface-container-low)]/40" key={rowKey(row)}>
              {columns.map((column) => (
                <td className={`px-6 py-6 ${column.align === "right" ? "text-right" : "text-left"}`} key={column.key}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
