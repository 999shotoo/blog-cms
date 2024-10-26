import { createClient } from "../supabase";

export async function getUserSites(userId: string) {
  const supabase = createClient();

  try {
    const { data: sites, error } = await supabase
      .from("Site")
      .select("*")
      .eq("userId", userId);

    if (error) {
      console.error("Error fetching user sites:", error);
      return [];
    }

    return sites || [];
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return [];
  }
}