import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PlusCircle,
  MessageCircle,
  Globe,
  Scroll,
  NotebookPen,
  ScanEye,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/server/db";
import SiteDialog from "../sites/SiteDialog";

export async function SitesMainDashboard() {
  const existingSites = await db.site.findMany();
  return (
    <>
      <header className="p-2 pb-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">Your Sites</h1>
        <SiteDialog />
      </header>
      <ScrollArea className="flex-grow md:p-8 rounded-xl h-[60vh] w-full">
        {existingSites.length !== 0 ? (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-2 ">
            {existingSites.map((site) => (
              <Card key={site.id}>
                <CardHeader>
                  <CardTitle>{site.title}</CardTitle>
                  <CardDescription>{site.url}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-wrap gap-2">
                  <Link href={`/dashboard/${site.id}`}>
                    <Button variant="outline">
                      <NotebookPen className="mr-2 h-4 w-4" />{" "}
                      <span className="hidden md:block">Manage Site</span>
                    </Button>
                  </Link>
                  <Link href={`https://${site.subdomain}.pixelcms.vercel.app/`}>
                    <Button variant="outline">
                      <ScanEye className="mr-2 h-4 w-4" />{" "}
                      <span className="hidden md:block">Preview</span>
                    </Button>
                  </Link>
                  <Link href={site.url}>
                    <Button variant="outline">
                      <Globe className="mr-2 h-4 w-4" />{" "}
                      <span className="hidden md:block">Visit Site</span>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg">
            <div className="flex flex-col justify-center items-center gap-2.5 py-12">
              <h2 className="text-2xl font-semibold">You have no sites</h2>
              <p className="text-sm text-muted-foreground">
                Create a site to get started
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
    </>
  );
}
