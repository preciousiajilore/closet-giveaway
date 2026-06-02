"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


/**
 * This is to add an item, it takes in the form data from the add item form in the admin items page and adds a new 
 * item to the database with the provided information, then revalidates the path to update the list of items immediately
 * @param formData 
 * 
 */

export async function addItem(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const size = String(formData.get("size") || "").trim();
  const condition = String(formData.get("condition") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  if (!name || !size || !condition || !category) {
    throw new Error("Missing required item fields.");
  }

  const { error } = await supabaseAdmin.from("items").insert({
    name,
    size,
    condition,
    category,
    status: "Available",
    image_url: imageUrl || null,
  });

  if (error) {
    console.error("Failed to add item:", error);
    throw new Error("Could not add item.");
  }

  revalidatePath("/");
  revalidatePath("/admin/items");
}

/**
 * This action is to mark an item as available again if a request is denied or if the item needs to be put back 
 * in circulation for any reason after being marked as claimed. It will update the item's status back to "Available"
 * @param itemId 
 */

export async function markItemAvailable(itemId: string) {
  const { error } = await supabaseAdmin
    .from("items")
    .update({ status: "Available" })
    .eq("id", itemId);

  if (error) {
    console.error("Failed to mark item available:", error);
    throw new Error("Could not mark item available.");
  }

  revalidatePath("/");
  revalidatePath("/admin/items");
}

/**
 * This action is used to mark an item as claimed when approving a request.
 * It can handle both cases where the item ID is known or when only the item name is provided 
 * to accommodate requests that may not be linked to a specific item in the database.
 * @param itemId 
 */
export async function markItemClaimed(itemId: string) {
  const { error } = await supabaseAdmin
    .from("items")
    .update({ status: "Claimed" })
    .eq("id", itemId);

  if (error) {
    console.error("Failed to mark item claimed:", error);
    throw new Error("Could not mark item claimed.");
  }

  revalidatePath("/");
  revalidatePath("/admin/items");
}

/** 
 * This is a new action to archive an item instead of deleting it, which will just set its status to "Archived"
 * and hide it from the main page but keep it in the database for record keeping for potential use
 * @param itemId
 */

export async function archiveItem(itemId: string){
  const { error } = await supabaseAdmin
    .from("items")
    .update({ status: "Archived"})
    .eq("id", itemId);

    if (error) {
      console.error("Failed to archive item:", error);
      throw new Error("Oops! Could not archive this item.");
    }
  
  //we do revalidatepath so that the item will immediately disappear from the main page 
  //and the admin items page without needing to refresh
  revalidatePath("/");
  revalidatePath("/admin/items");
}