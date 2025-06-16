
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function FavoritesLoading() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary font-headline tracking-tight animate-pulse">
        Your Favorite Pokémon
      </h1>
      <div className="flex flex-col items-center justify-center py-20">
        <LoadingSpinner size={60} />
        <p className="mt-6 text-xl text-muted-foreground">Loading your cherished Pokémon...</p>
      </div>
    </div>
  );
}
