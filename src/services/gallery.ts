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
