"use server";

import { CustomerPaymentResponse } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";

const emptyResponse: CustomerPaymentResponse = {
  success: false,
  statusCode: 500,
  message: "Unable to retrieve customer payments",
  data: {
    summary: {
      totalPayments: 0,
      totalPaid: 0,
    },
    payments: [],
  },
};

export const getCustomerPaymentsAction =
  async (): Promise<CustomerPaymentResponse> => {
    try {
      const accessToken = await isAccessTokenExist();

      if (!accessToken) {
        return {
          success: false,
          statusCode: 401,
          message: "Customer not logged in",
          data: {
            summary: {
              totalPayments: 0,
              totalPaid: 0,
            },
            payments: [],
          },
        };
      }

      const response = await fetch(
        `${process.env.BACKEND_API_URL}/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
          },
          cache: "no-store",
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return {
          success: false,
          statusCode: response.status,
          message: result?.message || "Failed to retrieve customer payments",
          data: {
            summary: {
              totalPayments: 0,
              totalPaid: 0,
            },
            payments: [],
          },
        };
      }

      return result;
    } catch (error) {
      console.error("Get customer payments error:", error);

      return emptyResponse;
    }
  };
