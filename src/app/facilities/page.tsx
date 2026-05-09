import { Metadata } from "next";
import { 
  Library, 
  Microscope, 
  Leaf, 
  Building2, 
  Home, 
  Trophy, 
  MonitorPlay,
  CheckCircle2,
  MapPin
} from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Facilities | Al-Shifa Unani Medical College",
  description: "Explore the state-of-the-art facilities at Al-Shifa Unani Medical College, including our Central Library, Herbal Garden, Teaching Hospital, and Smart Classrooms.",
};

const facilities = [
  {
    id: "library",
    title: "Central Library",
    description: "A vast repository of knowledge featuring rare Unani manuscripts, modern medical journals, extensive reference books, and digital access to global medical databases in a fully air-conditioned, tranquil environment.",
    icon: Library,
  },
  {
    id: "laboratories",
    title: "Modern Laboratories",
    description: "State-of-the-art anatomy, physiology, and pathology labs equipped with the latest diagnostic instruments, microscopes, and cadaver dissection facilities to bridge theoretical knowledge with practical skills.",
    icon: Microscope,
  },
  {
    id: "herbal-garden",
    title: "Herbal Garden",
    description: "A sprawling, meticulously maintained botanical garden housing hundreds of rare and essential medicinal plants (Tibb-e-Unani flora), providing students with hands-on experience in pharmacognosy (Ilmul Advia).",
    icon: Leaf,
  },
  {
    id: "hospital",
    title: "Teaching Hospital",
    description: "A fully functional, multi-specialty attached hospital serving the community. It provides our students with invaluable clinical exposure, patient interaction, and practical training under expert supervision.",
    icon: Building2,
  },
  {
    id: "classrooms",
    title: "Smart Classrooms",
    description: "Spacious, amphitheater-style classrooms equipped with modern audio-visual aids, interactive smartboards, and high-speed internet to facilitate engaging and multimedia-rich learning experiences.",
    icon: MonitorPlay,
  },
  {
    id: "hostel",
    title: "Hostel Facilities",
    description: "Secure, well-furnished, and separate residential accommodations for boys and girls. Facilities include 24/7 security, Wi-Fi, recreation rooms, and a hygienic mess serving nutritious meals.",
    icon: Home,
  },
  {
    id: "sports",
    title: "Sports & Recreation",
    description: "Dedicated indoor and outdoor sports facilities including a large playground, basketball court, and gymnasium to promote physical fitness, teamwork, and the overall holistic development of our students.",
    icon: Trophy,
  },
];

export default function FacilitiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Hero / Banner Section */}
      <section className="relative bg-emerald-900 py-24 lg:py-32 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 8L8 0M-2 2L2 -2M6 10L10 6" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 font-semibold text-sm mb-6 border border-emerald-400/20 backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            <span>World-Class Campus</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Infrastructure & <span className="text-emerald-400">Facilities</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
            Discover a campus designed to nurture the healers of tomorrow. We seamlessly blend the rich heritage of Unani medicine with cutting-edge modern medical infrastructure.
          </p>
        </div>
      </section>

      {/* Main Facilities Grid */}
      <main className="flex-grow py-20 lg:py-28 relative">
        {/* Subtle background accent */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Explore Our Campus
            </h2>
            <div className="w-20 h-1.5 bg-emerald-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <article 
                  key={facility.id}
                  className={`group relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-1 hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col ${
                    index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Large faded background icon */}
                  <div className="absolute -right-8 -top-8 text-slate-50 opacity-50 group-hover:text-emerald-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none z-0">
                    <Icon className="w-48 h-48" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow">
                    <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                      {facility.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-base">
                      {facility.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* Institutional Quality Assurance Section */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-50 rounded-3xl p-8 md:p-12 border border-emerald-100 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Committed to NCISM Standards
              </h2>
              <p className="text-slate-700 leading-relaxed">
                All our academic, clinical, and residential facilities strictly adhere to the rigorous guidelines laid down by the National Commission for Indian System of Medicine (NCISM) and the Ministry of AYUSH, ensuring you receive a world-class educational experience.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-auto">
              {['NCISM Approved', 'ISO Certified', 'Eco-Friendly Campus'].map((tag, i) => (
                <div key={i} className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
