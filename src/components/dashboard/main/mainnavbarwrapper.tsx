import { Suspense } from "react";
import MainDashboardNav from "../MainDashboardNav";
import Navbarskeleton from "../navbars/navbarskeleton";

export default function MainNavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Navbarskeleton />}>
        <MainDashboardNav>{children}</MainDashboardNav>
      </Suspense>
    </>
  );
}
