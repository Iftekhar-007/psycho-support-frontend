import { Quote } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const InsightSpotlight = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 overflow-hidden rounded-3xl bg-[#0f1f1c] lg:grid-cols-2 lg:gap-0">
          {/* Left: thoughts */}
          <div className="flex flex-col gap-6 px-6 py-14 sm:px-12 sm:py-16 lg:py-20">
            <Quote className="size-10 text-[#8FAF9F]/40" />

            <Badge
              variant="secondary"
              className="w-fit rounded-full border border-[#8FAF9F]/30 bg-[#8FAF9F]/10 px-4 py-1 text-sm font-normal text-[#8FAF9F]"
            >
              A Thought From Our Team
            </Badge>

            <p className="text-xl font-light leading-relaxed text-[#F7F5F0] sm:text-2xl lg:text-[1.7rem]">
              &ldquo;People often come to me expecting to be fixed. But healing
              isn&apos;t about becoming a different person — it&apos;s about
              learning to sit with who you already are, a little more gently
              each time.&rdquo;
            </p>

            <p className="max-w-md text-[#E4E1D8]/70">
              After a decade of practice, I&apos;ve learned that the smallest
              shifts — a kinder inner voice, a boundary finally spoken out loud
              — often matter more than any single breakthrough.
            </p>

            <div className="mt-4 flex items-center gap-4">
              <Avatar className="size-14 ring-2 ring-[#8FAF9F]/40">
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Dr. Ayesha Rahman"
                />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-[#F7F5F0]">Dr. Ayesha Rahman</p>
                <p className="text-sm text-[#8FAF9F]">
                  Clinical Psychologist, 10+ years
                </p>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-full lg:min-h-[560px]">
            <img
              src="https://images.pexels.com/photos/5234573/pexels-photo-5234573.jpeg"
              alt="Dr. Ayesha Rahman"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 lg:bg-[linear-gradient(90deg,rgba(15,31,28,0.5)_0%,rgba(15,31,28,0)_25%)]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { InsightSpotlight };
