import { supabase } from "@/lib/supabase";
import { GalleryItem } from "@/types/gallery";

export async function getGalleryImages(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery images from Supabase:", error.message);
      return [];
    }

    return data as GalleryItem[];
  } catch (error) {
    console.error("Unexpected error occurred while fetching gallery images:", error);
    return [];
  }
}

export async function getVisibleGalleryImages(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching visible gallery images from Supabase:", error.message);
      return [];
    }

    return data as GalleryItem[];
  } catch (error) {
    console.error("Unexpected error occurred while fetching visible gallery images:", error);
    return [];
  }
}

export async function uploadGalleryImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading image to Supabase Storage:", uploadError.message);
      return { success: false, error: uploadError.message };
    }

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    return { success: true, url: data.publicUrl };
  } catch (error: any) {
    console.error("Unexpected error occurred while uploading image:", error);
    return { success: false, error: error.message || "An unexpected error occurred during upload" };
  }
}

export async function createGalleryItem(data: { title: string; image_url: string; category: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("gallery")
      .insert([
        {
          title: data.title,
          image_url: data.image_url,
          category: data.category,
        }
      ]);

    if (error) {
      console.error("Error inserting gallery item into Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while creating gallery item:", error);
    return { success: false, error: error.message || "An unexpected error occurred during creation" };
  }
}

export async function deleteGalleryItem(id: string, imageUrl: string): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Delete the record from the database
    const { error: dbError } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Error deleting gallery item from Supabase DB:", dbError.message);
      return { success: false, error: dbError.message };
    }

    // 2. Extract the file name from the URL and delete from storage
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from("gallery")
        .remove([fileName]);

      if (storageError) {
        console.error("Error deleting image from Supabase Storage:", storageError.message);
        // We don't fail the operation if storage deletion fails, as the DB record is already removed,
        // but it is logged for maintenance purposes.
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while deleting gallery item:", error);
    return { success: false, error: error.message || "An unexpected error occurred during deletion" };
  }
}

export async function updateGalleryVisibility(id: string, visible: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("gallery")
      .update({ visible })
      .eq("id", id);

    if (error) {
      console.error("Error updating gallery item visibility:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while updating visibility:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export async function updateGalleryFeatured(id: string, featured: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("gallery")
      .update({ featured })
      .eq("id", id);

    if (error) {
      console.error("Error updating gallery item featured status:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while updating featured status:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export async function updateGalleryOrder(id: string, display_order: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("gallery")
      .update({ display_order })
      .eq("id", id);

    if (error) {
      console.error("Error updating gallery item display order:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while updating display order:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}
