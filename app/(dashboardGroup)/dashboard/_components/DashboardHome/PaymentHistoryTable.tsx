"use client";

import DataTable, { TableColumn } from "react-data-table-component";

import { useDataTableStyles } from "@/hooks/useDataTableStyles";
import { CustomerPayment } from "@/lib/type";

type PaymentHistoryTableProps = {
  data?: CustomerPayment[];
};

const statusStyles = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  FAILED: "border-rose-200 bg-rose-50 text-rose-700",
};

const formatDate = (value?: string | null) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const PaymentHistoryTable = ({ data = [] }: PaymentHistoryTableProps) => {
  const customTableStyles = useDataTableStyles({
    isStickyFirstColumn: false,
  });

  const columns: TableColumn<CustomerPayment>[] = [
    {
      name: "Service",
      center: true,
      grow: 1.5,
      cell: (row) => (
        <span className="font-medium text-slate-900">
          {row?.booking?.service?.title || "N/A"}
        </span>
      ),
    },
    {
      name: "Technician",
      center: true,
      grow: 1.2,
      cell: (row) => (
        <span className="text-slate-700">
          {row?.booking?.technician?.user?.name || "Unknown"}
        </span>
      ),
    },
    {
      name: "Transaction",
      center: true,
      grow: 1.4,
      cell: (row) => (
        <span
          title={row?.transactionId || ""}
          className="max-w-40 truncate font-mono text-xs text-slate-500"
        >
          {row?.transactionId || "N/A"}
        </span>
      ),
    },
    {
      name: "Amount",
      center: true,
      cell: (row) => (
        <span className="font-semibold text-slate-900">
          ${Number(row?.amount ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      name: "Provider",
      center: true,
      cell: (row) => (
        <span className="text-sm text-slate-600">{row?.provider || "N/A"}</span>
      ),
    },
    {
      name: "Payment Date",
      center: true,
      cell: (row) => (
        <span className="text-sm text-slate-600">
          {formatDate(row?.paidAt || row?.createdAt)}
        </span>
      ),
    },
    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            statusStyles[row?.status || "PENDING"]
          }`}
        >
          {row?.status || "PENDING"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customTableStyles}
        pagination
        responsive
        highlightOnHover
        persistTableHead
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        noDataComponent={
          <div className="py-14 text-center">
            <p className="font-medium text-slate-700">No payments found</p>

            <p className="mt-1 text-sm text-slate-500">
              Payment records will appear after successful service payments.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default PaymentHistoryTable;
