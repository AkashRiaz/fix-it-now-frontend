"use server";

export const getTopTechniciansAction = async () => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/technician?limit=4&sortBy=averageRating&sortOrder=desc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["top-technicians"],
      },
    },
  );

  const result = await res.json();
  return result;
};
