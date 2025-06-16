
"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';
import { POKEMON_TYPES_COLORS, capitalize, ALL_POKEMON_TYPES } from '@/lib/pokemon';
import { cn } from '@/lib/utils';

export default function TypeFilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showTypeButtons, setShowTypeButtons] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const typesFromParams = searchParams.get('types');
    if (typesFromParams) {
      setSelectedTypes(new Set(typesFromParams.split(',').filter(type => ALL_POKEMON_TYPES.includes(type))));
    } else {
      setSelectedTypes(new Set());
    }
    // Decide if type buttons should be initially shown based on if filters are active
    if (typesFromParams && typesFromParams.length > 0) {
      setShowTypeButtons(true);
    }
  }, [searchParams]);

  const handleToggleShowTypes = () => {
    setShowTypeButtons(!showTypeButtons);
  };

  const handleTypeSelect = (type: string) => {
    const newSelectedTypes = new Set(selectedTypes);
    if (newSelectedTypes.has(type)) {
      newSelectedTypes.delete(type);
    } else {
      if (newSelectedTypes.size < 3) {
        newSelectedTypes.add(type);
      } else {
        // Optionally, provide feedback that max 3 types can be selected
        // For now, just don't add if already 3.
        alert("Você pode selecionar no máximo 3 tipos.");
        return; 
      }
    }
    setSelectedTypes(newSelectedTypes); // Optimistic update for UI responsiveness
    updateSearchParams(newSelectedTypes);
  };

  const updateSearchParams = (currentTypes: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentTypes.size > 0) {
      params.set('types', Array.from(currentTypes).join(','));
    } else {
      params.delete('types');
    }
    // Reset page to 1 when filters change
    params.set('page', '1'); 
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  const clearFilters = () => {
    setSelectedTypes(new Set());
    updateSearchParams(new Set());
    // setShowTypeButtons(false); // Keep open if user wants to select new types
  };

  return (
    <div className="my-6">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4">
        <Button onClick={handleToggleShowTypes} variant="outline" size="lg" className="flex-shrink-0">
          <Filter className="mr-2 h-5 w-5" />
          {showTypeButtons ? 'Esconder Tipos' : 'Filtrar por Tipo'}
        </Button>
        {selectedTypes.size > 0 && (
           <Button onClick={clearFilters} variant="ghost" size="lg" className="text-muted-foreground flex-shrink-0">
             <X className="mr-2 h-5 w-5" />
             Limpar ({selectedTypes.size})
           </Button>
        )}
      </div>

      {showTypeButtons && (
        <Card className="shadow-lg border-border/80 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl text-center font-semibold text-primary">Selecione até 3 tipos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {ALL_POKEMON_TYPES.map((type) => (
                <Button
                  key={type}
                  variant={'outline'}
                  onClick={() => handleTypeSelect(type)}
                  className={cn(
                    "transition-all duration-200 ease-in-out transform hover:scale-105 px-4 py-2 text-sm rounded-full border-2 shadow-sm",
                    selectedTypes.has(type) 
                      ? `${POKEMON_TYPES_COLORS[type] || 'bg-primary'} text-primary-foreground border-transparent shadow-md hover:${POKEMON_TYPES_COLORS[type] || 'bg-primary'}/90`
                      : `border-gray-300 dark:border-gray-600 hover:border-primary/70 hover:bg-accent/10 text-foreground`
                  )}
                  aria-pressed={selectedTypes.has(type)}
                >
                  {capitalize(type)}
                </Button>
              ))}
            </div>
             {selectedTypes.size === 3 && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Você atingiu o limite de 3 tipos.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
