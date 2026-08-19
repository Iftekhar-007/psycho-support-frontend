import { cookies } from "next/headers";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://psychology-support-backend.vercel.app";
const authUrl = process.env.AUTH_URL || `${backendUrl}/api/auth`;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${authUrl}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch session" } };
      }

      const session = await res.json();

      if (!session || session === null) {
        return { data: null, error: { message: "Session is missing!" } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error("userService.getSession error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
