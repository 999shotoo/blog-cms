import {  Home, BookCheck, BookA, Pen, Table, Settings, ArrowLeft } from "lucide-react";
import DashNavbar from "../dashboardnav";
import { ReactNode } from "react";


export default function SitesNavbarWrapper({
    children,
    site_id
}: {
    children: React.ReactNode
    site_id: string
}) {
    const navItems: { href: string; label: string; icon: ReactNode }[] = [
        // { href: `/dashboard/`, label: "", icon: <Button variant={"secondary"} className="h-8 w-full"><ArrowLeft className="w-4 h-4"/> <span className="pl-4" >Go Back</span></Button> },
        { href: `/dashboard/`, label: "Go back", icon: <ArrowLeft className="w-4 h-4" /> },
        { href: `/dashboard/${site_id}`, label: "My Site", icon: <Home className="w-4 h-4" /> },
        { href: `/dashboard/${site_id}/documents`, label: "My Documents", icon: <BookCheck className="w-4 h-4" /> },
        { href: `/dashboard/${site_id}/publish`, label: "Publish Article", icon: <BookA className="w-4 h-4" /> },
        { href: `/dashboard/${site_id}/author`, label: "Create Author", icon: <Pen className="w-4 h-4" /> },
        { href: `/dashboard/${site_id}/category`, label: "Create Category", icon: <Table className="w-4 h-4" /> },
        { href: `/dashboard/${site_id}/settings`, label: "Settings", icon: <Settings className="w-4 h-4" /> },
    ];
    return (
        <>
            <DashNavbar navItems={navItems}>
                {children}
            </DashNavbar>
        </>
    );
}
