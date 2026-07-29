"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  } | null;
};

export type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
  } | null;
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as "CUSTOMER" | "TECHNICIAN";
  //   console.log(role, "role-----");
  //   console.log(name, email, password, phone, role);

  const payload = {
    name,
    email,
    password,
    phone,
    role,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result?.success) {
    redirect("/login");
  }
  return result;
};

export const loginActions = async (
  prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState | never> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result?.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 2,
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    // redirect outside try/catch
    const decodedToken = jwt.decode(result.data.accessToken);

    if (
      decodedToken &&
      typeof decodedToken === "object" &&
      "role" in decodedToken
    ) {
      const role = decodedToken.role;

      if (role === "ADMIN") {
        redirect("/admin-dashboard");
      }

      if (role === "TECHNICIAN") {
        redirect("/technician-dashboard");
      }

      if (role === "CUSTOMER") {
        redirect("/dashboard");
      }

      redirect("/home");
    }
  }

  redirect("/home");
};
