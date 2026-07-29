export const getFeatureServiceAction = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/service/featured`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1 day
      tags: ["featured-services"],
    },
  });
  const result = await res.json();
  return result;
};
