
"use client";

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  baseUrl?: string; // Optional: if navigation is not based on query params
}

export default function PaginationControls({ totalPages, currentPage, baseUrl = '' }: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${baseUrl || pathname}?${params.toString()}`;
  };

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 py-8">
      <Button 
        asChild 
        variant="outline" 
        size="lg" 
        disabled={!hasPreviousPage} 
        className={cn(!hasPreviousPage && "opacity-50 cursor-not-allowed", "w-full sm:w-auto")}
      >
        <Link href={createPageURL(currentPage - 1)} scroll={false} aria-disabled={!hasPreviousPage} tabIndex={!hasPreviousPage ? -1 : undefined}>
          <ChevronLeft className="mr-2 h-5 w-5" />
          Previous
        </Link>
      </Button>
      <span className="text-lg font-medium text-foreground order-first sm:order-none">
        Page {currentPage} of {totalPages}
      </span>
      <Button 
        asChild 
        variant="outline" 
        size="lg" 
        disabled={!hasNextPage} 
        className={cn(!hasNextPage && "opacity-50 cursor-not-allowed", "w-full sm:w-auto")}
      >
        <Link href={createPageURL(currentPage + 1)} scroll={false} aria-disabled={!hasNextPage} tabIndex={!hasNextPage ? -1 : undefined}>
          Next
          <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
