/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import { ArrowRight, Star } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}
interface Button {
  text: string;
  url: string;
  icon?: React.ReactNode;
}
interface Buttons {
  primary?: Button;
  secondary?: Button;
}

interface HeroBasicProps {
  heading: string;
  description: string;
  buttons?: Buttons;
  image: Image;
  className?: string;
}

interface Hero3Props extends HeroBasicProps {
  reviews?: Hero3Reviews;
}
type Props = Partial<Hero3Props>;

interface Hero3Reviews {
  count: number;
  rating: number;
  avatars: { src: string; alt: string }[];
}

const defaultProps: Hero3Props = {
  heading: "You don't have to carry this alone",
  description:
    "Confidential, compassionate support from licensed psychologists — whenever you're ready to talk.",
  buttons: {
    primary: {
      text: "Book a session",
      url: "#book",
    },
    secondary: {
      text: "Meet our therapists",
      url: "#team",
    },
  },
  image: {
    src: "https://www.haymsalomonhome.com/wp-content/uploads/2019/04/psychological-support-brooklyn.jpg",
    alt: "A calm, supportive therapy conversation",
  },
  reviews: {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/avatars/avatar1.jpg",
        alt: "Mia Chen",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/avatars/avatar2.jpg",
        alt: "Marcus Rivera",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/avatars/avatar3.jpg",
        alt: "Priya Sharma",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/avatars/avatar4.jpg",
        alt: "James Okafor",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/avatars/avatar5.jpg",
        alt: "Sofia Chen",
      },
    ],
  },
};

const MAX_REVIEW_AVATARS = 5;

const Hero3 = (props: Props) => {
  const { heading, description, buttons, reviews, image, className } = {
    ...defaultProps,
    ...props,
  };

  const reviewAvatars = (reviews?.avatars ?? []).slice(0, MAX_REVIEW_AVATARS);

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[90vh] items-center overflow-hidden",
        className,
      )}
    >
      {/* Background photo */}
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Gradient overlay for readability + mood */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,31,28,0.75) 0%, rgba(15,31,28,0.55) 35%, rgba(15,31,28,0.85) 100%), linear-gradient(90deg, rgba(15,31,28,0.9) 0%, rgba(15,31,28,0.3) 60%, rgba(15,31,28,0.1) 100%)",
        }}
      />

      {/* Fade-to-page mask at the bottom, so the photo dissolves rather than cutting off */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 sm:h-40"
        style={{
          background: "linear-gradient(180deg, rgba(15,31,28,0) 0%)",
        }}
      />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 py-24 text-left">
          <h1 className="animate-in fade-in slide-in-from-bottom-3 text-4xl font-light leading-[1.1] tracking-tight text-[#F7F5F0] duration-[1400ms] ease-out fill-mode-both lg:text-6xl">
            {heading}
          </h1>

          <p className="animate-in fade-in slide-in-from-bottom-2 max-w-lg text-balance text-lg text-[#E4E1D8]/90 duration-[1400ms] ease-out fill-mode-both [animation-delay:250ms]">
            {description}
          </p>

          {reviews && (
            <div className="animate-in fade-in flex w-fit flex-col items-center gap-4 duration-[1400ms] ease-out fill-mode-both [animation-delay:500ms] sm:flex-row">
              <span className="inline-flex items-center -space-x-3">
                {reviewAvatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className="size-10 bg-background ring-2 ring-[#0f1f1c] after:hidden"
                  >
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                  </Avatar>
                ))}
              </span>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-[#8FAF9F] stroke-[#8FAF9F]"
                    />
                  ))}
                  <span className="ml-1 font-semibold text-[#F7F5F0]">
                    {reviews.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-left text-sm font-medium text-[#E4E1D8]/80">
                  // eslint-disable-next-line react/no-unescaped-entities from{" "}
                  {reviews.count}+ people we've supported
                </p>
              </div>
            </div>
          )}

          <div className="animate-in fade-in slide-in-from-bottom-2 flex w-full flex-col justify-start gap-3 pt-2 duration-[1400ms] ease-out fill-mode-both [animation-delay:650ms] sm:flex-row">
            {buttons?.primary && (
              <Button
                size="lg"
                className="w-full bg-[#8FAF9F] text-[#0f1f1c] hover:bg-[#7fa090] sm:w-auto"
                render={<a href={buttons.primary.url} />}
                nativeButton={false}
              >
                {buttons.primary.text}
                <ArrowRight className="size-4" />
              </Button>
            )}
            {buttons?.secondary && (
              <Button
                variant="outline"
                size="lg"
                className="w-full border-[#E4E1D8]/40 bg-transparent text-[#F7F5F0] hover:bg-white/10 sm:w-auto"
                render={<a href={buttons.secondary.url} />}
                nativeButton={false}
              >
                {buttons.secondary.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero3 };
