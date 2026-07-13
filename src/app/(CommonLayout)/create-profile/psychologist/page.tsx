/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function CreatePsychologistProfile() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  //   const [formData, setFormData] = useState({
  //      name: session?.user?.name || "",
  //   email: session?.user?.email || "",
  //     contactNumber: "",
  //     address: "",
  //     profilePhoto: "",
  //     sector: "",
  //     availability: "",
  //     appointmentFee: "",
  //     qualification: "",
  //     licenseId: "",
  //     experience: "",
  //   });

  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    contactNumber: "",
    address: "",
    profilePhoto: "",
    sector: "",
    availability: "",
    appointmentFee: "",
    qualification: "",
    licenseId: "",
    experience: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/psychologist/create-psychologistprofile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            name: session?.user?.name,
            email: session?.user?.email,
            appointmentFee: Number(formData.appointmentFee),
            experience: Number(formData.experience),
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Profile created successfully");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Psychologist Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input value={session?.user?.name ?? ""} readOnly />

            <Input value={session?.user?.email ?? ""} readOnly />

            <Input
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
            />

            <Textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <Input
              name="profilePhoto"
              placeholder="Profile Photo URL"
              value={formData.profilePhoto}
              onChange={handleChange}
            />

            <Input
              name="sector"
              placeholder="Sector:Clinical Psychologist,counseling psychologist"
              value={formData.sector}
              onChange={handleChange}
            />

            <Input
              name="availability"
              placeholder="Availability: sat:9am to 5pm,sun:10 am to 1 pm"
              value={formData.availability}
              onChange={handleChange}
            />

            <Textarea
              name="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
            />

            <Input
              name="licenseId"
              placeholder="License ID"
              value={formData.licenseId}
              onChange={handleChange}
            />

            <Input
              type="number"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
            />

            <Input
              type="number"
              name="appointmentFee"
              placeholder="Appointment Fee"
              value={formData.appointmentFee}
              onChange={handleChange}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
