"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  MessageSquare, 
  Send,
  CalendarDays,
  Award,
  AlertCircle,
  Loader2,
  ShieldAlert
} from "lucide-react";
import { submitAdmissionInquiry } from "@/services/admissions";

const COUNTRY_CODES = [
  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+971", name: "UAE" },
  { code: "+880", name: "Bangladesh" },
];

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    course: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    try {
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;
      
      const result = await submitAdmissionInquiry({
        student_name: formData.fullName,
        email: formData.email,
        phone: fullPhoneNumber,
        course: formData.course,
        message: formData.message,
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          fullName: "",
          email: "",
          countryCode: "+91",
          phone: "",
          course: "",
          message: ""
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || "An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Hero / Banner Section */}
      <section className="relative bg-primary-dark py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <CalendarDays className="w-4 h-4" />
            <span>Admissions Open for 2026-27</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Begin Your <span className="text-primary-light">Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join a community of dedicated scholars and practitioners. Review our admission guidelines and take the first step toward a rewarding career in Unani medicine.
          </p>
        </div>
      </section>

      {/* 2 & 3. Admission Overview & Eligibility Criteria */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-2">
                <span className="w-8 h-0.5 bg-primary rounded-full"></span>
                Overview
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                BUMS Admission <span className="text-primary">Guidelines</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Admission to the Bachelor of Unani Medicine and Surgery (BUMS) program is strictly based on merit and the guidelines established by the National Commission for Indian System of Medicine (NCISM) and the Ministry of AYUSH.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-lg font-bold text-amber-900 mb-2">Important Notice</h4>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      All admissions are conducted through state/central AYUSH counseling authorities based on NEET-UG scores.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Award className="w-7 h-7 text-primary" />
                Eligibility Criteria
              </h3>
              <ul className="space-y-5">
                {[
                  { title: "Academic Qualification", desc: "Passed 10+2 with Physics, Chemistry, and Biology (50% aggregate)." },
                  { title: "Language Requirement", desc: "Must have passed Urdu, Arabic, or Persian in 10th standard." },
                  { title: "NEET Qualification", desc: "Mandatory qualification in NEET-UG for the current academic session." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary">0{i+1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Inquiry Form */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Admission Inquiry</h3>
              <p className="text-slate-500">Fill out the form below to connect with our counseling team.</p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-emerald-800">Form submitted successfully.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input name="fullName" value={formData.fullName} onChange={handleChange} className="pl-10 w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" placeholder="John Doe" required disabled={isSubmitting} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="pl-10 w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" placeholder="john@example.com" required disabled={isSubmitting} />
                  </div>
                </div>
              </div>

              {/* Custom Phone Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Phone Number</label>
                <div className="flex gap-2">
                  <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary w-28">
                    {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.name})</option>)}
                  </select>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" placeholder="98765 43210" required disabled={isSubmitting} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Course</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <select name="course" value={formData.course} onChange={handleChange} className="pl-10 w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" required disabled={isSubmitting}>
                    <option value="" disabled>Select a course</option>
                    <option value="bums">B.U.M.S.</option>
                    <option value="pg">Post Graduate (MD/MS)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" placeholder="Your query..." required disabled={isSubmitting}></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg p-4 transition-all duration-300">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
