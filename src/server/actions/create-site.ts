"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createSite(data: {
  title: string;
  subdomain: string;
  url: string;
  description?: string;
  imageUrl?: string;
}) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.site.create({
        data: {
          title: data.title,
          subdomain: data.subdomain,
          url: data.url,
          description: data.description,
          imageUrl: data.imageUrl,
          userId,
        },
      });
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: `Site ${data.title} created successfully`,
    };
  } catch (error) {
    return { success: false, message: "Error creating site" };
  }
}
