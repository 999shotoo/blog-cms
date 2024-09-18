"use server";

import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function publishArticle(data: {
  title: string;
  subtitle?: string;
  slug: string;
  keywords: string[];
  documentId: string;
  categoryId: string;
  authorId: string;
  siteId: string;
}) {
  try {
    await db.articles.create({
      data: {
        title: data.title,
        subtitle: data.subtitle ?? "",
        slug: data.slug,
        keywords: data.keywords,
        documentId: data.documentId,
        categoryId: data.categoryId,
        authorId: data.authorId,
        siteId: data.siteId,
      },
    });

    revalidatePath(`/dashboard/${data.siteId}`);

    return {
      success: true,
      message: `Article ${data.title} published successfully`,
    };
  } catch (error) {
    return { success: false, message: "Error publishing article" };
  }
}
