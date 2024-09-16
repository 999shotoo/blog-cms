import { UserArticales } from "@/components/dashboard/mysite/fetchdata/userarticales";
import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";
import SkeletonDashboardCard from "@/components/skeletons/dashboard/main/DashboardCard";
import { Suspense } from "react";

interface Params {
  params: {
    id: string;
  };
}

export default async function LandingPage(params: Params) {
  return (
    <>
      <SitesNavbarWrapper site_id={params.params.id}>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <h1 className="text-3xl font-semibold">Articles</h1>
          <Suspense fallback={<SkeletonDashboardCard />}>
         <UserArticales siteId={params.params.id} />
          </Suspense>
        </main>
      </SitesNavbarWrapper>
    </>
  );
}
