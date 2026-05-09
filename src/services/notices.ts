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
