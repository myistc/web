"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { uploadGalleryImage, createGalleryItem } from "@/services/gallery";
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert,
  FolderOpen
} from "lucide-react";

const CATEGORIES = [
  "Campus",
  "Hospital",
  "Labs",
  "Events",
  "Herbal Garden"
];

export default function AdminGalleryPage() {
  const router = useRouter();
  
  // Auth State
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  
  // Submission State
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          if (isMounted) router.replace("/admin/login");
          return;
        }

        if (isMounted) setIsAuthChecking(false);
      } catch (error) {
        console.error("Error verifying authentication:", error);
        if (isMounted) router.replace("/admin/login");
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!file) {
      setMessage({ type: 'error', text: 'Please select an image file to upload.' });
      return;
    }

    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Please provide a title for the image.' });
      return;
    }

    setIsUploading(true);

    try {
      // 1 & 2. Upload image to Supabase Storage and get URL
      const uploadResult = await uploadGalleryImage(file);

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || "Failed to upload image to storage.");
      }

      // 3. Save gallery item to Database
      const dbResult = await createGalleryItem({
        title: title.trim(),
        image_url: uploadResult.url,
        category: category,
      });

      if (!dbResult.success) {
        throw new Error(dbResult.error || "Failed to save image details to the database.");
      }

      // Success
      setMessage({ type: 'success', text: 'Image successfully uploaded and added to the gallery!' });
      
      // Reset form
      setFile(null);
      setTitle("");
      setCategory(CATEGORIES[0]);
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An unexpected error occurred during upload.' });
    } finally {
      setIsUploading(false);
    }
  };

  // Loading State Display
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Verifying secure session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link 
              href="/admin/dashboard"
              className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-lg font-bold text-slate-900">Gallery Management</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Upload New Image
          </h2>
          <p className="text-slate-600 mt-2">
            Add new photos to the public gallery. Images will be immediately visible on the website.
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 border ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <p className="text-sm font-medium leading-relaxed">{message.text}</p>
          </div>
        )}

        {/* Upload Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <form onSubmit={handleUpload} className="p-6 md:p-8 space-y-6">
            
            {/* Image File Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Image File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary/50 transition-colors bg-slate-50">
                <div className="space-y-1 text-center">
                  <div className="flex justify-center mb-4">
                    {file ? (
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-semibold text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary px-2 py-1"
                    >
                      <span>{file ? 'Change file' : 'Upload a file'}</span>
                      <input 
                        id="image-upload" 
                        name="image-upload" 
                        type="file" 
                        accept="image/*"
                        className="sr-only" 
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                    </label>
                    {!file && <p className="pl-1 py-1">or drag and drop</p>}
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    {file ? file.name : 'PNG, JPG, WEBP up to 5MB'}
                  </p>
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
                Image Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Annual Sports Meet 2024"
                disabled={isUploading}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block p-3 sm:text-sm transition-colors outline-none"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FolderOpen className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isUploading}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block p-3 pl-10 sm:text-sm transition-colors outline-none appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isUploading || !file}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading & Saving...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Publish to Gallery
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
