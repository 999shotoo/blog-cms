import { createClient } from "../supabase";

export async function getCategoryBySiteId(siteId: string) {
    const supabase = createClient();

    try {
        const { data: categories, error } = await supabase
            .from("Category")
            .select("id, name, createdAt")
            .eq("siteId", siteId);

        if (error) {
            console.error("Error fetching categories:", error);
            return [];
        }

        return categories || [];
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return [];
    }
}