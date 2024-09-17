import { ScrollArea } from "@/components/ui/scroll-area";

import SiteDialog from "../sites/SiteDialog";
import UserSites from "./fetchdata/usersites";
import { Suspense } from "react";
import SkeletonDashboardCard from "@/components/skeletons/dashboard/main/DashboardCard";
import ButtonSkeleton from "@/components/skeletons/button";

export async function SitesMainDashboard() {
  return (
    <>
      <header className="p-2 pb-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">Your Sites</h1>
        <Suspense fallback={<ButtonSkeleton />}>
          <SiteDialog />
        </Suspense>
      </header>
      <ScrollArea className="flex-grow md:p-8 rounded-xl h-[60vh] w-full">
        <Suspense fallback={<SkeletonDashboardCard />}>
          <UserSites />
        </Suspense>
      </ScrollArea>
    </>
  );
}
