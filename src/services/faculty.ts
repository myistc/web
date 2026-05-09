import { supabase } from "@/lib/supabase";
import { Faculty } from "@/types/faculty";

export async function getFaculty(): Promise<Faculty[]> {
  try {
    const { data, error } = await supabase
      .from("faculty")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching faculty members from Supabase:", error.message);
      return [];
    }

    return data as Faculty[];
  } catch (error) {
    console.error("Unexpected error occurred while fetching faculty members:", error);
    return [];
  }
}

export async function uploadFacultyImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("faculty")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading faculty image to Supabase Storage:", uploadError.message);
      return { success: false, error: uploadError.message };
    }

    const { data } = supabase.storage
      .from("faculty")
      .getPublicUrl(fileName);

    return { success: true, url: data.publicUrl };
  } catch (error: any) {
    console.error("Unexpected error occurred while uploading faculty image:", error);
    return { success: false, error: error.message || "An unexpected error occurred during upload" };
  }
}

export async function createFacultyMember(data: { 
  name: string; 
  designation: string; 
  department: string; 
  qualification: string; 
  image_url: string | null; 
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("faculty")
      .insert([
        {
          name: data.name,
          designation: data.designation,
          department: data.department,
          qualification: data.qualification,
          image_url: data.image_url,
        }
      ]);

    if (error) {
      console.error("Error inserting faculty member into Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while creating faculty member:", error);
    return { success: false, error: error.message || "An unexpected error occurred during creation" };
  }
}

export async function deleteFacultyMember(id: string, imageUrl: string | null): Promise<{ success: boolean; error?: string }> {
  try {
    const { error: dbError } = await supabase
      .from("faculty")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Error deleting faculty member from Supabase:", dbError.message);
      return { success: false, error: dbError.message };
    }

    if (imageUrl) {
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from("faculty")
          .remove([fileName]);

        if (storageError) {
          console.error("Error deleting image from Supabase Storage:", storageError.message);
        }
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while deleting faculty member:", error);
    return { success: false, error: error.message || "An unexpected error occurred during deletion" };
  }
}

export async function updateFacultyMember(
  id: string, 
  data: { 
    name?: string; 
    designation?: string; 
    department?: string; 
    qualification?: string; 
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("faculty")
      .update(data)
      .eq("id", id);

    if (error) {
      console.error("Error updating faculty member:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while updating faculty member:", error);
    return { success: false, error: error.message || "An unexpected error occurred during update" };
  }
}

export async function updateFacultyOrder(id: string, display_order: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("faculty")
      .update({ display_order })
      .eq("id", id);

    if (error) {
      console.error("Error updating faculty display order:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while updating faculty order:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export async function updateFacultyFeatured(id: string, featured: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("faculty")
      .update({ featured })
      .eq("id", id);

    if (error) {
      console.error("Error updating faculty featured status:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while updating featured status:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export async function getOrderedFaculty(sortMode: "manual" | "alphabetical"): Promise<Faculty[]> {
  try {
    let query = supabase.from("faculty").select("*");

    if (sortMode === "manual") {
      query = query
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
    } else if (sortMode === "alphabetical") {
      query = query.order("name", { ascending: true });
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${sortMode} ordered faculty:`, error.message);
      return [];
    }

    return data as Faculty[];
  } catch (error) {
    console.error("Unexpected error occurred while fetching ordered faculty:", error);
    return [];
  }
}
