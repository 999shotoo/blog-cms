import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonDashboardCard() {
    const skeletonCards = Array(6).fill(null)
    return (
        <>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-2">
                {skeletonCards.map((_, index) => (
                    <Card key={index} className="bg-primary-foreground">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full" />
                        </CardHeader>
                        <CardFooter className="flex flex-wrap gap-2">
                            <Skeleton className="h-10 w-[120px]" />
                            <Skeleton className="h-10 w-[120px]" />
                            <Skeleton className="h-10 w-[120px]" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}