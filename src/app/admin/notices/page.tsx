"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  uploadNoticePDF, 
  createNotice, 
  getNotices, 
  deleteNotice, 
  updateNotice 
} from "@/services/notices";
import { Notice } from "@/types/notice";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert,
  Calendar,
  Type,
  Trash2,
  Save,
  ExternalLink,
  Search,
  XCircle
} from "lucide-react";

export default function AdminNoticesPage() {
  const router = useRouter();
  
  // Auth & Data State
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Upload Form State
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // UI State
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        
        if (authError || !session) {
          if (isMounted) router.replace("/admin/login");
          return;
        }

        if (isMounted) {
          setIsAuthChecking(false);
          await fetchNotices();
        }
      } catch (error) {
        console.error("Initialization error:", error);
        if (isMounted) router.replace("/admin/login");
      }
    };

    initialize();

    return () => { isMounted = false; };
  }, [router]);

  const fetchNotices = async () => {
    setIsLoading(true);
    const data = await getNotices();
    setNotices(data);
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setMessage({ type: 'error', text: 'Please select a valid PDF file.' });
        setFile(null);
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
      setMessage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!file || !title.trim() || !publishDate) {
      setMessage({ type: 'error', text: 'Please fill all fields and select a PDF.' });
      return;
    }

    setIsUploading(true);
    try {
      const uploadResult = await uploadNoticePDF(file);
      if (!uploadResult.success || !uploadResult.url) throw new Error(uploadResult.error);

      const dbResult = await createNotice({
        title: title.trim(),
        pdf_url: uploadResult.url,
        publish_date: publishDate,
      });

      if (!dbResult.success) throw new Error(dbResult.error);

      setMessage({ type: 'success', text: 'Notice published successfully!' });
      setTitle("");
      setFile(null);
      await fetchNotices();
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, pdfUrl: string) => {
    if (!window.confirm("Are you sure you want to delete this notice? This action is permanent.")) return;

    try {
      const result = await deleteNotice(id, pdfUrl);
      if (result.success) {
        setMessage({ type: 'success', text: 'Notice deleted successfully.' });
        setNotices(prev => prev.filter(n => n.id !== id));
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Deletion failed.' });
    }
  };

  const startEditing = (notice: Notice) => {
    setEditingId(notice.id);
    setEditTitle(notice.title);
    setEditDate(notice.publish_date);
  };

  const handleUpdate = async (id: string) => {
    setIsSaving(true);
    try {
      const result = await updateNotice(id, { title: editTitle, publish_date: editDate });
      if (result.success) {
        setMessage({ type: 'success', text: 'Notice updated successfully.' });
        setEditingId(null);
        await fetchNotices();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Update failed.' });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Verifying Credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 gap-4">
          <Link href="/admin/dashboard" className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">Academic Notices</h1>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar: Upload Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-600" />
              New Publication
            </h2>
            
            <form onSubmit={handleUpload} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Notice Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. BUMS Semester Results"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Publish Date</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Document (PDF)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 text-center">
                  <input
                    type="file"
                    id="pdf-upload"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
                    <FileText className={`w-8 h-8 mb-2 ${file ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-medium text-slate-600">
                      {file ? file.name : "Click to select PDF"}
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Publish Notice
              </button>
            </form>
          </div>

          {message && (
            <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 ${
              message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}
        </div>

        {/* Content: List Management */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-slate-900">Manage Notices</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-4" />
              <p className="text-slate-500">Syncing with server...</p>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
              <XCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No notices found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredNotices.map((notice) => (
                <div key={notice.id} className={`bg-white rounded-2xl border p-5 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${editingId === notice.id ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-emerald-200'}`}>
                  <div className="flex-1 space-y-2">
                    {editingId === notice.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full p-2 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="w-full p-2 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-slate-900 leading-tight">{notice.title}</h3>
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(notice.publish_date).toLocaleDateString()}
                          </span>
                          <a href={notice.pdf_url} target="_blank" className="text-emerald-600 flex items-center gap-1 hover:underline">
                            <ExternalLink className="w-3 h-3" />
                            View Document
                          </a>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 border-t md:border-none pt-4 md:pt-0">
                    {editingId === notice.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(notice.id)}
                          disabled={isSaving}
                          className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Save Changes"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 md:flex-none px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(notice)}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Type className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id, notice.pdf_url)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
