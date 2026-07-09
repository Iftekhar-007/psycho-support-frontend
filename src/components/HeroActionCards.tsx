import { ArrowRight, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const issues = [
  "Family Problems",
  "Breakups",
  "Business Failure",
  "Stress Issues",
  "Online Sessions",
];

const HeroActionCards = () => {
  return (
    <div className="container relative z-20 mx-auto -mt-24 px-6 sm:-mt-28 md:-mt-32">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 — What can we help with */}
        <Card className="flex flex-col justify-between gap-6 border-none bg-white p-8 shadow-xl shadow-black/10 sm:p-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-light tracking-tight text-[#0f1f1c] sm:text-3xl">
              How can I help you?
            </h2>
            <p className="text-muted-foreground">
              If you&apos;re experiencing any kind of mental illness or problem
              in relations.
            </p>
            <div className="flex flex-wrap gap-2">
              {issues.map((issue) => (
                <Badge
                  key={issue}
                  variant="secondary"
                  className="rounded-full border border-[#8FAF9F]/30 bg-[#8FAF9F]/10 px-3 py-1 text-sm font-normal text-[#3f5449] hover:bg-[#8FAF9F]/20"
                >
                  {issue}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            className="w-fit bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d]"
            render={
              <a href="https://www.slashcreative.co/themes/psychare/programs/" />
            }
            nativeButton={false}
          >
            Explore Programs
            <ArrowRight className="size-4" />
          </Button>
        </Card>

        {/* Card 2 — Call for consultation */}
        <Card className="flex flex-col justify-between gap-6 border-none bg-[#8FAF9F] p-8 shadow-xl shadow-black/10 sm:p-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-light tracking-tight text-[#0f1f1c] sm:text-3xl">
              Call for Consultation
            </h2>
            <p className="text-[#0f1f1c]/80">
              30 minutes free for the first session.{" "}
              <a
                href="http://www.slashcreative.co/themes/psychare/#"
                className="underline underline-offset-2 hover:text-[#0f1f1c]"
              >
                T&amp;C Apply
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#0f1f1c] text-[#F7F5F0]">
              <Phone className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-[#0f1f1c]/70">
                Dial Now
              </p>
              <a
                href="tel:9211249220"
                className="text-2xl font-semibold tracking-tight text-[#0f1f1c] sm:text-3xl"
              >
                921-124-9220
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { HeroActionCards };
