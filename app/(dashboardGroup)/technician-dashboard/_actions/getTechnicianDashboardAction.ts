"use server";
import { isAccessTokenExist } from "@/service/refreshToken";

export const getTechnicianDashboardAction = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/technician/dashboard`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();
  return result;
};
