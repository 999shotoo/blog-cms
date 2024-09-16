"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createDocument(data: { title: string; siteId: string }) {
  const { userId } = auth();

  try {
    if (userId) {
      const document = await db.document.create({
        data: {
          title: data.title,
          siteId: data.siteId,
        },
      });

      revalidatePath(`/dashboard/${data.siteId}/documents`);
      return {
        success: true,
        message: `Document ${data.title} created successfully`,
        data: { documentId: document.id },
      };
    }

    return { success: false, message: "Unauthorised", data: null };
  } catch (error) {
    return { success: false, message: "Error creating document", data: null };
  }
}
