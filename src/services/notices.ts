import { supabase } from "@/lib/supabase";
import { Notice } from "@/types/notice";

export async function getNotices(): Promise<Notice[]> {
  try {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("publish_date", { ascending: false });

    if (error) {
      console.error("Error fetching notices from Supabase:", error.message);
      return [];
    }

    return data as Notice[];
  } catch (error) {
    console.error("Unexpected error occurred while fetching notices:", error);
    return [];
  }
}

export async function uploadNoticePDF(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("notices")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading PDF to Supabase Storage:", uploadError.message);
      return { success: false, error: uploadError.message };
    }

    const { data } = supabase.storage
      .from("notices")
      .getPublicUrl(fileName);

    return { success: true, url: data.publicUrl };
  } catch (error: any) {
    console.error("Unexpected error occurred while uploading PDF:", error);
    return { success: false, error: error.message || "An unexpected error occurred during upload" };
  }
}

export async function createNotice(data: { title: string; pdf_url: string | null; publish_date: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("notices")
      .insert([
        {
          title: data.title,
          pdf_url: data.pdf_url,
          publish_date: data.publish_date,
        }
      ]);

    if (error) {
      console.error("Error inserting notice into Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while creating notice:", error);
    return { success: false, error: error.message || "An unexpected error occurred during creation" };
  }
}

export async function deleteNotice(id: string, pdfUrl: string): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Delete row from Database
    const { error: dbError } = await supabase
      .from("notices")
      .delete()
      .eq("id", id);

    if (dbError) {
      throw dbError;
    }

    // 2. Extract file path/name from URL and delete from Storage
    // Assumes URL format: .../storage/v1/object/public/notices/filename.pdf
    const fileName = pdfUrl.split('/').pop();

    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from("notices")
        .remove([fileName]);

      if (storageError) {
        console.error("Notice record deleted, but failed to remove file from storage:", storageError.message);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while deleting notice:", error);
    return { success: false, error: error.message || "An unexpected error occurred during deletion" };
  }
}

export async function updateNotice(
  id: string, 
  data: { title?: string; publish_date?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("notices")
      .update({
        title: data.title,
        publish_date: data.publish_date,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating notice in Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while updating notice:", error);
    return { success: false, error: error.message || "An unexpected error occurred during update" };
  }
}
