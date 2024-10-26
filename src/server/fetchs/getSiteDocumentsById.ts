import { createClient } from "../supabase";

export async function getSiteDocumentsById(siteId: string) {
    const supabase = createClient();

    try {
        const { data: Document, error } = await supabase
            .from("Document")
            .select("*")
            .eq("siteId", siteId)


        if (error) {
            console.error("Error fetching articles:", error);
            return [];
        }

        return Document || [];
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return [];
    }
}