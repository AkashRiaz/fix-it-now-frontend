import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Wrench,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminBooking, BookingStatus } from "@/lib/type";

type AdminBookingsTableProps = {
  bookings: AdminBooking[];
};

const statusStyles: Record<BookingStatus, string> = {
  REQUESTED:
    "border-amber-200 bg-amber-50 text-amber-700",

  ACCEPTED:
    "border-blue-200 bg-blue-50 text-blue-700",

  PAID:
    "border-cyan-200 bg-cyan-50 text-cyan-700",

  IN_PROGRESS:
    "border-violet-200 bg-violet-50 text-violet-700",

  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  CANCELLED:
    "border-slate-200 bg-slate-100 text-slate-600",

  DECLINED:
    "border-red-200 bg-red-50 text-red-700",
};
const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (value?: string | null) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value?: string | null) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const getBookingStart = (booking: AdminBooking) => {
  return booking.slotStart || booking.bookingDate;
};

const getTechnicianInitials = (name: string) => {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T"
  );
};

const AdminBookingsTable = ({ bookings }: AdminBookingsTableProps) => {
  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
        <CalendarDays className="mx-auto size-10 text-slate-300" />

        <h2 className="mt-4 font-semibold text-slate-900">No bookings found</h2>

        <p className="mt-1 text-sm text-slate-500">
          Platform bookings will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h2 className="font-semibold text-slate-900">All Bookings</h2>

        <p className="mt-1 text-sm text-slate-500">
          {bookings.length} booking
          {bookings.length === 1 ? "" : "s"} found
        </p>
      </div>

      {/* Desktop and tablet table */}
      <div className="hidden overflow-x-auto md:block">
        <Table className="min-w-[1150px]">
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((booking) => {
              const technicianName =
                booking.technician?.user?.name || "Unknown Technician";

              const bookingStart = getBookingStart(booking);

              return (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="max-w-[220px]">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <Wrench className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {booking.service?.title || "Unknown Service"}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {booking.service?.duration || 0} minutes
                          </p>

                          <p
                            title={booking.notes || ""}
                            className="mt-1 line-clamp-1 text-xs text-slate-500"
                          >
                            {booking.notes || "No booking notes"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="max-w-[210px] space-y-1">
                      <p className="font-medium text-slate-900">
                        {booking.customer?.name || "Unknown Customer"}
                      </p>

                      <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                        <Mail className="size-3" />
                        {booking.customer?.email || "N/A"}
                      </p>

                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <Phone className="size-3" />
                        {booking.customer?.phone || "N/A"}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex max-w-[210px] items-center gap-3">
                      <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {booking.technician?.profilePhoto ? (
                          <Image
                            src={booking.technician.profilePhoto}
                            alt={technicianName}
                            fill
                            sizes="40px"
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          getTechnicianInitials(technicianName)
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {technicianName}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {booking.technician?.location ||
                            "Location unavailable"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <p className="flex items-center gap-1.5 text-sm font-medium text-slate-800">
                        <CalendarDays className="size-4 text-primary" />
                        {formatDate(bookingStart)}
                      </p>

                      <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock3 className="size-3.5" />
                        {formatTime(bookingStart)}

                        {booking.slotEnd
                          ? ` – ${formatTime(booking.slotEnd)}`
                          : ""}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex max-w-[220px] items-start gap-1.5 text-sm text-slate-600">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />

                      <span className="line-clamp-2">
                        {booking.customerAddress || "Address unavailable"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        statusStyles[booking.status] ||
                        "border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      {formatStatus(booking.status)}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <p className="font-bold text-slate-900">
                      ${Number(booking.totalPrice || 0).toLocaleString()}
                    </p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile booking cards */}
      <div className="divide-y divide-slate-200 md:hidden">
        {bookings.map((booking) => {
          const technicianName =
            booking.technician?.user?.name || "Unknown Technician";

          const bookingStart = getBookingStart(booking);

          return (
            <article key={booking.id} className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Service
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-900">
                    {booking.service?.title || "Unknown Service"}
                  </h3>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    statusStyles[booking.status] ||
                    "border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  {formatStatus(booking.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-500">Date</p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDate(bookingStart)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Time</p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatTime(bookingStart)}

                    {booking.slotEnd ? ` – ${formatTime(booking.slotEnd)}` : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <MobileInformation
                  label="Customer"
                  value={booking.customer?.name || "Unknown Customer"}
                  icon={<UserRound className="size-4" />}
                />

                <MobileInformation
                  label="Technician"
                  value={technicianName}
                  icon={<Wrench className="size-4" />}
                />

                <MobileInformation
                  label="Address"
                  value={booking.customerAddress || "Address unavailable"}
                  icon={<MapPin className="size-4" />}
                />
              </div>

              {booking.notes && (
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs font-medium text-slate-500">Notes</p>

                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {booking.notes}
                  </p>
                </div>
              )}

              <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-500">Booking ID</p>

                  <p
                    title={booking.id}
                    className="mt-1 max-w-36 truncate font-mono text-xs text-slate-600"
                  >
                    {booking.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">Total</p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    ৳{Number(booking.totalPrice || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

type MobileInformationProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const MobileInformation = ({ label, value, icon }: MobileInformationProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-primary">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-0.5 break-words font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default AdminBookingsTable;
