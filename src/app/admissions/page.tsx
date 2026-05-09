"use client";

import { useState } from "react";
import { 
  ClipboardList, 
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

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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
      const result = await submitAdmissionInquiry({
        student_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        message: formData.message,
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          fullName: "",
          email: "",
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
            
            {/* Overview Section */}
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
                      All admissions are conducted through state/central AYUSH counseling authorities based on NEET-UG scores. The college does not entertain direct admissions bypassing the official counseling process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Award className="w-7 h-7 text-primary" />
                Eligibility Criteria
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">01</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Academic Qualification</h4>
                    <p className="text-sm text-slate-600 mt-1">Passed 10+2 or equivalent examination with Physics, Chemistry, and Biology, securing a minimum of 50% aggregate marks (40% for reserved categories).</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Language Requirement</h4>
                    <p className="text-sm text-slate-600 mt-1">Must have studied and passed Urdu, Arabic, or Persian as a subject in the 10th standard or equivalent examination.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">NEET Qualification</h4>
                    <p className="text-sm text-slate-600 mt-1">Mandatory qualification in the National Eligibility cum Entrance Test (NEET-UG) for the current academic session.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Admission Process Steps */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Admission Process Step-by-Step
            </h2>
            <p className="text-lg text-slate-400">
              Follow these standard procedures to secure your seat at Al-Shifa Unani Medical College.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Qualify NEET-UG", desc: "Appear and obtain the minimum qualifying percentile in the NEET examination." },
              { title: "Register for Counseling", desc: "Register on the official AYUSH counseling portal (AACCC or State Authority)." },
              { title: "Choice Filling", desc: "Select 'Al-Shifa Unani Medical College' as your preferred institution during choice filling." },
              { title: "Reporting & Verification", desc: "Report to the college with the allotment letter and original documents for verification." }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Connecting Line (Desktop) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-slate-700">
                    <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                )}
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-primary transition-colors duration-300 relative z-10 h-full">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30">
                    <span className="text-2xl font-black text-primary-light">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Required Documents & 6. Inquiry Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Required Documents List */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                  Required Documents
                </h2>
                <p className="text-slate-600 mb-8">
                  Candidates must bring the original certificates along with 3 sets of attested photocopies at the time of admission.
                </p>
                <div className="bg-primary-light/50 p-6 rounded-2xl border border-primary/10">
                  <ul className="space-y-4">
                    {[
                      "NEET-UG Admit Card & Score Card",
                      "Seat Allotment Letter (AACCC / State)",
                      "10th Marksheet & Passing Certificate",
                      "12th Marksheet & Passing Certificate",
                      "Proof of Urdu/Arabic/Persian Language",
                      "Transfer Certificate (TC) / Migration",
                      "Character Certificate",
                      "Caste/Category Certificate (if applicable)",
                      "Aadhar Card Copy",
                      "8 Passport Size Photographs"
                    ].map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-slate-700 font-medium">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Admission Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-slate-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Admission Inquiry</h3>
                  <p className="text-slate-500">Have questions? Fill out the form below and our counseling team will get back to you shortly.</p>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900">Inquiry Submitted Successfully</h4>
                      <p className="text-sm text-emerald-800 mt-1">Thank you for reaching out. Our admission counselors will contact you soon.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-red-900">Submission Failed</h4>
                      <p className="text-sm text-red-800 mt-1">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-semibold text-slate-700 block">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          id="fullName" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                          placeholder="John Doe"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700 block">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                          placeholder="john@example.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-slate-700 block">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                          placeholder="+91 98765 43210"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Course Selection */}
                    <div className="space-y-2">
                      <label htmlFor="course" className="text-sm font-semibold text-slate-700 block">Interested Course</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BookOpen className="h-5 w-5 text-slate-400" />
                        </div>
                        <select 
                          id="course" 
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors appearance-none outline-none" 
                          required
                          disabled={isSubmitting}
                        >
                          <option value="" disabled>Select a course</option>
                          <option value="bums">B.U.M.S. (Bachelor of Unani Medicine & Surgery)</option>
                          <option value="pg">Post Graduate (MD/MS Unani)</option>
                          <option value="diploma">Diploma in Pharmacy (Unani)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 block">Your Message / Query</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-slate-400" />
                      </div>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                        placeholder="Write your query here..."
                        required
                        disabled={isSubmitting}
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg px-5 py-4 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy and consent to being contacted by our admission counselors.
                  </p>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
