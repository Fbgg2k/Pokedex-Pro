
import { fetchPokemonList } from '@/lib/pokemon';
import ClientPokemonGrid from '@/components/pokemon/client-pokemon-grid';
import PaginationControls from '@/components/pokemon/pagination-controls';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner'; // Generic loading spinner

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

interface HomePageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const { pokemon, totalPages } = await fetchPokemonList(currentPage, 20);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary font-headline tracking-tight">
        Explore Pokémon
      </h1>
      <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"><LoadingPokemonCards /></div>}>
        <ClientPokemonGrid pokemonList={pokemon} />
      </Suspense>
      <PaginationControls totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}

function LoadingPokemonCards() {
  return Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-0 relative aspect-square flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-t-lg">
        <div className="w-3/4 h-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto"></div>
      </div>
    </div>
  ));
}
