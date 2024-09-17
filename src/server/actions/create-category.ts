"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createCategory(data: { name: string }) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.category.create({
        data: {
          name: data.name,
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