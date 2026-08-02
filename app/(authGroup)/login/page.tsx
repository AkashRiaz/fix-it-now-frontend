import Link from "next/link";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-6 shadow-lg sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back!
          </h1>

          <p className="text-sm text-slate-500">
            Enter your credentials to access your account
          </p>
        </div>

        <LoginForm />

        <div className="border-t pt-5 text-center">
          <p className="text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary transition hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;