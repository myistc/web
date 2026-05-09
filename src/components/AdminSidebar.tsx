"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  BellRing,
  Users,
  Inbox,
  Building,
  ShieldCheck
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Notices", href: "/admin/notices", icon: BellRing },
  { name: "Faculty", href: "/admin/faculty", icon: Users },
  { name: "Admissions", href: "/admin/admissions", icon: Inbox },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-slate-200 shadow-sm shrink-0 sticky top-0">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:bg-primary-dark transition-colors">
              <Building className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900 font-extrabold text-lg tracking-tight group-hover:text-primary transition-colors">
              Admin Portal
            </span>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Management
          </p>
          {navItems.map((item) => {
            // Check if active (exact match or sub-route)
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-primary"
                }`}
              >
                <Icon 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                  }`} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Footer info inside sidebar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-700">Secure Access</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Authorized personnel only</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-40 w-full shadow-sm">
        <nav className="flex overflow-x-auto px-4 py-3 gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 border border-slate-100 hover:bg-emerald-50 hover:text-primary hover:border-emerald-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
