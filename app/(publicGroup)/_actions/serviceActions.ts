"use server";

export const getServiceAction = async ({
  query,
}: {
  query?: {
    [key: string]: string | string[] | undefined;
  };
}) => {

  const params = new URLSearchParams();


  if (query && query.searchTerm) {
    params.set(
      "searchTerm",
      query.searchTerm as string
    );
  }


  if (query && query.category) {
    params.set(
      "category",
      query.category as string
    );
  }


  if (query && query.location) {
    params.set(
      "location",
      query.location as string
    );
  }


  if (query && query.rating) {
    params.set(
      "rating",
      query.rating as string
    );
  }


  if (query && query.minPrice) {
    params.set(
      "minPrice",
      query.minPrice as string
    );
  }


  if (query && query.maxPrice) {
    params.set(
      "maxPrice",
      query.maxPrice as string
    );
  }


  if (query && query.page) {
    params.set(
      "page",
      query.page as string
    );
  }


  if (query && query.limit) {
    params.set(
      "limit",
      query.limit as string
    );
  }



  const res = await fetch(
    `${process.env.BACKEND_API_URL}/service?${params.toString()}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },

      cache: "force-cache",

      next: {
        revalidate: 60 * 60 * 24,
        tags: ["services"],
      },
    }
  );


  const result = await res.json();


  return result;
};