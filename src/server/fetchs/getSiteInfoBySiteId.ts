import { createClient } from "../supabase";

export async function getSiteInfoBySiteId(siteId: string, userId: string) {
    const supabase = createClient();

    try {
        const { data: Site, error } = await supabase
            .from("Site")
            .select("*")
            .eq("id", siteId)
            .eq("userId", userId);
        if (error) {
            console.error("Error fetching articles:", error);
            return null;
        }

        return Site || [];
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return null;
    }
}