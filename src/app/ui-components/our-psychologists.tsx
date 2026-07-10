import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PsychologistImage } from "./psychologist-image";

interface Psychologist {
  id: string;
  name: string;
  profilePhoto: string | null;
  sector: string;
  availability: string;
  appointmentFee: number;
  qualification: string;
  experience: number;
  verified: boolean;
}

interface ApiResponse {
  success: boolean;
  data: Psychologist[];
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
const MAX_DISPLAY = 4;

const getFallbackPhoto = (seed: string) =>
  `https://i.pravatar.cc/400?img=${(seed.charCodeAt(0) + seed.length) % 70}`;

const isUsablePhoto = (url: string | null) => {
  if (!url) return false;
  if (url.includes("example.com")) return false;
  return true;
};

const getPsychologists = async (): Promise<Psychologist[]> => {
  try {
    const res = await fetch(`${API_URL}/psychologist/all-psychologists`, {
      // ISR: re-fetch at most every 60s instead of on every request
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json: ApiResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
};

const PsychologistCard = ({ psychologist }: { psychologist: Psychologist }) => {
  const photo = isUsablePhoto(psychologist.profilePhoto)
    ? (psychologist.profilePhoto as string)
    : getFallbackPhoto(psychologist.id);
  const fallback = getFallbackPhoto(psychologist.id);

  return (
    <Card className="group flex flex-col overflow-hidden border-none p-0 shadow-lg shadow-black/5">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
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

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-medium text-[#0f1f1c]">
            {psychologist.name}
          </h3>
          <p className="text-sm text-[#3f5449]">{psychologist.sector}</p>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {psychologist.qualification}
        </p>

        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-[#8FAF9F]" />
            {psychologist.experience}+ years experience
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="size-4 text-[#8FAF9F]" />
            <span className="truncate">{psychologist.availability}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-semibold text-[#0f1f1c]">
            ৳{psychologist.appointmentFee}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              / session
            </span>
          </span>
          <Button
            size="sm"
            className="bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d]"
            render={<Link href={`/psychologists/${psychologist.id}`} />}
            nativeButton={false}
          >
            Book
          </Button>
        </div>
      </div>
    </Card>
  );
};

const OurPsychologists = async () => {
  const psychologists = await getPsychologists();
  const visible = psychologists.slice(0, MAX_DISPLAY);

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <Badge
            variant="secondary"
            className="rounded-full border border-[#8FAF9F]/30 bg-[#8FAF9F]/10 px-4 py-1 text-sm font-normal text-[#3f5449]"
          >
            Our Team
          </Badge>
          <h2 className="text-3xl font-light tracking-tight text-[#0f1f1c] sm:text-4xl">
            Meet our psychologists
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Licensed professionals, each with their own specialty — find the
            right fit for you.
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No psychologists to show right now — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <PsychologistCard key={p.id} psychologist={p} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            className="border-[#0f1f1c]/20"
            render={<Link href="/psychologists" />}
            nativeButton={false}
          >
            See All Psychologists
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { OurPsychologists };
