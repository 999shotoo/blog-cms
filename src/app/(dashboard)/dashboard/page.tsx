import MainNavbarWrapper from "@/components/dashboard/main/mainnavbarwrapper";
import { SitesMainDashboard } from "@/components/dashboard/main/sites";

export default function LandingPage() {
  return (
    <>
      <MainNavbarWrapper>
        <main className="flex flex-1 flex-col gap-4 px-2 md:p-4 lg:gap-6 lg:p-4">
          <SitesMainDashboard />
        </main>
      </MainNavbarWrapper>
    </>
  );
}
