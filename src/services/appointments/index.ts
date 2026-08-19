export const getMyAppointments = async () => {
  const res = await fetch(
    "https://psychology-support-backend.vercel.app/api/v1/appointment/my-appointments",
    {
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return res.json();
};
