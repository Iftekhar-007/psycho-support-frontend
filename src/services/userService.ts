// import { env } from "@/env";
import { cookies } from "next/headers";

const authUrl = process.env.AUTH_URL;
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
      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing!" } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },
};
