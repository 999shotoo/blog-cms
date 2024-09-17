import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import { NotebookPen } from "lucide-react";
import Link from "next/link";

export default async function UserDocuments(props: { siteId: string }) {
  const documents = await db.document.findMany({
    where: { siteId: props.siteId },
  });
  return (
    <>
      {documents.length !== 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-2">
          {documents.map((document) => (
            <MagicCard key={document.id} className="cursor-pointer flex-col">
              <CardHeader>
                <CardTitle>{document.title}</CardTitle>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2">
                <Link
                  href={`/dashboard/${props.siteId}/documents/${document.id}/edit`}
                >
                  <Button variant="outline">
                    <NotebookPen className="mr-2 h-4 w-4" />
                    <span className="hidden md:block">Edit</span>
                  </Button>
                </Link>
              </CardFooter>
            </MagicCard>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg">
          <div className="flex flex-col justify-center items-center gap-2.5 py-12">
            <h2 className="text-2xl font-semibold">You have no documents</h2>
            <p className="text-sm text-muted-foreground">
              Create a document to publish an article
            </p>
          </div>
        </div>
      )}
    </>
  );
}
