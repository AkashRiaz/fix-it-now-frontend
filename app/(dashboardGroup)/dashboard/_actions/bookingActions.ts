import { isAccessTokenExist } from "@/service/refreshToken";

export const getBookingsAction = async () => {
  const accessToken = await isAccessTokenExist();
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch bookings",
    };
  }
};
