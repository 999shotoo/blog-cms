import { Bot, LayoutPanelTop , PanelsTopLeft, BookText  } from "lucide-react";
import DashNavbar from "../dashboardnav";
import { ReactNode } from "react";



export default function MainNavbarWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const navItems: { href: string; label: string; icon: ReactNode }[] = [
        { href: "/dashboard", label: "Sites", icon: <PanelsTopLeft className="w-4 h-4" /> },
        { href: "/dashboard/chat", label: "AI (Beta)", icon: <Bot className="w-4 h-4"  /> },
        { href: "/templates", label: "Templates", icon: <LayoutPanelTop className="w-4 h-4"  /> },
        { href: "/docs", label: "API Docs", icon: <BookText   className="w-4 h-4"  /> },
    ];
    return (
        <>
            <DashNavbar navItems={navItems}>
                {children}
            </DashNavbar>
        </>
    );
}
