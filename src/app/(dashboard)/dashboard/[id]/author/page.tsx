import AuthorForm from "@/components/dashboard/author/AuthorForm";
import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";

interface Params {
  params: {
    id: string;
  };
}

export default function LandingPage(params: Params) {
  return (
    <>
      <SitesNavbarWrapper site_id={params.params.id}>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="px-2 pb-4 border-b">
            <h1 className="text-xl font-bold">Add an author</h1>
          </header>
          <AuthorForm />
        </main>
      </SitesNavbarWrapper>
    </>
  );
}
