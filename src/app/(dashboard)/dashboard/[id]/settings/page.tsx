
import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";
import { Button } from "@/components/ui/button";

interface Params {
    params: {
        id: string;
    };
}

export default function LandingPage(params: Params) {
    return (
        <>
            <SitesNavbarWrapper site_id={params.params.id}>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                </main>
            </SitesNavbarWrapper>
        </>
    );
}