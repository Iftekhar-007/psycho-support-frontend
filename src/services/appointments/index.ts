export const getMyAppointments = async () => {
  const res = await fetch(
    "BACKEND_API_URL/api/v1/appointment/my-appointments",
    {
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return res.json();
};
