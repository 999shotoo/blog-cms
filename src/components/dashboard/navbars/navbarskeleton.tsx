import { Skeleton } from "@/components/ui/skeleton";

export default function Navbarskeleton() {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block rounded-xl m-2">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 ml-auto" />
            </div>
            <div className="">
              <Skeleton className="h-10 m-4" />
              <Skeleton className="h-10 m-4" />
              <Skeleton className="h-10 m-4" />
              <Skeleton className="h-10 m-4" />
            </div>
            <div className="mt-auto p-4 flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden rounded-xl m-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8 ml-auto" />
          </header>
          <div className="my-auto m-4">
            <Skeleton className="h-[98vh] my-auto rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
