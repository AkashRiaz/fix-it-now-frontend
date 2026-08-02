import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-6 shadow-lg sm:p-8">
        {/* FORM GENERIC TEXTS */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>

          <p className="text-sm text-slate-500">
            Create a new account to get started
          </p>
        </div>

        {/* FORM */}
        <RegisterForm />

        <div className="border-t pt-5 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary transition hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
