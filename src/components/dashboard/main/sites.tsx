import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, MessageCircle, Globe, Scroll, NotebookPen, ScanEye } from "lucide-react"
import Link from "next/link"


export function SitesMainDashboard() {
    const existingSites = [
        { id: 1, name: "My Blog", url: "https://myblog.com" },
        { id: 2, name: "Portfolio", url: "https://myportfolio.com" },
        { id: 3, name: "E-commerce Store", url: "https://mystore.com" },
    ]
    return (
        <>
            <header className="p-2 border-b flex">
                <h1 className="text-xl font-bold">Your Sites</h1>
                <Button variant={"secondary"} className="ms-auto" >Create Site</Button>
            </header>
            <ScrollArea className="flex-grow md:p-8 rounded-xl h-[60vh] w-full">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-2 ">
                    {existingSites.map((site) => (
                        <Card key={site.id}>
                            <CardHeader>
                                <CardTitle>{site.name}</CardTitle>
                                <CardDescription>{site.url}</CardDescription>
                            </CardHeader>
                            <CardFooter className="gap-2">
                                <Link href={`/dashboard/${site.id}`} className="w-full">
                                    <Button variant="outline" className="w-full" >
                                        <NotebookPen className="mr-2 h-4 w-4" /> <span className="hidden md:block" >Manage Site</span>
                                      </Button>
                                </Link>
                                <Link href={`/s/${site.id}`} className="w-full">
                                    <Button variant="outline" className="w-full">
                                        <ScanEye className="mr-2 h-4 w-4" /> <span className="hidden md:block" >Preview</span>
                                    </Button>
                                </Link>
                                <Link href={site.url} className="w-full">
                                    <Button variant="outline" className="w-full">
                                        <Globe className="mr-2 h-4 w-4" /> <span className="hidden md:block" >Visit Site</span>
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
}