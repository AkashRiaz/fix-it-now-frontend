import { redirect } from "next/navigation";

import { getMe } from "@/service/getMe";
import TechnicianRegistrationForm from "../../_components/register/TechnicianRegistrationForm";

export const dynamic = "force-dynamic";

const TechnicianRegisterPage = async () => {
  const user = await getMe();

  const isLoggedIn = Boolean(user?.success && user?.data);

  const role = user?.data?.role;

  if (role === "TECHNICIAN") {
    redirect("/technician-dashboard/profile");
  }

  if (role === "ADMIN") {
    redirect("/admin-dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Become a Technician
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            {role === "CUSTOMER"
              ? "Create your technician profile using your existing customer account."
              : "Create a technician account and start offering professional home services."}
          </p>
        </div>

        <TechnicianRegistrationForm
          isLoggedInCustomer={isLoggedIn && role === "CUSTOMER"}
          customerName={user?.data?.name}
          customerEmail={user?.data?.email}
        />
      </div>
    </main>
  );
};

export default TechnicianRegisterPage;
