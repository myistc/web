"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  uploadFacultyImage, 
  createFacultyMember,
  getOrderedFaculty,
  deleteFacultyMember,
  updateFacultyMember,
  updateFacultyOrder,
  updateFacultyFeatured
} from "@/services/faculty";
import { Faculty } from "@/types/faculty";
import { 
  ArrowLeft, 
  Upload, 
  UserPlus, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert,
  User,
  Award,
  BookOpen,
  Briefcase,
  Image as ImageIcon,
  Trash2,
  Edit2,
  Star,
  Hash,
  Save,
  XCircle,
  Settings2
} from "lucide-react";

export default function AdminFacultyPage() {
  const router = useRouter();
  
  // Auth State
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  // Data State
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMode, setSortMode] = useState<"manual" | "alphabetical">("manual");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Upload Form State
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [qualification, setQualification] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", designation: "", department: "", qualification: "" });

  // Global UI State
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

    return () => { isMounted = false; };
  }, [router]);

  useEffect(() => {
    if (!isAuthChecking) {
      fetchFaculty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode, isAuthChecking]);

  const fetchFaculty = async () => {
    setIsLoading(true);
    const data = await getOrderedFaculty(sortMode);
    setFacultyList(data);
    setIsLoading(false);
  };

  // --- Upload Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        setMessage({ type: 'error', text: 'Please select a valid image file.' });
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

    if (!name.trim() || !designation.trim() || !department.trim() || !qualification.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = null;

      if (file) {
        const uploadResult = await uploadFacultyImage(file);
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || "Failed to upload image to storage.");
        }
        imageUrl = uploadResult.url;
      }

      const dbResult = await createFacultyMember({
        name: name.trim(),
        designation: designation.trim(),
        department: department.trim(),
        qualification: qualification.trim(),
        image_url: imageUrl,
      });

      if (!dbResult.success) {
        throw new Error(dbResult.error || "Failed to save faculty details to the database.");
      }

      setMessage({ type: 'success', text: 'Faculty member successfully added!' });
      
      // Reset form
      setFile(null);
      setName("");
      setDesignation("");
      setDepartment("");
      setQualification("");
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      await fetchFaculty();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An unexpected error occurred during creation.' });
    } finally {
      setIsUploading(false);
    }
  };

  // --- Management Handlers ---
  const handleDelete = async (id: string, imageUrl: string | null) => {
    if (!window.confirm("Are you sure you want to delete this faculty member?")) return;

    setProcessingId(id);
    try {
      const result = await deleteFacultyMember(id, imageUrl);
      if (result.success) {
        setMessage({ type: 'success', text: 'Faculty member deleted successfully.' });
        setFacultyList(prev => prev.filter(f => f.id !== id));
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Deletion failed.' });
    } finally {
      setProcessingId(null);
    }
  };

  const startEditing = (faculty: Faculty) => {
    setEditingId(faculty.id);
    setEditForm({
      name: faculty.name,
      designation: faculty.designation,
      department: faculty.department,
      qualification: faculty.qualification
    });
  };

  const handleEditSave = async (id: string) => {
    setProcessingId(id);
    try {
      const result = await updateFacultyMember(id, editForm);
      if (result.success) {
        setMessage({ type: 'success', text: 'Faculty details updated successfully.' });
        setEditingId(null);
        await fetchFaculty();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Update failed.' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    setProcessingId(id);
    try {
      const newFeatured = !currentFeatured;
      const result = await updateFacultyFeatured(id, newFeatured);
      if (result.success) {
        setFacultyList(prev => prev.map(f => f.id === id ? { ...f, featured: newFeatured } : f));
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update featured status.' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateOrder = async (id: string, currentOrder: number, newOrderStr: string) => {
    const newOrder = parseInt(newOrderStr, 10);
    if (isNaN(newOrder) || newOrder === currentOrder) return;
    
    setProcessingId(id);
    try {
      const result = await updateFacultyOrder(id, newOrder);
      if (result.success) {
        setFacultyList(prev => prev.map(f => f.id === id ? { ...f, display_order: newOrder } : f));
        if (sortMode === "manual") {
          fetchFaculty(); // Re-sort automatically if in manual mode
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update order.' });
    } finally {
      setProcessingId(null);
    }
  };

  // Loading State Display
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
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
              <UserPlus className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-lg font-bold text-slate-900">Faculty Management</h1>
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
              <h2 className="text-2xl font-extrabold text-slate-900">Add Faculty</h2>
              <p className="text-slate-600 text-sm mt-1">Register a new academic staff member.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <form onSubmit={handleUpload} className="p-6 space-y-5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Prof. Hakim Ali" disabled={isUploading} required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 pl-10 text-sm transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Designation */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Designation</label>
                  <div className="relative">
                    <Briefcase className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text" value={designation} onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g., Professor & HOD" disabled={isUploading} required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 pl-10 text-sm transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Department</label>
                  <div className="relative">
                    <BookOpen className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text" value={department} onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g., Moalajat" disabled={isUploading} required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 pl-10 text-sm transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Qualification */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Qualification</label>
                  <div className="relative">
                    <Award className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text" value={qualification} onChange={(e) => setQualification(e.target.value)}
                      placeholder="e.g., B.U.M.S, M.D." disabled={isUploading} required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 pl-10 text-sm transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Photo (Optional)</label>
                  <div className="mt-1 flex justify-center px-6 py-4 border-2 border-slate-300 border-dashed rounded-xl hover:border-emerald-500/50 transition-colors bg-slate-50">
                    <div className="space-y-1 text-center flex flex-col items-center">
                      {file ? (
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                      )}
                      <div className="flex text-sm text-slate-600">
                        <label htmlFor="image-upload" className="relative cursor-pointer bg-transparent rounded-md font-bold text-emerald-600 hover:text-emerald-700">
                          <span>{file ? 'Change photo' : 'Upload photo'}</span>
                          <input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} disabled={isUploading} />
                        </label>
                      </div>
                      <p className="text-[10px] text-slate-500">{file ? file.name : 'PNG, JPG up to 5MB'}</p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={isUploading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : <><UserPlus className="w-5 h-5" /> Add Faculty</>}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Manage List */}
          <div className="xl:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Manage Faculty Directory</h2>
                <p className="text-slate-600 text-sm mt-1">Organize profiles, update details, and manage featured staff.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as "manual" | "alphabetical")}
                    className="pl-9 pr-8 py-2 bg-white border border-slate-200 text-sm font-bold text-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none shadow-sm"
                  >
                    <option value="manual">Manual Order</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
                <div className="text-sm font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm hidden sm:block">
                  Total: {facultyList.length}
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading directory...</p>
              </div>
            ) : facultyList.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center min-h-[400px] justify-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Directory Empty</h3>
                <p className="text-slate-500 max-w-sm">No faculty members found. Add profiles using the form to populate the directory.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {facultyList.map((faculty) => {
                  const isProcessing = processingId === faculty.id;
                  const isEditing = editingId === faculty.id;

                  return (
                    <div key={faculty.id} className={`bg-white rounded-2xl border ${isEditing ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200'} p-4 shadow-sm flex flex-col relative transition-all`}>
                      
                      {isProcessing && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-2xl">
                          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                        </div>
                      )}

                      <div className="flex gap-4 items-start">
                        {/* Image Column */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {faculty.image_url ? (
                            <Image src={faculty.image_url} alt={faculty.name} fill sizes="112px" className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center"><User className="w-10 h-10 text-slate-300" /></div>
                          )}
                        </div>

                        {/* Details Column */}
                        <div className="flex-1 min-w-0 space-y-2">
                          {isEditing ? (
                            <div className="space-y-2">
                              <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full p-1.5 bg-slate-50 border rounded-lg text-sm font-bold text-slate-900 outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Name" />
                              <input type="text" value={editForm.designation} onChange={e => setEditForm({...editForm, designation: e.target.value})} className="w-full p-1.5 bg-slate-50 border rounded-lg text-xs text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Designation" />
                              <input type="text" value={editForm.department} onChange={e => setEditForm({...editForm, department: e.target.value})} className="w-full p-1.5 bg-slate-50 border rounded-lg text-xs text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Department" />
                              <input type="text" value={editForm.qualification} onChange={e => setEditForm({...editForm, qualification: e.target.value})} className="w-full p-1.5 bg-slate-50 border rounded-lg text-xs text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Qualification" />
                            </div>
                          ) : (
                            <>
                              <div>
                                <h3 className="text-base font-bold text-slate-900 truncate pr-8" title={faculty.name}>{faculty.name}</h3>
                                <p className="text-emerald-600 font-semibold text-xs truncate mt-0.5" title={faculty.designation}>{faculty.designation}</p>
                              </div>
                              <div className="space-y-1 pt-1">
                                <div className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
                                  <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="truncate" title={faculty.department}>{faculty.department}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
                                  <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="truncate" title={faculty.qualification}>{faculty.qualification}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Top Right Actions (Absolute when not editing for layout stability) */}
                        {!isEditing && (
                          <div className="absolute top-4 right-4 flex items-center gap-1">
                            <button onClick={() => startEditing(faculty)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Edit Profile">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(faculty.id, faculty.image_url)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Profile">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Bottom Controls / Edit Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEditSave(faculty.id)} disabled={isProcessing} className="flex-1 bg-emerald-600 text-white rounded-lg text-xs font-bold py-2 hover:bg-emerald-700 transition-colors flex justify-center items-center gap-1">
                              <Save className="w-3.5 h-3.5" /> Save Changes
                            </button>
                            <button onClick={() => setEditingId(null)} className="flex-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold py-2 hover:bg-slate-200 transition-colors flex justify-center items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            {/* Featured Toggle */}
                            <button
                              onClick={() => handleToggleFeatured(faculty.id, faculty.featured)}
                              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors border ${faculty.featured ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                            >
                              <Star className={`w-3.5 h-3.5 ${faculty.featured && 'fill-amber-500 text-amber-500'}`} />
                              {faculty.featured ? 'Featured' : 'Standard'}
                            </button>

                            {/* Order Input */}
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                <Hash className="w-3.5 h-3.5" /> Order
                              </label>
                              <input
                                type="number"
                                defaultValue={faculty.display_order}
                                onBlur={(e) => handleUpdateOrder(faculty.id, faculty.display_order, e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                                disabled={isProcessing}
                                className="w-16 h-7 text-center text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                              />
                            </div>
                          </div>
                        )}
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
