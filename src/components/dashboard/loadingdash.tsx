import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoadingDash() {
  return (
    <>
      <div className="flex h-screen bg-background p-2">
        <div className="w-full mx-auto rounded-2xl">
          <div className="flex h-full gap-4">
            <div className="w-64 border p-6 rounded-2xl">
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 border rounded-xl">
              {/* Header */}
              <div className="mb-8">
                <Skeleton className="h-10 w-64 mb-4" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="rounded-2xl">
                    <CardHeader>
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-full mb-4" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-4 w-1/3" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
