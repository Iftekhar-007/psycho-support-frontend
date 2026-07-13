"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreatePsychologistProfile() {
  const router = useRouter();

  const onSubmit = async (values: PsychologistFormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/psychologist/create-psychologistprofile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Profile created successfully");

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    // form...
  );
}