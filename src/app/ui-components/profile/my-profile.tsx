import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MyProfileResponse,
  PatientProfile,
  PsychologistProfile,
} from "@/types/profiles";

import ProfileInfoItem from "./ProfileInfoItem";

interface FieldConfig<T> {
  label: string;
  render: (profile: T) => React.ReactNode;
}

// One config per role — add/remove fields here only, nowhere else.
const psychologistFields: FieldConfig<PsychologistProfile>[] = [
  { label: "Sector", render: (p) => p.sector },
  {
    label: "Experience",
    render: (p) => (p.experience ? `${p.experience} yrs` : undefined),
  },
  {
    label: "Appointment Fee",
    render: (p) => (p.appointmentFee ? `৳${p.appointmentFee}` : undefined),
  },
  { label: "Availability", render: (p) => p.availability },
  { label: "Qualification", render: (p) => p.qualification },
  { label: "License ID", render: (p) => p.licenseId },
  { label: "Contact Number", render: (p) => p.contactNumber },
  { label: "Address", render: (p) => p.address },
];

const patientFields: FieldConfig<PatientProfile>[] = [
  { label: "Age", render: (p) => p.age },
  { label: "Gender", render: (p) => p.gender },
  { label: "Blood Group", render: (p) => p.bloodGroup },
  { label: "Contact Number", render: (p) => p.contactNumber },
  { label: "Address", render: (p) => p.address },
];

const roleBadgeLabel: Record<string, string> = {
  PATIENT: "Patient",
  PSYCHOLOGIST: "Psychologist",
  ADMIN: "Admin",
  USER: "User",
};

interface MyProfileProps {
  user: MyProfileResponse;
}

const MyProfile = ({ user }: MyProfileProps) => {
  const profile = user.profile;

  const fields =
    user.role === "PSYCHOLOGIST"
      ? psychologistFields
      : user.role === "PATIENT"
        ? patientFields
        : [];

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card className="border-[#8FAF9F]/30 bg-[#F7F5F0]">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16 border border-[#8FAF9F]">
            <AvatarImage
              src={profile?.profilePhoto ?? undefined}
              alt={user.name}
            />
            <AvatarFallback className="bg-[#8FAF9F] text-[#0f1f1c]">
              {user.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-[#0f1f1c]">
              {user.name}
            </h2>
            <p className="text-sm text-[#0f1f1c]/60">{user.email}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Badge className="bg-[#0f1f1c] text-[#F7F5F0]">
                {roleBadgeLabel[user.role] ?? user.role}
              </Badge>

              {user.role === "PSYCHOLOGIST" && (
                <>
                  {user.profile?.verified ? (
                    <Badge
                      variant="outline"
                      className="border-[#8FAF9F] text-[#0f1f1c]"
                    >
                      Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-destructive text-destructive"
                    >
                      Not Verified
                    </Badge>
                  )}
                  {user.profile?.status && (
                    <Badge variant="secondary">{user.profile.status}</Badge>
                  )}
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {fields.length > 0 && (
          <>
            <Separator className="bg-[#8FAF9F]/30" />
            <CardContent className="grid grid-cols-2 gap-6 pt-6">
              {fields.map((field) => (
                <ProfileInfoItem
                  key={field.label}
                  label={field.label}
                  // profile is typed per-role above but narrowed at runtime by `user.role`,
                  // so the cast here is safe — TS can't infer the union collapse on its own.
                  value={
                    profile
                      ? field.render(
                          profile as PatientProfile & PsychologistProfile,
                        )
                      : undefined
                  }
                />
              ))}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default MyProfile;
