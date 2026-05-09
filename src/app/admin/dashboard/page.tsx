"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  LogOut, 
  Image as ImageIcon, 
  BellRing, 
  Users, 
  Loader2,
  Settings,
  ChevronRight
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  // Start with loading true to block initial render until session is verified
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          // If no session, redirect to login.
          // CRITICAL FIX: Do NOT set isLoading to false here.
          // Keeping it true prevents the dashboard content from flickering before the router completes the redirect.
          if (isMounted) {
            router.replace("/admin/login");
          }
          return;
        }

        // Session exists, safely reveal the dashboard
        if (isMounted) {
          setUserEmail(session.user.email || "Admin");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        if (isMounted) {
          router.replace("/admin/login");
        }
      }
    };

    checkSession();

    // Cleanup function to prevent state updates if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      setIsLoading(true); // Show loading spinner while signing out
      await supabase.auth.signOut();
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoading(false);
    }
  };

  // Loading State Display
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Verifying secure session...</p>
      </div>
    );
  }

  const managementCards = [
    {
      title: "Notice Board",
      description: "Post circulars, admission updates, and exam schedules.",
      icon: BellRing,
      href: "/admin/notices",
      color: "bg-blue-50 text-blue-600 border-blue-100",
      hoverIcon: "group-hover:text-blue-700",
    },
    {
      title: "Campus Gallery",
      description: "Upload and manage photos of facilities and events.",
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      hoverIcon: "group-hover:text-emerald-700",
    },
    {
      title: "Faculty Directory",
      description: "Update staff profiles, designations, and departments.",
      icon: Users,
      href: "/admin/faculty",
      color: "bg-purple-50 text-purple-600 border-purple-100",
      hoverIcon: "group-hover:text-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Admin Portal</h1>
                <p className="text-xs text-slate-500 hidden sm:block">Al-Shifa Unani Medical College</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 hidden md:inline-block">
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-transparent hover:border-red-100"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Welcome back, Admin
          </h2>
          <p className="text-slate-600 mt-2">
            Manage your institution's digital presence from this centralized dashboard.
          </p>
        </div>

        {/* Quick Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementCards.map((card) => (
            <Link 
              key={card.title} 
              href={card.href}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-colors ${card.color}`}>
                  <card.icon className={`w-7 h-7 ${card.hoverIcon} transition-colors`} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-light transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* System Status Section (Static Placeholder) */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900">System Overview</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-sm text-slate-500 font-medium mb-1">Database Status</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-sm text-slate-500 font-medium mb-1">Session Check</p>
              <p className="text-slate-900 font-bold">Secure Token Active</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-sm text-slate-500 font-medium mb-1">Access Level</p>
              <p className="text-slate-900 font-bold">Administrator</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
