import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.FRONTEND_API_URL ||
    "http://localhost:3000"
  );
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),

  fetchOptions: {
    credentials: "include",
  },

  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
        isDeleted: {
          type: "boolean",
          input: false,
        },
        deletedAt: {
          type: "date",
          required: false,
          input: false,
        },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
