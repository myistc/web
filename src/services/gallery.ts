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
