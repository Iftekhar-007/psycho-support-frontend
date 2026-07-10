import Link from "next/link";
import { BadgeCheck, Briefcase, CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PsychologistImage } from "./psychologist-image";

export interface Psychologist {
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

export const getFallbackPhoto = (seed: string) =>
  `https://i.pravatar.cc/400?img=${(seed.charCodeAt(0) + seed.length) % 70}`;

export const isUsablePhoto = (url: string | null) => {
  if (!url) return false;
  if (url.includes("example.com")) return false;
  return true;
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

export { PsychologistCard };
