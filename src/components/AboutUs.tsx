/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollageImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CollageImage = ({ src, alt, className }: CollageImageProps) => {
  return (
    <div
      className={cn("group relative overflow-hidden rounded-2xl", className)}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-2xl object-cover shadow-lg shadow-black/10 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 rounded-tl-2xl border-l-2 border-t-2 border-[#8FAF9F] transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-0 w-0 rounded-br-2xl border-b-2 border-r-2 border-[#8FAF9F] transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"
        aria-hidden="true"
      />
    </div>
  );
};

const AboutUs = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: image collage */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-5">
            <CollageImage
              src="https://images.pexels.com/photos/5234573/pexels-photo-5234573.jpeg"
              alt="A therapy session in progress"
              className="row-span-2"
            />
            <CollageImage
              src="https://images.pexels.com/photos/7447271/pexels-photo-7447271.jpeg"
              alt="A supportive conversation between therapist and client"
            />
            <CollageImage
              src="https://images.pexels.com/photos/4148905/pexels-photo-4148905.jpeg"
              alt="A calm, welcoming counseling space"
            />
          </div>

          {/* Right: title + copy */}
          <div className="flex flex-col items-start gap-6">
            <Badge
              variant="secondary"
              className="rounded-full border border-[#8FAF9F]/30 bg-[#8FAF9F]/10 px-4 py-1 text-sm font-normal text-[#3f5449]"
            >
              About Us
            </Badge>

            <h2 className="text-3xl font-light tracking-tight text-[#0f1f1c] sm:text-4xl lg:text-5xl">
              Care that meets you where you are
            </h2>

            <p className="text-lg text-muted-foreground">
              We started this practice on a simple belief: getting support
              shouldn&apos;t feel harder than the problem itself. Our licensed
              psychologists work with you at your pace, in a space built on
              trust, not judgment.
            </p>

            <p className="text-muted-foreground">
              Whether you&apos;re navigating a difficult relationship,
              recovering from a setback, or just need someone to talk to,
              we&apos;re here — in person or online, whenever you&apos;re ready.
            </p>

            <Button
              size="lg"
              className="mt-2 w-fit bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d]"
              render={<a href="#learn-more" />}
              nativeButton={false}
            >
              Learn More
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutUs };
