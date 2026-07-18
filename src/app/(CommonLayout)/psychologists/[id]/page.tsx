import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Briefcase,
  CalendarClock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getFallbackPhoto,
  isUsablePhoto,
} from "@/app/ui-components/psychologist-card";
import { PsychologistImage } from "@/app/ui-components/psychologist-image";
import BookAppointmentDialog from "@/app/ui-components/book-appointment-dialog";
// import { PsychologistImage } from "@/components/psychologist-image";
// import {
//   getFallbackPhoto,
//   isUsablePhoto,
// } from "@/components/psychologist-card";

interface PsychologistDetail {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  address: string;
  contactNumber: string;
  verified: boolean;
  sector: string;
  availability: string;
  appointmentFee: number;
  qualification: string;
  licenseId: string;
  experience: number;
}

interface ApiResponse {
  success: boolean;
  data: PsychologistDetail;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

const getPsychologist = async (
  id: string,
): Promise<PsychologistDetail | null> => {
  try {
    const res = await fetch(`${API_URL}/psychologist/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json: ApiResponse = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: PageProps) => {
  const { id } = await params;
  const psychologist = await getPsychologist(id);
  if (!psychologist) return { title: "Psychologist not found" };
  return {
    title: `${psychologist.name} — ${psychologist.sector}`,
    description: psychologist.qualification,
  };
};

const PsychologistDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const psychologist = await getPsychologist(id);

  if (!psychologist) {
    notFound();
  }

  const photo = isUsablePhoto(psychologist.profilePhoto)
    ? (psychologist.profilePhoto as string)
    : getFallbackPhoto(psychologist.id);
  const fallback = getFallbackPhoto(psychologist.id);

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
          {/* Left: photo + quick contact card */}
          <div className="flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-2xl">
              <PsychologistImage
                src={photo}
                fallbackSrc={fallback}
                alt={psychologist.name}
              />
              {psychologist.verified && (
                <Badge className="absolute right-3 top-3 gap-1 bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#0f1f1c]">
                  <BadgeCheck className="size-3.5" />
                  Verified
                </Badge>
              )}
            </div>

            <Card className="flex flex-col gap-4 border-none p-6 shadow-lg shadow-black/5">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="size-4 shrink-0 text-[#8FAF9F]" />
                <a
                  href={`tel:${psychologist.contactNumber}`}
                  className="hover:text-[#0f1f1c]"
                >
                  {psychologist.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0 text-[#8FAF9F]" />
                <a
                  href={`mailto:${psychologist.email}`}
                  className="truncate hover:text-[#0f1f1c]"
                >
                  {psychologist.email}
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#8FAF9F]" />
                <span>{psychologist.address}</span>
              </div>

              {/* <Button
                size="lg"
                className="mt-2 w-full bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d]"
                render={
                  <Link
                    href={`/book-appointment?psychologistId=${psychologist.id}`}
                  />
                }
                nativeButton={false}
              >
                Book Appointment
              </Button> */}

              <BookAppointmentDialog
                psychologistId={psychologist.id}
                psychologistName={psychologist.name}
                availability={psychologist.availability}
                appointmentFee={psychologist.appointmentFee}
              />
            </Card>
          </div>

          {/* Right: details */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-light tracking-tight text-[#0f1f1c] sm:text-4xl">
                  {psychologist.name}
                </h1>
                {psychologist.verified && (
                  <Badge
                    variant="secondary"
                    className="gap-1 rounded-full bg-[#8FAF9F]/15 text-[#3f5449]"
                  >
                    <ShieldCheck className="size-3.5" />
                    Verified professional
                  </Badge>
                )}
              </div>
              <p className="text-lg text-[#3f5449]">{psychologist.sector}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Card className="flex flex-col gap-1 border-none bg-[#8FAF9F]/10 p-4">
                <span className="text-xs text-muted-foreground">
                  Experience
                </span>
                <span className="text-lg font-semibold text-[#0f1f1c]">
                  {psychologist.experience}+ yrs
                </span>
              </Card>
              <Card className="flex flex-col gap-1 border-none bg-[#8FAF9F]/10 p-4">
                <span className="text-xs text-muted-foreground">
                  Session fee
                </span>
                <span className="text-lg font-semibold text-[#0f1f1c]">
                  ৳{psychologist.appointmentFee}
                </span>
              </Card>
              <Card className="col-span-2 flex flex-col gap-1 border-none bg-[#8FAF9F]/10 p-4 sm:col-span-1">
                <span className="text-xs text-muted-foreground">
                  License ID
                </span>
                <span className="truncate text-lg font-semibold text-[#0f1f1c]">
                  {psychologist.licenseId}
                </span>
              </Card>
              <Card className="col-span-2 flex flex-col gap-1 border-none bg-[#8FAF9F]/10 p-4 sm:col-span-1">
                <span className="text-xs text-muted-foreground">
                  Availability
                </span>
                <span className="text-sm font-medium text-[#0f1f1c]">
                  {psychologist.availability}
                </span>
              </Card>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-2">
                <Award className="size-5 text-[#8FAF9F]" />
                <h2 className="text-xl font-medium text-[#0f1f1c]">
                  Qualification
                </h2>
              </div>
              <p className="text-muted-foreground">
                {psychologist.qualification}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-2">
                <Briefcase className="size-5 text-[#8FAF9F]" />
                <h2 className="text-xl font-medium text-[#0f1f1c]">
                  Specialization
                </h2>
              </div>
              <p className="text-muted-foreground">
                Focused on {psychologist.sector.toLowerCase()}, with{" "}
                {psychologist.experience}+ years supporting clients through
                personalized, evidence-based care.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-5 text-[#8FAF9F]" />
                <h2 className="text-xl font-medium text-[#0f1f1c]">
                  Availability
                </h2>
              </div>
              <p className="text-muted-foreground">
                {psychologist.availability}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychologistDetailPage;
