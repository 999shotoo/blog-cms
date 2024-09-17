"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function updateDocument(data: {
  documentId: string;
  title: string;
  content: string;
}) {
  const { userId } = auth();

  try {
    if (userId) {
      const document = await db.document.update({
        where: { id: data.documentId },
        data: {
          title: data.title,
          content: data.content,
        },
      });

      revalidatePath(`/dashboard/${document.siteId}/documents`);
      return {
        success: true,
        message: `Document ${data.title} updated successfully`,
        data: { siteId: document.siteId },
      };
    }

    return { success: false, message: "Unauthorised", data: null };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred", data: null };
  }
}