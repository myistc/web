"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  uploadGalleryImage, 
  createGalleryItem,
  getGalleryImages,
  deleteGalleryItem,
  updateGalleryVisibility,
  updateGalleryFeatured,
  updateGalleryOrder
} from "@/services/gallery";
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert,
  FolderOpen,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Hash,
  AlertCircle
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  featured: boolean;
  visible: boolean;
  display_order: number;
  created_at: string;
}

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
  
  // Gallery Data State
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  
  // Global Feedback State
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchGalleryItems = async () => {
    setIsLoadingItems(true);
    const data = await getGalleryImages();
    setItems(data as GalleryItem[]);
    setIsLoadingItems(false);
  };

  useEffect(() => {
    let isMounted = true;

    const checkSessionAndFetch = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          if (isMounted) router.replace("/admin/login");
          return;
        }

        if (isMounted) {
          setIsAuthChecking(false);
          await fetchGalleryItems();
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        if (isMounted) router.replace("/admin/login");
      }
    };

    checkSessionAndFetch();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // --- Upload Handlers ---
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
      const uploadResult = await uploadGalleryImage(file);
      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || "Failed to upload image to storage.");
      }

      const dbResult = await createGalleryItem({
        title: title.trim(),
        image_url: uploadResult.url,
        category: category,
      });

      if (!dbResult.success) {
        throw new Error(dbResult.error || "Failed to save image details to the database.");
      }

      setMessage({ type: 'success', text: 'Image successfully uploaded and added to the gallery!' });
      
      // Reset form & refresh items
      setFile(null);
      setTitle("");
      setCategory(CATEGORIES[0]);
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      await fetchGalleryItems();

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An unexpected error occurred during upload.' });
    } finally {
      setIsUploading(false);
    }
  };

  // --- Management Handlers ---
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!window.confirm("Are you sure you want to delete this image? This action cannot be undone.")) return;

    setProcessingId(id);
    try {
      const result = await deleteGalleryItem(id, imageUrl);
      if (result.success) {
        setItems(prev => prev.filter(item => item.id !== id));
        setMessage({ type: 'success', text: 'Image deleted successfully.' });
      } else {
        throw new Error(result.error || "Failed to delete item.");
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
    setProcessingId(id);
    try {
      const newVisible = !currentVisible;
      const result = await updateGalleryVisibility(id, newVisible);
      if (result.success) {
        setItems(prev => prev.map(item => item.id === id ? { ...item, visible: newVisible } : item));
      } else {
        throw new Error(result.error || "Failed to update visibility.");
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    setProcessingId(id);
    try {
      const newFeatured = !currentFeatured;
      const result = await updateGalleryFeatured(id, newFeatured);
      if (result.success) {
        setItems(prev => prev.map(item => item.id === id ? { ...item, featured: newFeatured } : item));
      } else {
        throw new Error(result.error || "Failed to update featured status.");
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateOrder = async (id: string, currentOrder: number, newOrderStr: string) => {
    const newOrder = parseInt(newOrderStr, 10);
    if (isNaN(newOrder) || newOrder === currentOrder) return;

    setProcessingId(id);
    try {
      const result = await updateGalleryOrder(id, newOrder);
      if (result.success) {
        setItems(prev => prev.map(item => item.id === id ? { ...item, display_order: newOrder } : item));
      } else {
        throw new Error(result.error || "Failed to update display order.");
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setProcessingId(null);
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
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
      <main className="flex-1 max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 border shadow-sm ${
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

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upload Form */}
          <div className="xl:col-span-4 xl:sticky xl:top-24 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Upload Image</h2>
              <p className="text-slate-600 text-sm mt-1">Add new photos to the public gallery.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <form onSubmit={handleUpload} className="p-6 space-y-6">
                {/* Image File Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Image File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary/50 transition-colors bg-slate-50">
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center mb-4">
                        {file ? (
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-semibold text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary px-2 py-1">
                          <span>{file ? 'Change file' : 'Upload a file'}</span>
                          <input 
                            id="image-upload" name="image-upload" type="file" accept="image/*" className="sr-only" 
                            onChange={handleFileChange} disabled={isUploading}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">{file ? file.name : 'PNG, JPG up to 5MB'}</p>
                    </div>
                  </div>
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-semibold text-slate-700">Image Title</label>
                  <input
                    type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Annual Sports Meet 2024" disabled={isUploading}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block p-3 sm:text-sm transition-colors outline-none"
                  />
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-semibold text-slate-700">Category</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FolderOpen className="h-5 w-5 text-slate-400" />
                    </div>
                    <select
                      id="category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isUploading}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block p-3 pl-10 sm:text-sm transition-colors outline-none appearance-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit" disabled={isUploading || !file}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isUploading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload className="w-5 h-5" /> Publish Image</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Manage Gallery */}
          <div className="xl:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Manage Gallery</h2>
                <p className="text-slate-600 text-sm mt-1">Organize, feature, and control visibility of your images.</p>
              </div>
              <div className="text-sm font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                Total Images: {items.length}
              </div>
            </div>

            {isLoadingItems ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading gallery items...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center min-h-[400px] justify-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Images Found</h3>
                <p className="text-slate-500 max-w-sm">
                  Your gallery is currently empty. Use the upload form to add your first image.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                  const isProcessing = processingId === item.id;
                  return (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                      {/* Image Preview */}
                      <div className="relative aspect-video w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!item.visible && 'opacity-50 grayscale'}`}
                        />
                        {isProcessing && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                          </div>
                        )}
                        {!item.visible && (
                          <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1.5 z-10">
                            <EyeOff className="w-3.5 h-3.5" /> Hidden
                          </div>
                        )}
                      </div>

                      {/* Content & Controls */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1" title={item.title}>
                            {item.title}
                          </h3>
                          <span className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                        </div>

                        <div className="mt-auto space-y-3">
                          {/* Toggles */}
                          <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-3">
                            <span className="text-slate-600 font-medium flex items-center gap-1.5">
                              <Star className={`w-4 h-4 ${item.featured ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
                              Featured
                            </span>
                            <button
                              type="button"
                              disabled={isProcessing}
                              onClick={() => handleToggleFeatured(item.id, item.featured)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${item.featured ? 'bg-primary' : 'bg-slate-200'}`}
                            >
                              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.featured ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium flex items-center gap-1.5">
                              {item.visible ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                              Visible
                            </span>
                            <button
                              type="button"
                              disabled={isProcessing}
                              onClick={() => handleToggleVisibility(item.id, item.visible)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${item.visible ? 'bg-primary' : 'bg-slate-200'}`}
                            >
                              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.visible ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium flex items-center gap-1.5">
                              <Hash className="w-4 h-4 text-slate-400" />
                              Order
                            </span>
                            <input
                              type="number"
                              disabled={isProcessing}
                              defaultValue={item.display_order}
                              onBlur={(e) => handleUpdateOrder(item.id, item.display_order, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.currentTarget.blur();
                                }
                              }}
                              className="w-16 h-7 text-center text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary outline-none"
                            />
                          </div>

                          {/* Delete Button */}
                          <div className="border-t border-slate-100 pt-3 mt-1">
                            <button
                              onClick={() => handleDelete(item.id, item.image_url)}
                              disabled={isProcessing}
                              className="w-full flex items-center justify-center gap-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete Image
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
