import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const articles = await db.articles.findMany({
    where: { siteId: params.params.id },
  });

  return (
    <>
      <SitesNavbarWrapper site_id={params.params.id}>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <h1 className="text-3xl font-semibold">Articles</h1>
          {articles.length !== 0 ? (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-2 ">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex flex-wrap gap-2">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg">
              <div className="flex flex-col justify-center items-center gap-2.5 py-12">
                <h2 className="text-2xl font-semibold">
                  You have no published articles
                </h2>
                <p className="text-sm text-muted-foreground">
                  Create a document and publish it to get started
                </p>
                <Button asChild>
                  <Link href={`/dashboard/${params.params.id}/documents`}>
                    Go to Documents
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </main>
      </SitesNavbarWrapper>
    </>
  );
}
