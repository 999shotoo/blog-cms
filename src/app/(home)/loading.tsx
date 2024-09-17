import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2 w-full">
              <Skeleton className="h-10 w-3/4 mx-auto sm:h-12 md:h-14 lg:h-16" />
              <Skeleton className="h-10 w-1/2 mx-auto sm:h-12 md:h-14 lg:h-16" />
              <Skeleton className="h-4 w-full max-w-[700px] mx-auto mt-4 md:h-6" />
              <Skeleton className="h-4 w-3/4 max-w-[525px] mx-auto md:h-6" />
            </div>
            <div className="space-x-4 flex justify-center mt-6">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-[1080px] w-[1300px] mt-20 rounded-xl" />
          </div>
        </div>
      </section>
    </>
  );
}
