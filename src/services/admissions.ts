import { supabase } from "@/lib/supabase";

export interface AdmissionInquiry {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  course: string;
  message: string | null;
  created_at: string;
}

export interface AdmissionInquiryInput {
  student_name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
}

export async function submitAdmissionInquiry(
  data: AdmissionInquiryInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("admissions")
      .insert([
        {
          student_name: data.student_name,
          email: data.email,
          phone: data.phone,
          course: data.course,
          message: data.message || null,
        }
      ]);

    if (error) {
      console.error("Error submitting admission inquiry to Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while submitting admission inquiry:", error);
    return { 
      success: false, 
      error: error?.message || "An unexpected error occurred during submission" 
    };
  }
}

export async function getAdmissionInquiries(): Promise<AdmissionInquiry[]> {
  try {
    const { data, error } = await supabase
      .from("admissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching admission inquiries from Supabase:", error.message);
      return [];
    }

    return data as AdmissionInquiry[];
  } catch (error) {
    console.error("Unexpected error occurred while fetching admission inquiries:", error);
    return [];
  }
}

export async function deleteAdmissionInquiry(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("admissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting admission inquiry from Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error occurred while deleting admission inquiry:", error);
    return { 
      success: false, 
      error: error?.message || "An unexpected error occurred during deletion" 
    };
  }
}
