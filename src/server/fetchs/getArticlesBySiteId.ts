import { createClient } from "../supabase";

export async function getArticlesBySiteId(siteId: string) {
  const supabase = createClient();

  try {
    const { data: articles, error } = await supabase
      .from("Articles")
      .select("*")
      .eq("siteId", siteId);

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }

    return articles || [];
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return [];
  }
}