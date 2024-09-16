import DocumentDialog from "@/components/dashboard/documents/DocumentDialog";
import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

interface Params {
  params: {
    id: string;
  };
}

export default async function LandingPage(params: Params) {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const site = await db.site.findUnique({
    where: {
      id: params.params.id,
      userId,
    },
  });

  if (!site) {
    notFound();
  }

  const documents = await db.document.findMany({
    where: { siteId: params.params.id },
  });
  return (
    <>
      <SitesNavbarWrapper site_id={params.params.id}>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="p-2 pb-4 border-b flex items-center justify-between">
            <h1 className="text-xl font-bold">Documents</h1>
            <DocumentDialog siteId={params.params.id} />
          </header>
          {documents.length !== 0 ? (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-2">
              {documents.map((document) => (
                <Card key={document.id}>
                  <CardHeader>
                    <CardTitle>{document.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex flex-wrap gap-2">
                    <Link href={`/dashboard/${params.params.id}/documents/${document.id}/edit`}>
                      <Button variant="outline">
                        <NotebookPen className="mr-2 h-4 w-4" />{" "}
                        <span className="hidden md:block">Edit</span>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg">
              <div className="flex flex-col justify-center items-center gap-2.5 py-12">
                <h2 className="text-2xl font-semibold">
                  You have no documents
                </h2>
                <p className="text-sm text-muted-foreground">
                  Create a document to publish an article
                </p>
              </div>
            </div>
          )}
        </main>
      </SitesNavbarWrapper>
    </>
  );
}
