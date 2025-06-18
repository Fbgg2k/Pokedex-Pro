
"use client"; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center p-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-3xl font-bold text-destructive mb-2">Oops! Something went wrong.</h2>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">
        We encountered an unexpected issue. Please try again, or if the problem persists, contact support.
      </p>
      {error.message && (
         <p className="text-sm text-muted-foreground mb-1">Error: {error.message}</p>
      )}
      {error.digest && (
        <p className="text-xs text-muted-foreground/70 mb-6">Digest: {error.digest}</p>
      )}
      <Button
        onClick={() => reset()}
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Try Again
      </Button>
    </div>
  );
}
