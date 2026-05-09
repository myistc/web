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
