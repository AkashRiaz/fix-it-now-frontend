"use client";

import DataTable, { TableColumn } from "react-data-table-component";
import { Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useDataTableStyles } from "@/hooks/useDataTableStyles";
import ReviewModal from "./ReviewModal";
import { PaymentButton } from "../payment/PaymentButton";

type BookingStatus =
  | "PENDING"
  | "REQUESTED"
  | "ACCEPTED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DECLINED";

export type Booking = {
  id: string;

  service: {
    id?: string;
    title: string;
  };

  technician?: {
    id: string;
    user?: {
      name: string;
    };
  };

  bookingDate: string;
  totalPrice: number;
  status: BookingStatus;

  review?: {
    id: string;
    rating: number;
    comment?: string | null;
  } | null;
};

const statusStyles: Record<BookingStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  REQUESTED: "border-amber-200 bg-amber-50 text-amber-700",
  ACCEPTED: "border-blue-200 bg-blue-50 text-blue-700",
  PAID: "border-purple-200 bg-purple-50 text-purple-700",
  IN_PROGRESS: "border-emerald-200 bg-emerald-50 text-emerald-700",
  COMPLETED: "border-slate-200 bg-slate-100 text-slate-700",
  CANCELLED: "border-rose-200 bg-rose-50 text-rose-700",
  DECLINED: "border-rose-200 bg-rose-50 text-rose-700",
};

interface BookingTableProps {
  data: Booking[];
}

const BookingTable = ({ data }: BookingTableProps) => {
  const customTableStyles = useDataTableStyles();

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleOpenReview = (booking: Booking) => {
    setSelectedBooking(booking);
    setReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setReviewModalOpen(false);
    setSelectedBooking(null);
  };

  const columns: TableColumn<Booking>[] = [
    {
      name: "Service",
      center: true,
      grow: 1.5,
      cell: (row) => (
        <span className="font-medium text-slate-900">
          {row.service?.title || "N/A"}
        </span>
      ),
    },
    {
      name: "Technician",
      center: true,
      cell: (row) => (
        <span className="text-slate-700">
          {row.technician?.user?.name || "Unassigned"}
        </span>
      ),
    },
    {
      name: "Date",
      center: true,
      cell: (row) => {
        const bookingDate = new Date(row.bookingDate);

        return (
          <div className="py-3 text-center">
            <p className="font-medium text-slate-900">
              {bookingDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <p className="text-xs text-slate-500">
              {bookingDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        );
      },
    },
    {
      name: "Price",
      center: true,
      cell: (row) => (
        <span className="font-semibold text-slate-900">
          ${Number(row.totalPrice || 0).toLocaleString()}
        </span>
      ),
    },
    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            statusStyles[row.status] ||
            "border-gray-200 bg-gray-100 text-gray-800"
          }`}
        >
          {row.status.replaceAll("_", " ")}
        </span>
      ),
    },
    {
      name: "Action",
      center: true,
      grow: 1.2,
      cell: (row) => {
        if (row.status === "PENDING" || row.status === "REQUESTED") {
          return (
            <span className="text-xs text-slate-500">
              Waiting for technician
            </span>
          );
        }

        if (row.status === "ACCEPTED") {
          return <PaymentButton bookingId={row.id} />;
        }

        if (row.status === "PAID") {
          return (
            <span className="text-xs font-medium text-purple-600">
              Payment completed
            </span>
          );
        }

        if (row.status === "IN_PROGRESS") {
          return (
            <span className="text-xs font-medium text-emerald-600">
              Job in progress
            </span>
          );
        }

        if (row.status === "COMPLETED") {
          if (row.review) {
            return (
              <div className="flex items-center justify-center gap-1 text-sm font-medium text-amber-600">
                <Star className="h-4 w-4 fill-current" />
                <span>{row.review.rating}</span>
              </div>
            );
          }

          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpenReview(row)}
            >
              <Star className="mr-1 h-4 w-4" />
              Review
            </Button>
          );
        }

        if (row.status === "CANCELLED") {
          return (
            <span className="text-xs font-medium text-rose-500">
              Booking cancelled
            </span>
          );
        }

        if (row.status === "DECLINED") {
          return (
            <span className="text-xs font-medium text-rose-500">
              Booking declined
            </span>
          );
        }

        return null;
      },
    },
  ];

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customTableStyles}
          pagination
          highlightOnHover
          responsive
          persistTableHead
          noDataComponent={
            <div className="py-12 text-sm text-slate-500">
              No bookings found.
            </div>
          }
        />
      </div>

      <ReviewModal
        open={reviewModalOpen}
        booking={selectedBooking}
        onClose={handleCloseReview}
      />
    </>
  );
};

export default BookingTable;
