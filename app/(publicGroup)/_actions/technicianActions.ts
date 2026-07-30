"use server";

export const getTechnicianAction = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/technician/${id}`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },

    cache: "force-cache",

    next: {
      revalidate: 60 * 60 * 24,
      tags: ["technician"],
    },
  });

  const result = await res.json();

  return result;
};
