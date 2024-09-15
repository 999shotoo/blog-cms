"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createSite(data: { title: string; subdomain: string }) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.site.create({
        data: {
          title: data.title,
          subdomain: data.subdomain,
          url: `https://${data.subdomain}.${process.env.NEXT_PUBLIC_SITE_URL}`,
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
