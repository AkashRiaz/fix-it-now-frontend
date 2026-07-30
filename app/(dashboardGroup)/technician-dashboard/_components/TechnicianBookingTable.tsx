"use client";

import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "@/components/ui/button";
import { useDataTableStyles } from "@/hooks/useDataTableStyles";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { BookingStatus } from "@/lib/type";
import {
  TechnicianBookingStatus,
  updateBookingStatusAction,
} from "../_actions/technicianBookingActions";

type Booking = {
  id: string;

  service: {
    id: string;
    title: string;
    price: number;
  };

  technician?: {
    id: string;
    user: {
      name: string;
    };
  };

  customer: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  };

  bookingDate: string;
  totalPrice: number;
  customerAddress?: string;
  notes?: string;
  status: BookingStatus;
  createdAt?: string;
};

const statusStyles: Record<BookingStatus, string> = {
  REQUESTED: "bg-amber-50 text-amber-700 border-amber-200",

  ACCEPTED: "bg-blue-50 text-blue-700 border-blue-200",

  PAID: "bg-purple-50 text-purple-700 border-purple-200",

  IN_PROGRESS: "bg-emerald-50 text-emerald-700 border-emerald-200",

  COMPLETED: "bg-slate-100 text-slate-700 border-slate-200",

  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",

  DECLINED: "bg-red-50 text-red-700 border-red-200",
};

interface TechnicianBookingTableProps {
  data: Booking[];
}

const TechnicianBookingTable = ({ data }: TechnicianBookingTableProps) => {
  const customTableStyles = useDataTableStyles();

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (
    bookingId: string,
    status: TechnicianBookingStatus,
  ) => {
    setLoadingId(bookingId);

    startTransition(async () => {
      try {
        const result = await updateBookingStatusAction(bookingId, status);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
      } catch (error) {
        console.error(error);
        toast.error("Failed to update booking status.");
      } finally {
        setLoadingId(null);
      }
    });
  };

  const columns: TableColumn<Booking>[] = [
    // ------------------------------------------------
    // SERVICE
    // ------------------------------------------------
    {
      name: "Service",
      center: true,
      grow: 1.5,

      cell: (row) => (
        <div className="py-3">
          <p className="font-semibold text-slate-900">
            {row.service?.title || "N/A"}
          </p>

          <p className="text-xs text-slate-500">
            Service ID: {row.service?.id?.slice(0, 8)}
          </p>
        </div>
      ),
    },

    // ------------------------------------------------
    // CUSTOMER
    // ------------------------------------------------
    {
      name: "Customer",
      center: true,

      cell: (row) => (
        <div className="py-3 text-center">
          <p className="font-medium text-slate-900">
            {row.customer?.name || "Unknown"}
          </p>

          {row.customer?.email && (
            <p className="text-xs text-slate-500">{row.customer.email}</p>
          )}

          {row.customer?.phone && (
            <p className="text-xs text-slate-500">{row.customer.phone}</p>
          )}
        </div>
      ),
    },

    // ------------------------------------------------
    // DATE & TIME
    // ------------------------------------------------
    {
      name: "Booking Date",
      center: true,

      cell: (row) => {
        const date = new Date(row.bookingDate);

        return (
          <div className="py-3 text-center">
            <p className="font-medium text-slate-900">
              {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <p className="text-xs text-slate-500">
              {date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        );
      },
    },

    // ------------------------------------------------
    // ADDRESS
    // ------------------------------------------------
    {
      name: "Address",
      grow: 1.5,

      cell: (row) => (
        <div className="max-w-[220px] py-3">
          <p className="truncate text-sm text-slate-700">
            {row.customerAddress || "No address provided"}
          </p>
        </div>
      ),
    },

    // ------------------------------------------------
    // PRICE
    // ------------------------------------------------
    {
      name: "Price",
      center: true,

      cell: (row) => (
        <span className="font-semibold text-slate-900">
          ${row.totalPrice.toLocaleString()}
        </span>
      ),
    },

    // ------------------------------------------------
    // STATUS
    // ------------------------------------------------
    {
      name: "Status",
      center: true,

      cell: (row) => (
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            statusStyles[row.status]
          }`}
        >
          {row.status.replace("_", " ")}
        </span>
      ),
    },

    // ------------------------------------------------
    // ACTIONS
    // ------------------------------------------------
    {
      name: "Action",
      center: true,
      grow: 1.5,

      cell: (row) => {
        const isLoading = isPending && loadingId === row.id;

        if (row.status === "REQUESTED") {
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                disabled={isLoading}
                onClick={() => handleStatusChange(row.id, "ACCEPTED")}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isLoading ? "..." : "Accept"}
              </Button>

              <Button
                size="sm"
                variant="destructive"
                disabled={isLoading}
                onClick={() => handleStatusChange(row.id, "DECLINED")}
              >
                {isLoading ? "..." : "Decline"}
              </Button>
            </div>
          );
        }

        if (row.status === "PAID") {
          return (
            <Button
              size="sm"
              disabled={isLoading}
              onClick={() => handleStatusChange(row.id, "IN_PROGRESS")}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {isLoading ? "Starting..." : "Start Job"}
            </Button>
          );
        }

        if (row.status === "IN_PROGRESS") {
          return (
            <Button
              size="sm"
              disabled={isLoading}
              onClick={() => handleStatusChange(row.id, "COMPLETED")}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {isLoading ? "Completing..." : "Complete Job"}
            </Button>
          );
        }

        return null;
      },
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customTableStyles}
        pagination
        highlightOnHover
        responsive
        persistTableHead
      />
    </div>
  );
};

export default TechnicianBookingTable;
