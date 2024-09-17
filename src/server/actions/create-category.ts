"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createCategory(data: { name: string; siteId: string }) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.category.create({
        data: {
          name: data.name,
          siteId: data.siteId,
        },
      });
      revalidatePath("/dashboard");
      return {
        success: true,
        message: `Category ${data.name} created successfully`,
      };
    }

    return {
      success: false,
      message: `Unauthorised`,
    };
  } catch (error) {
    return { success: false, message: "Error creating category" };
  }
}