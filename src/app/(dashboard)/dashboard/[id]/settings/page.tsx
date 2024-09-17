import { DataTable } from "@/components/dashboard/data-table";
import { columns as authorsColumns } from "@/components/dashboard/settings/authors/columns";
import { columns as categoriesColumns } from "@/components/dashboard/settings/categories/columns";
import GeneralSettings from "@/components/dashboard/settings/GeneralSettings";
import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/server/db";

interface Params {
  params: {
    id: string;
  };
}

export default async function LandingPage(params: Params) {
  const site = await db.site.findUnique({
    where: {
      id: params.params.id,
    },
  });
  const authors = await db.author.findMany({
    where: {
      siteId: params.params.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  const categories = await db.category.findMany({
    where: {
      siteId: params.params.id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });

  if (!site || !authors || !categories) {
    return null;
  }

  return (
    <>
      <SitesNavbarWrapper site_id={params.params.id}>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="px-2 pb-4 border-b">
            <h1 className="text-xl font-semibold">Settings</h1>
          </header>
          <div className="w-3/4 ">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="authors">Authors</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              <TabsContent className="py-6" value="general">
                <GeneralSettings site={site} />
              </TabsContent>
              <TabsContent className="py-6" value="authors">
                <DataTable columns={authorsColumns} data={authors} />
              </TabsContent>
              <TabsContent className="py-6" value="categories">
                <DataTable columns={categoriesColumns} data={categories} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SitesNavbarWrapper>
    </>
  );
}
