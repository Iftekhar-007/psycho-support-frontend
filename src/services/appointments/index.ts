const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ??
  "https://psychology-support-backend.vercel.app";

export const getMyAppointments = async () => {
  const res = await fetch(`${API_URL}/api/v1/appointment/my-appointments`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return res.json();
};
