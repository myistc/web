import { Metadata } from "next";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  User, 
  Tag, 
  MessageSquare, 
  Map,
  Building
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Al-Shifa Unani Medical College",
  description: "Get in touch with Al-Shifa Unani Medical College. Find our address, contact numbers, email, and working hours.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Hero / Banner Section */}
      <section className="relative bg-primary-dark py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <Building className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Contact <span className="text-primary-light">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you have questions about admissions, our clinical services, or academic programs, our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* 2 & 5. Contact Information Cards & Working Hours */}
      <section className="py-20 bg-white relative -mt-8 rounded-t-3xl z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Address Card */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <MapPin className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Campus Address</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                123 Hakim Ibn Sina Marg,<br />
                Medical Enclave, Lucknow<br />
                Uttar Pradesh - 226001, India
              </p>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <Phone className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Phone Numbers</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600 flex justify-between">
                  <span>Admissions:</span>
                  <a href="tel:+915221234567" className="font-semibold hover:text-primary transition-colors">+91 522 123 4567</a>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span>Hospital OPD:</span>
                  <a href="tel:+919876543210" className="font-semibold hover:text-primary transition-colors">+91 98765 43210</a>
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <Mail className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Email Addresses</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600 flex flex-col">
                  <span>General Inquiry:</span>
                  <a href="mailto:info@alshifaunani.edu.in" className="font-semibold hover:text-primary transition-colors">info@alshifaunani.edu.in</a>
                </p>
                <p className="text-slate-600 flex flex-col mt-2">
                  <span>Admissions:</span>
                  <a href="mailto:admissions@alshifaunani.edu.in" className="font-semibold hover:text-primary transition-colors">admissions@alshifaunani.edu.in</a>
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-primary p-8 rounded-2xl border border-primary-dark shadow-md group">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Working Hours</h3>
              <div className="space-y-2 text-sm">
                <p className="text-primary-light flex justify-between border-b border-primary-light/20 pb-2">
                  <span>College Admin:</span>
                  <span className="font-semibold">Mon - Sat, 9am - 4pm</span>
                </p>
                <p className="text-primary-light flex justify-between pt-1">
                  <span>Hospital ER:</span>
                  <span className="font-semibold text-white">24 / 7 Open</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 & 4. Inquiry Form & Map Section */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Inquiry Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Send us a Message</h2>
                <p className="text-slate-500">Fill out the form below and we will get back to you as soon as possible.</p>
              </div>

              <form className="space-y-6">
                {/* Name */}
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
                      className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                        placeholder="you@example.com"
                        required
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
                        className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700 block">Subject</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none" 
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700 block">Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      className="pl-10 w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3 transition-colors outline-none resize-y" 
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg px-6 py-4 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Google Maps Placeholder */}
            <div className="flex flex-col h-full space-y-6">
              <div className="flex-grow bg-white rounded-3xl p-4 shadow-sm border border-slate-100 relative min-h-[400px] lg:min-h-full">
                {/* Visual Map Placeholder */}
                <div className="absolute inset-4 bg-slate-200 rounded-2xl overflow-hidden border border-slate-300">
                  <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-20 mix-blend-multiply"></div>
                  
                  {/* Map Pin UI */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="bg-primary text-white p-3 rounded-full shadow-xl animate-bounce">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="mt-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-slate-100 text-center">
                      <h4 className="font-bold text-slate-900">Al-Shifa Campus</h4>
                      <p className="text-xs text-slate-500 mt-1">Lucknow, Uttar Pradesh</p>
                    </div>
                  </div>

                  {/* Overlay text for placeholder context */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-slate-900/70 backdrop-blur-md text-white py-3 px-4 rounded-lg">
                    <Map className="w-5 h-5" />
                    <span className="text-sm font-medium">Interactive Google Map Embed Placeholder</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
