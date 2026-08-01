import { Suspense } from "react";
import {
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import UserSearchBar from "../_components/userManagement/UserSearchBar";
import UserManagementSkeleton from "../_components/userManagement/serManagementSkeleton";
import UserManagementList from "../_components/userManagement/UserManagementList";
type UserManagementPageProps = {
  searchParams?: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
};

const UserManagementPage = async ({
  searchParams,
}: UserManagementPageProps) => {
  const query = await searchParams;

  const suspenseKey = JSON.stringify(
    query ?? {},
  );

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <UsersRound className="size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              User Management
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Search users and manage their platform access.
            </p>
          </div>
        </div>

        <UserSearchBar />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
        <ShieldCheck className="size-4 shrink-0" />

        Banned users cannot access protected platform features.
      </div>

      <Suspense
        key={suspenseKey}
        fallback={
          <UserManagementSkeleton />
        }
      >
        <UserManagementList
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  );
};

export default UserManagementPage;