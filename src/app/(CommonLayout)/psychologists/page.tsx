// import { OurPsychologists } from "@/app/ui-components/our-psychologists";
// import React from "react";

// const Psychologists = () => {
//   return (
//     <div>
//       <OurPsychologists />
//     </div>
//   );
// };

// export default Psychologists;

import { Badge } from "@/components/ui/badge";
import {
  PsychologistCard,
  type Psychologist,
} from "@/app/ui-components/psychologist-card";
import { Pagination } from "@/app/utils/pagination";
// import { Pagination } from "@/components/pagination";

interface ApiResponse {
  success: boolean;
  data: Psychologist[];
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
const PER_PAGE = 8;

const getPsychologists = async (): Promise<Psychologist[]> => {
  try {
    const res = await fetch(`${API_URL}/psychologist/all-psychologists`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json: ApiResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const PsychologistsPage = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const all = await getPsychologists();

  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

  const start = (currentPage - 1) * PER_PAGE;
  const visible = all.slice(start, start + PER_PAGE);

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
          <h1 className="text-3xl font-light tracking-tight text-[#0f1f1c] sm:text-4xl">
            All Psychologists
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Browse our full team and find the right fit for you.
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No psychologists to show right now — check back soon.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((p) => (
                <PsychologistCard key={p.id} psychologist={p} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/psychologists"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default PsychologistsPage;
