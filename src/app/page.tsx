
import { fetchPokemonList, capitalize } from '@/lib/pokemon';
import ClientPokemonGrid from '@/components/pokemon/client-pokemon-grid';
import PaginationControls from '@/components/pokemon/pagination-controls';
import TypeFilterControls from '@/components/pokemon/type-filter-controls';
import { Suspense } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ListFilter } from 'lucide-react';
import { Card } from '@/components/ui/card';


export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams?: {
    page?: string;
    types?: string; 
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const selectedTypesString = searchParams?.types || '';
  const selectedTypesArray = selectedTypesString ? selectedTypesString.split(',') : [];

  const { pokemon, totalPages, totalCount } = await fetchPokemonList(currentPage, 20, selectedTypesArray);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary font-headline tracking-tight">
        Explore Pokémon
      </h1>
      
      <TypeFilterControls />

      {totalCount > 0 && (
        <p className="text-center text-lg text-muted-foreground -mt-4">
          {selectedTypesArray.length > 0 
            ? `${totalCount} Pokémon encontrados com os tipos: ${selectedTypesArray.map(type => capitalize(type)).join(', ')}`
            : `${totalCount} Pokémon no total`
          }
        </p>
      )}

      {selectedTypesArray.length > 0 && pokemon.length === 0 && !totalCount && (
        <Alert variant="default" className="max-w-xl mx-auto bg-card shadow-md">
          <ListFilter className="h-5 w-5 text-primary" />
          <AlertTitle className="text-destructive">Nenhum Pokémon Encontrado</AlertTitle>
          <AlertDescription>
            Não foram encontrados Pokémon com a combinação de tipos selecionada: {selectedTypesArray.map(type => capitalize(type)).join(', ')}. Tente uma combinação diferente ou limpe os filtros.
          </AlertDescription>
        </Alert>
      )}
      
      <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"><LoadingPokemonCards /></div>}>
        <ClientPokemonGrid pokemonList={pokemon} />
      </Suspense>
      
      {pokemon.length > 0 && totalPages > 1 && (
         <PaginationControls totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}

function LoadingPokemonCards() {
  return Array.from({ length: 10 }).map((_, i) => (
    <Card key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-0 relative aspect-square flex items-center justify-center bg-muted/50 rounded-t-lg">
        <div className="w-3/4 h-3/4 bg-muted rounded"></div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
      </div>
    </Card>
  ));
}
