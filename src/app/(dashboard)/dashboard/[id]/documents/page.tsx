import DocumentDialog from "@/components/dashboard/documents/DocumentDialog";
import UserDocuments from "@/components/dashboard/documents/fetchdata/userdocuments";
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
          <header className="p-2 pb-4 border-b flex items-center justify-between">
            <h1 className="text-xl font-bold">Documents</h1>
            {/* <DocumentDialog siteId={params.params.id} /> */}
          </header>
          <Suspense fallback={<SkeletonDashboardCard />}>
            <UserDocuments siteId={params.params.id} />
          </Suspense>
        </main>
      </SitesNavbarWrapper>
    </>
  );
}
