"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function approveRequest(requestId: string, itemName: string) {
    const { error : itemError } = await supabaseAdmin
        .from("items")
        .update({ status: "Claimed" })
        .eq("name", itemName);

    if (itemError) {
        console.error("Failed to mark item as claimed", itemError);
        throw new Error("Could not mark item as claimed");
     }
    
    const { error: requestError } = await supabaseAdmin
        .from("requests")
        .update({ status: "Claimed" })
        .eq("id", requestId);

    if (requestError) {
        console.error("Failed to approve request", requestError);
        throw new Error("Could not approve request");
    }

    revalidatePath("/");
    revalidatePath("/admin");
    

}