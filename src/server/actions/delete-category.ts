"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";


export async function deleteCategory(id: string) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.category.delete({ where: { id } });
      revalidatePath("/dashboard");
      return {
        success: true,
        message: `Category deleted successfully`,
      };
    }

    return {
      success: false,
      message: `Unauthorised`,
    };
  } catch (error) {
    return { success: false, message: "Error deleting category" };
  }
}