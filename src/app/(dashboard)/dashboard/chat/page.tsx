

import ChatMainDashboard from "@/components/dashboard/main/chat";
import MainNavbarWrapper from "@/components/dashboard/main/mainnavbarwrapper";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <>
            <MainNavbarWrapper>
                <main className="flex flex-1 p-2 flex-col gap-4 lg:gap-6 lg:p-0">
                     <ChatMainDashboard/>
                </main>
            </MainNavbarWrapper>
        </>
    );
}
