
"use client"; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function PokemonDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error loading Pokémon details:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center p-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-3xl font-bold text-destructive mb-2">Could Not Load Pokémon</h2>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">
        There was an issue fetching the details for this Pokémon. It might not exist or there could be a network problem.
      </p>
       {error.message && (
         <p className="text-sm text-muted-foreground mb-1">Details: {error.message}</p>
      )}
      {error.digest && (
        <p className="text-xs text-muted-foreground/70 mb-6">Error Code: {error.digest}</p>
      )}
      <div className="flex space-x-4">
        <Button
          onClick={() => reset()}
          size="lg"
          variant="outline"
        >
          Try Again
        </Button>
        <Button asChild size="lg">
            <Link href="/">Back to Pokedex</Link>
        </Button>
      </div>
    </div>
  );
}
