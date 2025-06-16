
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <LoadingSpinner size={48} />
      <p className="ml-4 text-xl text-muted-foreground">Loading Pokedex...</p>
    </div>
  );
}
