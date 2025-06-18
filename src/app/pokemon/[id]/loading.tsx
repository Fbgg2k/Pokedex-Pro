
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PokemonDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Skeleton className="h-10 w-48 mb-6" /> {/* Back button skeleton */}
      
      <Card className="overflow-hidden shadow-2xl">
        <CardHeader className="p-0 relative bg-gray-200 dark:bg-gray-800 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-6 md:p-8">
              <Skeleton className="h-6 w-20 mb-2" /> {/* ID skeleton */}
              <Skeleton className="h-12 w-3/4 mb-1" /> {/* Name skeleton */}
              <Skeleton className="h-6 w-1/2 mb-4" /> {/* Genus skeleton */}
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
            <div className="relative aspect-square flex items-center justify-center p-4 md:p-2">
              <Skeleton className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Skeleton className="h-10 w-full rounded-md mb-6" /> {/* TabsList skeleton */}
          <div className="space-y-6">
            <Card>
              <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <Card key={i}>
                  <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                  <CardContent><Skeleton className="h-8 w-1/3" /></CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
