import PublishForm from "@/components/dashboard/publish/PublishForm";
import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";
import { db } from "@/server/db";

interface Params {
  params: {
    id: string;
  };
}

export default async function LandingPage(params: Params) {
  const categories = await db.category.findMany({
    where: {
      siteId: params.params.id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  const authors = await db.author.findMany({
    where: {
      siteId: params.params.id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  const documents = await db.document.findMany({
    where: {
      siteId: params.params.id,
    },
    select: {
      id: true,
      title: true,
    },
  });

  if (!authors || !categories || !documents) {
    return null;
  }

  return (
    <>
      <SitesNavbarWrapper site_id={params.params.id}>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="px-2 pb-4 border-b space-y-2">
            <h1 className="text-xl font-bold">Publish</h1>
          </header>
          <PublishForm
            siteId={params.params.id}
            categories={categories}
            authors={authors}
            documents={documents}
          />
        </main>
      </SitesNavbarWrapper>
    </>
  );
}
