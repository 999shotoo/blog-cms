"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function deleteSite(siteId: string) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.site.delete({ where: { id: siteId } });
      revalidatePath("/dashboard");
      return {
        success: true,
        message: `Site deleted successfully`,
      };
    }

    return {
      success: false,
      message: `Unauthorised`,
    };
  } catch (error) {
    return { success: false, message: "Error deleting site" };
  }
}
