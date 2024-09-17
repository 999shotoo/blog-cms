import DocumentEditor from "@/components/dashboard/documents/DocumentEditor";
import SitesNavbarWrapper from "@/components/dashboard/sites/sitesdashboardwrapper";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: { id: string; documentId: string };
}) {
  const { id, documentId } = params;

  const document = await db.document.findFirst({
    where: { id: documentId },
  });

  if (!document) {
    return notFound();
  }

  return (
    <SitesNavbarWrapper site_id={id}>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <header className="px-2 pb-4 border-b ">
          <h1 className="text-xl font-bold">Edit Document</h1>
        </header>
        <DocumentEditor document={document} />
      </main>
    </SitesNavbarWrapper>
  );
}
