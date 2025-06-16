
import { fetchPokemonDetails, fetchPokemonSpecies, capitalize, POKEMON_TYPES_COLORS, getPokemonImageUrl } from '@/lib/pokemon';
import type { PokemonDetails as PokemonDetailsType, PokemonSpecies as PokemonSpeciesType, FlavorTextEntry } from '@/lib/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FavoriteToggleButton from '@/components/pokemon/favorite-toggle-button';
import Link from 'next/link';
import { ArrowLeft, Maximize, Minimize, Weight, Ruler, Zap, Shield, Sparkles, Brain, BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface PokemonPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PokemonPageProps) {
  const pokemon = await fetchPokemonDetails(params.id);
  if (!pokemon) {
    return { title: 'Pokemon Not Found' };
  }
  return {
    title: `${capitalize(pokemon.name)} | Pokedex Pro`,
    description: `Details for Pokémon ${capitalize(pokemon.name)}, ID #${pokemon.id}.`,
  };
}

const StatDisplay: React.FC<{ label: string; value: number; maxValue?: number; icon?: React.ElementType }> = ({ label, value, maxValue = 255, icon: Icon }) => (
  <div className="flex flex-col space-y-1">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-muted-foreground flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-primary" />}
        {label}
      </span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
    <Progress value={(value / maxValue) * 100} aria-label={`${label} stat: ${value}`} className="h-2"/>
  </div>
);


export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemon = await fetchPokemonDetails(params.id);
  const species = await fetchPokemonSpecies(params.id);

  if (!pokemon) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Pokémon Not Found</h1>
        <p className="text-muted-foreground">The Pokémon with ID or name "{params.id}" could not be found.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to Pokedex
          </Link>
        </Button>
      </div>
    );
  }

  const mainImageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || getPokemonImageUrl(pokemon.id);
  const englishFlavorTexts = species?.flavor_text_entries
    .filter((entry: FlavorTextEntry) => entry.language.name === 'en')
    .slice(0, 3) // Take first 3 unique descriptions
    .map(entry => entry.flavor_text.replace(/[\n\f\r]/g, " ")) || [];
  
  const genus = species?.genera?.find(g => g.language.name === 'en')?.genus || 'Unknown Pokémon';

  const otherImages = [
    { src: pokemon.sprites.front_shiny, alt: 'Shiny sprite', dataAiHint: "pokemon shiny" },
    { src: pokemon.sprites.back_default, alt: 'Back default sprite', dataAiHint: "pokemon back" },
    { src: pokemon.sprites.back_shiny, alt: 'Back shiny sprite', dataAiHint: "pokemon shiny back" },
    { src: pokemon.sprites.other?.dream_world?.front_default, alt: 'Dream world sprite', dataAiHint: "pokemon dream" },
  ].filter(img => img.src);


  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <Button asChild variant="outline" className="mb-6 group">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Pokedex
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-2xl">
        <CardHeader className="p-0 relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-6 md:p-8 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-sm font-medium text-muted-foreground">#{String(pokemon.id).padStart(4, '0')}</span>
                <FavoriteToggleButton pokemonId={pokemon.id} pokemonName={pokemon.name} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-1 text-center md:text-left">{capitalize(pokemon.name)}</h1>
              <p className="text-lg text-muted-foreground mb-4 text-center md:text-left">{genus}</p>
              <div className="flex space-x-2 justify-center md:justify-start">
                {pokemon.types.map(typeInfo => (
                  <Badge
                    key={typeInfo.type.name}
                    className={`${POKEMON_TYPES_COLORS[typeInfo.type.name] || 'bg-gray-500'} text-white px-3 py-1 text-sm shadow-md border-transparent`}
                  >
                    {capitalize(typeInfo.type.name)}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="relative aspect-square flex items-center justify-center p-4 md:p-2">
              {mainImageUrl && (
                <Image
                  src={mainImageUrl}
                  alt={capitalize(pokemon.name)}
                  width={300}
                  height={300}
                  priority
                  className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                  data-ai-hint="pokemon character large"
                  unoptimized={true}
                />
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="abilities">Abilities</TabsTrigger>
              <TabsTrigger value="sprites">Sprites</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center"><BookOpen className="mr-2 h-5 w-5 text-primary" />Description</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-foreground/90">
                  {englishFlavorTexts.length > 0 ? (
                    englishFlavorTexts.map((text, index) => <p key={index}>{text}</p>)
                  ) : (
                    <p>No description available for this Pokémon.</p>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><Ruler className="mr-2 h-5 w-5 text-primary"/>Height</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-semibold">{(pokemon.height / 10).toFixed(1)} m</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><Weight className="mr-2 h-5 w-5 text-primary"/>Weight</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p></CardContent>
                </Card>
                 <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><Sparkles className="mr-2 h-5 w-5 text-primary"/>Base Exp.</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-semibold">{pokemon.base_experience}</p></CardContent>
                </Card>
                {species?.capture_rate && (
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><Maximize className="mr-2 h-5 w-5 text-primary"/>Capture Rate</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-semibold">{species.capture_rate}</p></CardContent>
                </Card>
                )}
                {species?.habitat && (
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><Home className="mr-2 h-5 w-5 text-primary"/>Habitat</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-semibold">{capitalize(species.habitat.name)}</p></CardContent>
                </Card>
                )}
                {species?.evolves_from_species && (
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><ArrowLeft className="mr-2 h-5 w-5 text-primary"/>Evolves From</CardTitle></CardHeader>
                  <CardContent>
                     <Link href={`/pokemon/${species.evolves_from_species.name}`} className="text-accent hover:underline text-2xl font-semibold">
                      {capitalize(species.evolves_from_species.name)}
                     </Link>
                  </CardContent>
                </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
               <Card>
                <CardHeader><CardTitle className="text-xl flex items-center"><Zap className="mr-2 h-5 w-5 text-primary" />Base Stats</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {pokemon.stats.map(statInfo => (
                    <StatDisplay
                      key={statInfo.stat.name}
                      label={capitalize(statInfo.stat.name.replace('-', ' '))}
                      value={statInfo.base_stat}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="abilities">
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center"><Brain className="mr-2 h-5 w-5 text-primary"/>Abilities</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {pokemon.abilities.map(abilityInfo => (
                    <div key={abilityInfo.ability.name} className="p-3 bg-muted/50 rounded-md">
                      <h3 className="font-semibold text-md text-foreground">{capitalize(abilityInfo.ability.name.replace('-', ' '))}</h3>
                      {abilityInfo.is_hidden && <Badge variant="outline" className="mt-1 text-xs border-accent text-accent">Hidden Ability</Badge>}
                      {/* TODO: Fetch and display ability description */}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sprites">
              <Card>
                <CardHeader><CardTitle className="text-xl">Other Sprites</CardTitle></CardHeader>
                <CardContent>
                  {otherImages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {otherImages.map((img, index) => img.src && (
                        <div key={index} className="flex flex-col items-center p-2 border rounded-lg bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-shadow">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={96}
                            height={96}
                            className="object-contain"
                            data-ai-hint={img.dataAiHint}
                            unoptimized={true}
                          />
                          <p className="text-xs mt-1 text-muted-foreground">{img.alt}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No other sprites available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
