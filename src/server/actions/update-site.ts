"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function updateSite(data: {
  id: string;
  title: string;
  subdomain: string;
  url: string;
  description?: string;
  imageUrl?: string;
}) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.site.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          subdomain: data.subdomain,
          url: data.url,
          description: data.description,
          imageUrl: data.imageUrl,
        },
      });
      revalidatePath(`/dashboard/${data.id}`);
      return {
        success: true,
        message: `Site ${data.title} updated successfully`,
      };
    }

    return {
      success: false,
      message: "Unauthorized",
    };
  } catch (error) {
    return { success: false, message: "Error updating site" };
  }
}
