import { Metadata } from "next";
import { 
  Library, 
  TestTubes, 
  Leaf, 
  Activity, 
  Home, 
  Trophy, 
  Wifi, 
  BookOpen, 
  Microscope, 
  HeartPulse, 
  Coffee,
  ShieldCheck,
  Building
} from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Facilities | Al-Shifa Unani Medical College",
  description: "Explore our state-of-the-art facilities including the central library, modern laboratories, extensive herbal garden, and 150-bed teaching hospital.",
};

export default function FacilitiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Hero / Banner Section */}
      <section className="relative bg-primary-dark py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <Building className="w-4 h-4" />
            <span>World-Class Infrastructure</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Campus <span className="text-primary-light">Facilities</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our 15-acre campus provides an ideal environment for learning, healing, and personal growth, equipped with modern amenities and serene natural surroundings.
          </p>
        </div>
      </section>

      {/* 2 & 3. Central Library & Modern Laboratories (Alternating Layout) */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Central Library */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-4">
                <Library className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Hakim Ibn Sina <span className="text-primary">Central Library</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                The heart of our academic institution, the central library spans over 10,000 sq. ft. and houses an extensive collection of over 15,000 books. It features a unique archiving section dedicated to rare Unani manuscripts (Makhthoothaat) written in Arabic, Persian, and Urdu.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Digital Library Section",
                  "National & International Journals",
                  "Spacious Reading Halls",
                  "High-Speed Wi-Fi Access"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl bg-slate-100 overflow-hidden shadow-xl border border-slate-200 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-50 transition-transform duration-500 group-hover:scale-105"></div>
              <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                <BookOpen className="w-32 h-32 opacity-20" />
              </div>
            </div>
          </div>

          {/* Modern Laboratories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl bg-slate-100 overflow-hidden shadow-xl border border-slate-200 group">
              <div className="absolute inset-0 bg-gradient-to-bl from-slate-200 to-slate-50 transition-transform duration-500 group-hover:scale-105"></div>
              <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                <Microscope className="w-32 h-32 opacity-20" />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-4">
                <TestTubes className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Advanced <span className="text-primary">Laboratories</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To bridge the gap between ancient theory and modern practice, our college is equipped with state-of-the-art laboratories that meet the highest standards of medical education and research.
              </p>
              <div className="space-y-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                    <TestTubes className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Anatomy & Dissection Hall</h4>
                    <p className="text-sm text-slate-600 mt-1">Well-ventilated dissection hall with modern mortuary coolers and anatomical models.</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                    <Microscope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Physiology & Pathology Labs</h4>
                    <p className="text-sm text-slate-600 mt-1">Fully equipped for hematological, biochemical, and clinical pathology investigations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Herbal Garden (Feature Banner) */}
      <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 lg:p-16 border border-white/20 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Botanical Herbal Garden
              </h2>
              <p className="text-lg text-primary-light leading-relaxed">
                Spread across 3 acres, our medicinal plant garden is a living laboratory. It cultivates over 400 distinct species of rare and essential herbs used in Unani pharmacology (Ilmul Advia). 
              </p>
              <p className="text-primary-light leading-relaxed">
                Students regularly engage in pharmacognosy field work, learning proper identification, cultivation, and harvesting techniques vital for authentic Unani drug formulation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <span className="block text-4xl font-extrabold text-white mb-2">400+</span>
                <span className="text-primary-light text-sm font-medium uppercase tracking-wider">Plant Species</span>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <span className="block text-4xl font-extrabold text-white mb-2">3</span>
                <span className="text-primary-light text-sm font-medium uppercase tracking-wider">Acres Area</span>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <span className="block text-4xl font-extrabold text-white mb-2">Green</span>
                <span className="text-primary-light text-sm font-medium uppercase tracking-wider">House Facility</span>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <span className="block text-4xl font-extrabold text-white mb-2">Demo</span>
                <span className="text-primary-light text-sm font-medium uppercase tracking-wider">Pharmacy Unit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Teaching Hospital and Clinical Facilities */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Al-Shifa Teaching Hospital
            </h2>
            <p className="text-lg text-slate-600">
              Our 150-bed multi-specialty clinical facility provides extensive hands-on training to students while serving the healthcare needs of the community through authentic Unani treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ilaj-bil-Tadbeer Unit",
                desc: "A specialized regimental therapy center offering Cupping (Hijama), Leech Therapy (Taleeq), and Massage (Dalk) for chronic ailments.",
                icon: HeartPulse
              },
              {
                title: "Out-Patient Department (OPD)",
                desc: "High-footfall OPD clinics covering Moalajat (Medicine), Niswan (Gynecology), Atfal (Pediatrics), and Amraz-e-Jild (Dermatology).",
                icon: Activity
              },
              {
                title: "In-Patient Department (IPD)",
                desc: "Well-equipped, hygienic general and private wards offering round-the-clock nursing care and Unani medical supervision.",
                icon: Home
              },
              {
                title: "Operation Theatre",
                desc: "Modern, fully sterilized OT complex for minor surgeries (Jarahat) and maternity/obstetric care.",
                icon: ShieldCheck
              },
              {
                title: "Diagnostic Center",
                desc: "Integrated diagnostics featuring modern X-Ray, ECG, USG, alongside traditional Unani diagnostic methods (Nabd, Baul, Baraz).",
                icon: Microscope
              },
              {
                title: "Pharmacy (Dawakhana)",
                desc: "In-house manufacturing and dispensing unit ensuring the availability of authentic classical Unani formulations.",
                icon: TestTubes
              }
            ].map((facility, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                <facility.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{facility.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 & 7. Hostel & Campus Life / Sports */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Student Life & Amenities
            </h2>
            <p className="text-lg text-slate-600">
              We ensure a comfortable, secure, and vibrant campus life, fostering overall personality development beyond academics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Hostel Facility */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-8 items-start hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Hostel Accommodations</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Separate, highly secure, and well-furnished hostels for boys and girls within the campus premises. Managed by dedicated wardens ensuring a disciplined and home-like environment.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <Coffee className="w-4 h-4 text-primary" /> Hygienic Mess
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <Wifi className="w-4 h-4 text-primary" /> 24/7 Wi-Fi
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-primary" /> CCTV Security
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <Activity className="w-4 h-4 text-primary" /> Recreation Room
                  </div>
                </div>
              </div>
            </div>

            {/* Sports & Recreation */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-8 items-start hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sports & Recreation</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Physical well-being is a core tenet of Unani philosophy (Riyazat). The campus features expansive grounds and facilities for various indoor and outdoor sports to keep students active.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Cricket & Football
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Volleyball Court
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Table Tennis
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Annual Sports Meet
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
