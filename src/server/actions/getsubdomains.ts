import { createClient } from "../supabase"

export async function getSubdomains() {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('Site')
        .select()
        

    if (error) {
        return error
    }
    return data.map((site) => ({ subdomain: site.subdomain }))
}