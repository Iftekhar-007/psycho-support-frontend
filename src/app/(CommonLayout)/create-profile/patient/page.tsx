/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { ImageIcon, Mail, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreatePatientProfile = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    contactNumber: "",
    address: "",
    profilePhoto: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/patient/create-patientprofile`,
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
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Patient profile created successfully");

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="mx-auto w-full max-w-3xl border-0 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Create Patient Profile
          </CardTitle>
          <CardDescription>
            Complete your profile to start using our mental health platform.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <Label>Name</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={session?.user?.name ?? ""}
                    readOnly
                    className="pl-10 bg-muted"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={session?.user?.email ?? ""}
                    readOnly
                    className="pl-10 bg-muted"
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="contactNumber"
                  placeholder="+8801XXXXXXXXX"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="relative">
                <MapPin className="absolute top-4 left-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  name="address"
                  placeholder="Enter your full address..."
                  value={formData.address}
                  onChange={handleChange}
                  className="min-h-28 pl-10"
                  required
                />
              </div>
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <Label>Profile Photo URL</Label>
              <div className="relative">
                <ImageIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="profilePhoto"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.profilePhoto}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full text-base font-semibold"
            >
              {loading ? "Creating Profile..." : "Create Patient Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePatientProfile;
