import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BACKEND_API_URL || "http://localhost:5000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
