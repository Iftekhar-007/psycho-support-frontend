import { Heart, MessageCircleHeart, Sparkles, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Users className="size-6" />,
    value: "45+",
    label: "Licensed psychologists",
  },
  {
    icon: <Heart className="size-6" />,
    value: "4,000+",
    label: "Clients supported",
  },
  {
    icon: <MessageCircleHeart className="size-6" />,
    value: "18,000+",
    label: "Sessions completed",
  },
  {
    icon: <Sparkles className="size-6" />,
    value: "98%",
    label: "Client satisfaction",
  },
];

const OurRecords = () => {
  return (
    <section className="bg-[#0f1f1c] py-24 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-3xl font-light tracking-tight text-[#F7F5F0] sm:text-4xl">
            Our track record
          </h2>
          <p className="mt-3 text-[#E4E1D8]/70">
            Numbers don&apos;t capture every conversation, but they show the
            trust people place in us.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="flex flex-col items-center gap-3 border-none bg-white/5 px-4 py-8 text-center backdrop-blur-sm sm:px-6"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-[#8FAF9F]/15 text-[#8FAF9F]">
                {stat.icon}
              </div>
              <p className="text-3xl font-semibold tracking-tight text-[#F7F5F0] sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-[#E4E1D8]/70">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { OurRecords };
