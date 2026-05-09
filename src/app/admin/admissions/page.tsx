"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getAdmissionInquiries, deleteAdmissionInquiry } from "@/services/admissions";
import { 
  ArrowLeft, 
  Inbox, 
  Trash2, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar, 
  Loader2, 
  MessageSquare, 
  AlertCircle 
} from "lucide-react";

// Local type definition to ensure type safety in the component
interface Inquiry {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  course: string;
  message: string | null;
  created_at: string;
}

export default function AdminAdmissionsPage() {
  const router = useRouter();
  
  // States
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      try {
        // 1. Verify Session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          if (isMounted) router.replace("/admin/login");
          return;
        }

        // 2. Fetch Inquiries
        const data = await getAdmissionInquiries();
        
        if (isMounted) {
          setInquiries(data as Inquiry[]);
          setIsAuthChecking(false);
        }
      } catch (error) {
        console.error("Error verifying authentication or fetching data:", error);
        if (isMounted) router.replace("/admin/login");
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleDelete = async (id: string) => {
    // Add a confirmation dialog to prevent accidental deletions
    if (!window.confirm("Are you sure you want to delete this admission inquiry? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);

    try {
      const result = await deleteAdmissionInquiry(id);
      
      if (result.success) {
        // Instantly update UI by removing the deleted item
        setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
      } else {
        alert(result.error || "Failed to delete the inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      alert("An unexpected network error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  // Helper for formatting date strings nicely
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading State Display
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Authenticating & loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/dashboard"
                className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center hidden sm:flex">
                <Inbox className="w-5 h-5 text-emerald-600" />
              </div>
              <h1 className="text-lg font-bold text-slate-900">Admission Inquiries</h1>
            </div>
            <div className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              Total: {inquiries.length}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Student Inquiries
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Review and manage incoming admission requests from prospective students. Contact them using the provided details.
          </p>
        </div>

        {/* Inquiries List / Empty State */}
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Inquiries Found</h3>
            <p className="text-slate-500 max-w-md">
              There are currently no admission inquiries. New submissions from the website will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row group"
              >
                {/* Information Section */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {inquiry.student_name}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5" />
                        {inquiry.course === 'bums' ? 'B.U.M.S.' : 
                         inquiry.course === 'pg' ? 'Post Graduate' : 
                         inquiry.course === 'diploma' ? 'Diploma' : inquiry.course}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 self-start">
                      <Calendar className="w-4 h-4" />
                      {formatDateTime(inquiry.created_at)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-slate-500 mb-0.5">Email Address</p>
                        <a href={`mailto:${inquiry.email}`} className="text-sm font-medium text-slate-900 hover:text-primary truncate block">
                          {inquiry.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-slate-500 mb-0.5">Phone Number</p>
                        <a href={`tel:${inquiry.phone.replace(/\s+/g, '')}`} className="text-sm font-medium text-slate-900 hover:text-primary truncate block">
                          {inquiry.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {inquiry.message && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Student Message</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {inquiry.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions Section */}
                <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 p-6 flex flex-row md:flex-col items-center justify-end gap-3 md:w-48 shrink-0">
                  <a 
                    href={`mailto:${inquiry.email}`}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-primary text-slate-700 hover:text-primary rounded-xl text-sm font-bold transition-colors shadow-sm"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    disabled={deletingId === inquiry.id}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl text-sm font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Delete inquiry from ${inquiry.student_name}`}
                  >
                    {deletingId === inquiry.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    {deletingId === inquiry.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
