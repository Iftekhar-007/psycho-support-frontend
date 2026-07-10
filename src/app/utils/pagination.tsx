import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const buildHref = (basePath: string, page: number) =>
  page <= 1 ? basePath : `${basePath}?page=${page}`;

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Psychologists pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        className="border-[#0f1f1c]/20"
        render={
          currentPage === 1 ? undefined : (
            <Link
              href={buildHref(basePath, currentPage - 1)}
              aria-label="Previous page"
            />
          )
        }
        nativeButton={currentPage === 1}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          className={cn(
            page === currentPage
              ? "bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d]"
              : "border-[#0f1f1c]/20",
          )}
          render={
            page === currentPage ? undefined : (
              <Link href={buildHref(basePath, page)} />
            )
          }
          nativeButton={page === currentPage}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        className="border-[#0f1f1c]/20"
        render={
          currentPage === totalPages ? undefined : (
            <Link
              href={buildHref(basePath, currentPage + 1)}
              aria-label="Next page"
            />
          )
        }
        nativeButton={currentPage === totalPages}
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
};

export { Pagination };
