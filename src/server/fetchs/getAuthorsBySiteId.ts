import { createClient } from "../supabase"; // Adjust the import path as necessary

export async function getAuthorsBySiteId(siteId: string) {
    const supabase = createClient();

    try {
        const { data: authors, error } = await supabase
            .from("Author")
            .select("id, name, email, createdAt")
            .eq("siteId", siteId);

        if (error) {
            console.error("Error fetching authors:", error);
            return [];
        }

        return authors || [];
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return [];
    }
}

