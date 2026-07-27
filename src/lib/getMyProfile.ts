import { MyProfileResponse } from "@/types/profiles";
import { cookies } from "next/headers";
// import { MyProfileResponse } from "@/types/profile";

export const getMyProfile = async (): Promise<MyProfileResponse | null> => {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/v1/user/me`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.data as MyProfileResponse;
};
