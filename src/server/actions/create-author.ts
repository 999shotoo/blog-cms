"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createAuthor(data: {
  name: string;
  email?: string;
  bio?: string;
}) {
  const { userId } = auth();

  try {
    if (userId) {
      await db.author.create({
        data: {
          name: data.name,
          email: data.email ?? null,
          bio: data.bio ?? null,
        },
      });
      revalidatePath("/dashboard");
      return {
        success: true,
        message: `Author ${data.name} created successfully`,
      };
    }

    return {
      success: false,
      message: `Unauthorised`,
    };
  } catch (error) {
    return { success: false, message: "Error creating author" };
  }
}
