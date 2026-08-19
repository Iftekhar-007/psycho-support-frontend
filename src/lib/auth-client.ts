import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_API_URL ??
    "https://psychology-support-backend.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        isDeleted: { type: "boolean", input: false },
        deletedAt: { type: "date", required: false, input: false },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
