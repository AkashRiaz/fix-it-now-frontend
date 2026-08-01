import {
  AlertCircle,
  UsersRound,
} from "lucide-react";
import UserManagementTable from "./UserManagementTable";
import UserPagination from "./UserPagination";
import { getAdminUsersAction } from "../../_actions/adminUserActions";
import { AdminUser } from "@/lib/type";


type UserManagementListProps = {
  searchParams?: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
};

const UserManagementList = async ({
  searchParams,
}: UserManagementListProps) => {
  const query = await searchParams;

  const result =
    await getAdminUsersAction({
      query,
    });


  if (!result?.success) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <AlertCircle className="mx-auto size-10 text-red-500" />

        <h3 className="mt-4 font-semibold text-red-800">
          Failed to load users
        </h3>

        <p className="mt-1 text-sm text-red-600">
          {result?.message ||
            "Something went wrong while retrieving users."}
        </p>
      </div>
    );
  }

  const users: AdminUser[] =
    result?.data ?? [];

  const currentPage = Math.max(
    1,
    Number(result?.meta?.page ?? 1),
  );

  const limit = Math.max(
    1,
    Number(result?.meta?.limit ?? 10),
  );

  const total = Math.max(
    0,
    Number(result?.meta?.total ?? 0),
  );

  const totalPages = Math.max(
    1,
    Number(
      result?.meta?.totalPages ??
        Math.ceil(total / limit),
    ),
  );

  const firstVisibleUser =
    total > 0
      ? (currentPage - 1) * limit + 1
      : 0;

  const lastVisibleUser = Math.min(
    currentPage * limit,
    total,
  );

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing{" "}
          <span className="font-medium text-foreground">
            {firstVisibleUser}
          </span>
          {" – "}
          <span className="font-medium text-foreground">
            {lastVisibleUser}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {total}
          </span>{" "}
          users
        </p>

        <p>
          Page {currentPage} of{" "}
          {totalPages}
        </p>
      </div>

      {users.length > 0 ? (
        <>
          <UserManagementTable
            users={users}
          />

          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
          <UsersRound className="mx-auto size-10 text-slate-300" />

          <h3 className="mt-4 font-semibold text-slate-900">
            No users found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search term.
          </p>
        </div>
      )}
    </section>
  );
};

export default UserManagementList;