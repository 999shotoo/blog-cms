import Link from "next/link"
import {
    BookText,
    Box,
    Github,
    Home,
    LineChart,
    Menu,
    Package,
    ShoppingCart,
    Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Profile } from "@/components/profile/Profile"
import { DesktopNav } from "./desktop"
import { MobileNav } from "./mobile"


export default function DashNavbar({
    children,
    navItems, // add this prop
}: {
    children: React.ReactNode;
    navItems: {
        href: string;
        label: string;
        icon: React.ReactNode;
    }[];
}) {
    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block rounded-xl m-2">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <Box className="h-6 w-6" />
                                <span className="">Pixel CMS</span>
                            </Link>
                            <Link href="https://github.com/999shotoo/blog-cms" className="ml-auto h-8 w-8">
                                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">Github</span>
                                </Button>
                            </Link>
                        </div>
                        <DesktopNav navItems={navItems} />
                        <div className="mt-auto p-4 flex gap-4">
                            <div>
                                <Profile />
                            </div>
                            <Link href="/docs">
                                <Button variant="outline" className="w-full">
                                    <BookText className="w-4 h-4 mr-2" />  Api Docs
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden rounded-xl m-2">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Box className="h-6 w-6" />
                            <span className="">Pixel CMS</span>
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 ms-auto rounded-xl "
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col rounded-xl h-[98vh] m-2">
                                <div className="pt-10">
                                    <MobileNav navItems={navItems} />
                                </div>
                                <div className="mt-auto flex gap-4">
                                    <div>
                                        <Profile />
                                    </div>
                                    <Link href="/docs">
                                        <Button variant="outline" className="w-full">
                                            <BookText className="w-4 h-4 mr-2" />  Api Docs
                                        </Button>
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </header>
                    {children}
                </div>
            </div>
        </>
    );
}