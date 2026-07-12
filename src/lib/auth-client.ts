import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   baseURL: process.env.BACKEND_API_URL || "http://localhost:5000",
// });

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
//   fetchOptions: {
//     credentials: "include",
//   },
// });

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
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
