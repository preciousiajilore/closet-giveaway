"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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