import { Suspense } from "react";
import MainDashboardNav from "../MainDashboardNav";
import Navbarskeleton from "../navbars/navbarskeleton";
import SitesDashboardNav from "../SiteDashboardNav";

export default function SitesNavbarWrapper({
  children,
  site_id,
}: {
  children: React.ReactNode;
  site_id: string;
}) {
  return (
    <>
      <Suspense fallback={<Navbarskeleton />}>
        <SitesDashboardNav site_id={site_id}>{children}</SitesDashboardNav>
      </Suspense>
    </>
  );
}
