export const getMyAppointments = async () => {
  const res = await fetch(
    "http://localhost:5000/api/v1/appointment/my-appointments",
    {
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return res.json();
};
