"use client";

import DataTable, { TableColumn } from "react-data-table-component";
import { Mail, Phone, UserRound } from "lucide-react";

import { useDataTableStyles } from "@/hooks/useDataTableStyles";

import UserStatusButton from "./UserStatusButton";
import { AdminUser, UserStatus } from "@/lib/type";

type UserManagementTableProps = {
  users?: AdminUser[];
};

const roleStyles: Record<AdminUser["role"], string> = {
  CUSTOMER: "border-blue-200 bg-blue-50 text-blue-700",
  TECHNICIAN: "border-purple-200 bg-purple-50 text-purple-700",
  ADMIN: "border-rose-200 bg-rose-50 text-rose-700",
};

const statusStyles: Record<UserStatus, string> = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700",
  BLOCKED: "border-rose-200 bg-rose-50 text-rose-700",
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

const UserManagementTable = ({ users = [] }: UserManagementTableProps) => {
  const customTableStyles = useDataTableStyles({
    isStickyFirstColumn: false,
  });

  const columns: TableColumn<AdminUser>[] = [
    {
      name: "User",
      center: true,
      grow: 1.5,
      minWidth: "220px",
      cell: (row) => {
        const initials =
          row?.name
            ?.split(" ")
            .filter(Boolean)
            .map((word) => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

        return (
          <div className="flex items-center gap-3 py-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {initials}
            </div>

            <div className="min-w-0 text-left">
              <p className="truncate font-semibold text-slate-900">
                {row?.name || "Unknown user"}
              </p>

              <p
                title={row?.id}
                className="max-w-36 truncate text-xs text-slate-500"
              >
                ID: {row?.id || "N/A"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      name: "Contact",
      center: true,
      grow: 1.5,
      minWidth: "230px",
      cell: (row) => (
        <div className="space-y-1.5 py-3 text-left text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            <Mail className="size-3.5 shrink-0" />

            <span className="max-w-44 truncate">{row?.email || "N/A"}</span>
          </p>

          <p className="flex items-center gap-1.5">
            <Phone className="size-3.5 shrink-0" />

            <span>{row?.phone || "No phone number"}</span>
          </p>
        </div>
      ),
    },
    {
      name: "Role",
      center: true,
      cell: (row) => (
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            roleStyles[row?.role || "CUSTOMER"]
          }`}
        >
          {row?.role || "CUSTOMER"}
        </span>
      ),
    },
  {
  name: "Status",
  center: true,
  cell: (row) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        statusStyles[row?.status]
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          row?.status === "ACTIVE"
            ? "bg-emerald-500"
            : "bg-rose-500"
        }`}
      />

      {row?.status}
    </span>
  ),
},
    {
      name: "Joined",
      center: true,
      cell: (row) => (
        <span className="text-sm text-slate-600">
          {formatDate(row?.createdAt)}
        </span>
      ),
    },
    {
      name: "Action",
      center: true,
      minWidth: "130px",
      cell: (row) => <UserStatusButton user={row} />,
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <DataTable
        columns={columns}
        data={users}
        customStyles={customTableStyles}
        responsive
        highlightOnHover
        persistTableHead
        noDataComponent={
          <div className="py-14 text-center">
            <UserRound className="mx-auto size-9 text-slate-300" />

            <p className="mt-3 font-medium text-slate-700">No users found</p>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search term.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default UserManagementTable;
