import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { navigationLinks } from "@/constants/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Branding & Description */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-6">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-extrabold text-primary tracking-tight group-hover:text-primary-dark transition-colors">
                AL-SHIFA
              </span>
              <span className="text-xl font-light text-slate-700 tracking-widest ml-1.5">
                UNANI
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
              A premier institution dedicated to the preservation, education, and advancement of Unani medicine. We blend classical healing traditions with contemporary clinical research and academic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-4 lg:px-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-600 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" aria-hidden="true"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="text-sm text-slate-600 leading-relaxed">
                  123 Hakim Ibn Sina Marg,<br />
                  Medical Enclave, Lucknow<br />
                  Uttar Pradesh - 226001, India
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <a href="tel:+915221234567" className="text-sm text-slate-600 hover:text-primary transition-colors">
                  +91 522 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <a href="mailto:admissions@alshifaunani.edu.in" className="text-sm text-slate-600 hover:text-primary transition-colors">
                  admissions@alshifaunani.edu.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Legal */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {currentYear} Al-Shifa Unani Medical College. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
